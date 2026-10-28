FROM oven/bun:1.3.14 AS build
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/mina-panel/package.json ./apps/mina-panel/package.json
COPY packages/billing-router/package.json ./packages/billing-router/package.json
RUN bun install --frozen-lockfile

COPY . .
WORKDIR /app/apps/api
ENV DATABASE_URL=postgresql://mina:build-only@127.0.0.1:5432/mina
RUN bun x prisma generate --schema=prisma/schema.prisma \
  && bun run build \
  && mkdir -p dist/src \
  && mkdir -p dist/src/i18n \
  && cp -R src/i18n/. dist/src/i18n/

FROM oven/bun:1.3.14 AS prod-deps
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/mina-panel/package.json ./apps/mina-panel/package.json
COPY packages/billing-router/package.json ./packages/billing-router/package.json
RUN bun install --production --frozen-lockfile --filter api

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production PORT=4000
WORKDIR /app
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs appuser
COPY --from=prod-deps --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=appuser:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=build --chown=appuser:nodejs /app/apps/api/prisma/generated ./apps/api/prisma/generated
USER appuser
EXPOSE 4000
CMD ["node", "apps/api/dist/src/main.js"]
