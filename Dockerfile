FROM oven/bun:1-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN mkdir -p /app/.next && \
    mkdir -p /app/node_modules && \
    mkdir -p /app/public/media && \
    chown -R bun:bun /app

USER bun

RUN bun i && bun x next build --experimental-build-mode compile

FROM node:25-alpine

COPY --from=builder --chown=node:node /app /home/node/app

WORKDIR /home/node/app

USER node

ENTRYPOINT [ "sh", "-c", "npm run payload migrate && npm run next start" ]