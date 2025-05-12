# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else yarn install; \
  fi

# Copy application code
COPY . .

# Expose the development port (handled by docker-compose)
EXPOSE 3000

# Disable telemetry for Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Start Next.js in development mode
CMD ["yarn", "dev"]
