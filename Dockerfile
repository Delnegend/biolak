# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

FROM node:24-alpine AS dependencies

# Set working directory
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.pnpm/store \
    pnpm install

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM node:24-alpine AS builder

# Install just + sqlite3 (needed for CI database setup)
RUN apk add --no-cache just sqlite

# Set working directory
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=dependencies /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy application source code (includes .justfile)
COPY . .

ENV NODE_ENV=production
ENV PAYLOAD_SECRET=ci-build-secret

# Create CI database with schema and build in a single layer to avoid SQLite WAL locking issues
RUN rm -f data.ci.sqlite3 data.ci.sqlite3-wal data.ci.sqlite3-shm && \
    touch data.ci.sqlite3 && \
    sqlite3 data.ci.sqlite3 "PRAGMA journal_mode=WAL;" && \
    DATABASE_URI="file:${PWD}/data.ci.sqlite3" pnpm exec payload migrate && \
    DATABASE_URI="file:${PWD}/data.ci.sqlite3" just build-fast

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM node:24-alpine AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the run time.
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy production assets
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# If you want to persist the fetch cache generated during the build so that
# cached responses are available immediately on startup, uncomment this line:
# COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER node

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Start Next.js standalone server with node
CMD ["node", "server.js"]