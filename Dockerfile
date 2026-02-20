FROM oven/bun:1-alpine AS builder-build
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN mkdir -p /app/.next && \
    mkdir -p /app/node_modules && \
    mkdir -p /app/public/media && \
    chown -R bun:bun /app
USER bun

RUN bun i
# Build Next (non-standalone)
RUN bun x next build --turbo --experimental-build-mode compile
RUN rm -rf node_modules

FROM oven/bun:1-alpine AS builder-install-prod
WORKDIR /app
# copy only build outputs and lockfiles necessary to install production deps
COPY --from=builder-build /app/package.json ./
COPY --from=builder-build /app/bun.lock ./
COPY --from=builder-build /app/next.config.js ./
COPY --from=builder-build /app/redirects.js ./redirects.js
# copy Next build output and static assets
COPY --from=builder-build /app/.next ./.next
COPY --from=builder-build /app/public ./public
# migrations must be available at runtime
COPY --from=builder-build /app/src/migrations ./src/migrations
COPY --from=builder-build /app/patches ./patches
# include TypeScript config and source so payload can locate config files at runtime
COPY --from=builder-build /app/tsconfig.json ./tsconfig.json
COPY --from=builder-build /app/src ./src
RUN bun i --production

FROM node:25-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app
# copy Next build output and runtime deps
COPY --from=builder-install-prod --chown=node:node /app/.next ./.next
COPY --from=builder-install-prod --chown=node:node /app/public ./public
COPY --from=builder-install-prod --chown=node:node /app/node_modules ./node_modules
COPY --from=builder-install-prod --chown=node:node /app/package.json ./package.json
COPY --from=builder-install-prod --chown=node:node /app/next.config.js ./next.config.js
COPY --from=builder-install-prod --chown=node:node /app/src/migrations ./src/migrations
COPY --from=builder-install-prod --chown=node:node /app/tsconfig.json ./tsconfig.json
COPY --from=builder-install-prod --chown=node:node /app/src ./src
COPY --from=builder-install-prod --chown=node:node /app/redirects.js ./redirects.js

# install curl for healthcheck
RUN apk add --no-cache curl

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/ || exit 1
CMD [ "sh", "-c", "npx payload migrate && npx next start -p ${PORT:-3000}" ]