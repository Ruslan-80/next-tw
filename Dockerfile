FROM node:20-alpine AS base

# --- Слой зависимостей ---
FROM base AS deps
# Добавляем curl для Healthcheck и openssl для Prisma
RUN apk add --no-cache libc6-compat openssl curl
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/ 
RUN npm ci

# --- Слой сборки ---
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PHASE=phase-production-build

RUN npx prisma generate
RUN npm run build

# --- Финальный слой (Runner) ---
FROM base AS runner
# Добавляем curl (нужен Coolify для Healthcheck) и openssl
RUN apk add --no-cache openssl curl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Копируем всё необходимое для Next.js Standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# ВАЖНО: Чтобы `npx prisma migrate` работал в standalone, 
# нам нужны движки и сам CLI. Копируем их целиком.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

EXPOSE 3000

# Используем прямой путь к бинарнику prisma для надежности
CMD ./node_modules/.bin/prisma migrate deploy && node server.js