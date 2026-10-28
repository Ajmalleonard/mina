# Docker deployment

GitHub Actions builds and publishes an image to GHCR for each changed app, then connects to the VPS and restarts only that Compose service. `workflow_dispatch` rebuilds and deploys all three apps for the initial migration or a full refresh.

The VPS must have Docker Engine with the Compose plugin, and the existing application environment files at `apps/web/.env` and `apps/api/.env`. The current reverse proxy ports stay the same: web `127.0.0.1:3002`, API `127.0.0.1:3003`; the admin panel listens on `127.0.0.1:3004`. Configure the panel's reverse proxy host to forward to port `3004` if it does not already.

On the first migration, the script starts web/API containers on temporary ports and checks that each responds before retiring its PM2 entry. If a leftover listener still holds the Mina port, it stops that process only when its working directory belongs to the matching Mina app. It then starts the container on the existing reverse-proxy port. Later deployments update only the affected Compose service.

The `Configure Mina portal domain and TLS` workflow installs the portal Nginx vhost on port 3004 and obtains its certificate with Certbot. Create the proxied Cloudflare A record for `portal.minafoundationtz.org` pointing to the VPS before running it.

The GitHub Actions workflow uses the existing `VPS_HOST`, `VPS_USER`, `VPS_PASSWORD`, and `VPS_PORT` secrets. It uses the job's short-lived `GITHUB_TOKEN` for GHCR image pulls, so no long-lived registry token needs to be added to the VPS.
