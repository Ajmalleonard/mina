# Docker deployment

GitHub Actions builds and publishes an image to GHCR for each changed app, then connects to the VPS and restarts only that Compose service. `workflow_dispatch` rebuilds and deploys all three apps for the initial migration or a full refresh.

The VPS must have Docker Engine with the Compose plugin, and the existing application environment files at `apps/web/.env` and `apps/api/.env`. The current reverse proxy ports stay the same: web `127.0.0.1:3002`, API `127.0.0.1:3003`; the admin panel listens on `127.0.0.1:3004`. Configure the panel's reverse proxy host to forward to port `3004` if it does not already.

On the first deployment, the script starts web/API containers on temporary ports and checks that each responds before deleting only the matching PM2 process. It then recreates the container on the existing reverse-proxy port and saves the PM2 process list without those two apps. Later deployments update only the affected Compose service.

The GitHub Actions workflow uses the existing `VPS_HOST`, `VPS_USER`, `VPS_PASSWORD`, and `VPS_PORT` secrets. It uses the job's short-lived `GITHUB_TOKEN` for GHCR image pulls, so no long-lived registry token needs to be added to the VPS.
