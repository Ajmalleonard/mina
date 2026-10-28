#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${REPO_DIR:-/home/apps/sq/mina}"
COMPOSE_FILE="$REPO_DIR/deploy/docker-compose.yml"
: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${DEPLOY_SERVICES:?DEPLOY_SERVICES is required}"
: "${GHCR_TOKEN:?GHCR_TOKEN is required}"
: "${GHCR_USERNAME:?GHCR_USERNAME is required}"

cd "$REPO_DIR"
docker compose -f "$COMPOSE_FILE" version >/dev/null
printf '%s' "$GHCR_TOKEN" | docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin >/dev/null
trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

wait_http() {
  local port="$1"
  for attempt in $(seq 1 45); do
    if node -e 'fetch(process.argv[1]).then(r=>process.exit(r.status < 500 ? 0 : 1)).catch(()=>process.exit(1))' "http://127.0.0.1:$port"; then
      return 0
    fi
    sleep 2
  done
  echo "Service did not become ready on port $port" >&2
  return 1
}

has_legacy_pm2() {
  local process_name="$1"
  command -v pm2 >/dev/null 2>&1 && pm2 describe "$process_name" >/dev/null 2>&1
}

listener_pid() {
  local port="$1"
  ss -ltnp 2>/dev/null | awk -v port=":$port" '$4 ~ (port "$") && !printed {if (match($0, /pid=[0-9]+/)) {print substr($0, RSTART + 4, RLENGTH - 4); printed=1}}'
}

expected_legacy_cwd() {
  local service="$1" cwd="$2"
  case "$service" in
    web) [[ "$cwd" == *"/mina/"*"/web" || "$cwd" == *"/mina/web" ]] ;;
    api) [[ "$cwd" == *"/mina/"*"/api" || "$cwd" == *"/mina/api" ]] ;;
    *) return 1 ;;
  esac
}

stop_legacy_listener() {
  local service="$1" port="$2" pid cwd
  pid="$(listener_pid "$port")"
  [[ -n "$pid" ]] || return 0
  cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null || true)"
  if ! expected_legacy_cwd "$service" "$cwd"; then
    echo "Refusing to stop port $port owner with unexpected working directory: $cwd" >&2
    return 1
  fi
  echo "Stopping retired Mina $service listener PID $pid from $cwd"
  kill -TERM "$pid"
  for attempt in $(seq 1 20); do
    [[ -z "$(listener_pid "$port")" ]] && return 0
    sleep 1
  done
  echo "Mina $service listener did not release port $port" >&2
  return 1
}

for service in ${DEPLOY_SERVICES//,/ }; do
  case "$service" in
    web) process_name="minafoundationtz.org"; stable_port=3002; temp_port=13002 ;;
    api) process_name="minafoundationtz-backend"; stable_port=3003; temp_port=13003 ;;
    mina-panel) process_name=""; stable_port=3004 ;;
    *) echo "Unknown service: $service" >&2; exit 2 ;;
  esac

  echo "Pulling $service image for $IMAGE_TAG"
  IMAGE_TAG="$IMAGE_TAG" docker compose -f "$COMPOSE_FILE" pull "$service"

  legacy_pid=""
  if [[ "$service" == "web" || "$service" == "api" ]]; then
    legacy_pid="$(listener_pid "$stable_port")"
    if [[ -n "$legacy_pid" ]]; then
      legacy_cwd="$(readlink "/proc/$legacy_pid/cwd" 2>/dev/null || true)"
      if ! expected_legacy_cwd "$service" "$legacy_cwd"; then
        echo "Refusing to stop port $stable_port owner with unexpected working directory: $legacy_cwd" >&2
        exit 1
      fi
    fi
  fi

  if { [[ -n "$process_name" ]] && has_legacy_pm2 "$process_name"; } || [[ -n "$legacy_pid" ]]; then
    echo "Starting $service on a temporary port before retiring its PM2 process"
    if [[ "$service" == "web" ]]; then
      IMAGE_TAG="$IMAGE_TAG" WEB_HOST_PORT="$temp_port" docker compose -f "$COMPOSE_FILE" up -d --no-deps --force-recreate "$service"
    else
      IMAGE_TAG="$IMAGE_TAG" API_HOST_PORT="$temp_port" docker compose -f "$COMPOSE_FILE" up -d --no-deps --force-recreate "$service"
    fi
    wait_http "$temp_port"
    if has_legacy_pm2 "$process_name"; then
      pm2 delete "$process_name"
      pm2 save --force
    fi
    if [[ "$service" == "web" || "$service" == "api" ]]; then
      stop_legacy_listener "$service" "$stable_port"
    fi
    echo "Moving $service to its stable proxy port $stable_port"
    if [[ "$service" == "web" ]]; then
      IMAGE_TAG="$IMAGE_TAG" WEB_HOST_PORT="$stable_port" docker compose -f "$COMPOSE_FILE" up -d --no-deps --force-recreate "$service"
    else
      IMAGE_TAG="$IMAGE_TAG" API_HOST_PORT="$stable_port" docker compose -f "$COMPOSE_FILE" up -d --no-deps --force-recreate "$service"
    fi
  else
    IMAGE_TAG="$IMAGE_TAG" docker compose -f "$COMPOSE_FILE" up -d --no-deps "$service"
  fi

  wait_http "$stable_port"
  echo "$service is responding on port $stable_port"
done
