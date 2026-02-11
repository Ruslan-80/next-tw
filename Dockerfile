FROM node:20-alpine AS base

# --- Слой зависимостей ---
FROM base AS deps
# Prisma требует openssl и libc6-compat в Alpine
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/ 
RUN npm ci

# --- Слой сборки ---
FROM base AS builder
# Добавляем openssl и сюда
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PHASE=phase-production-build

# Генерируем клиент и собираем билд
RUN npx prisma generate
RUN npm run build

# --- Финальный слой (Runner) ---
FROM base AS runner
# Prisma CLI в runtime требует openssl
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Копируем standalone сборку
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ВАЖНО: Копируем папку prisma (с файлом schema.prisma и папкой migrations)
# Без этого migrate deploy не найдет миграции
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Изменяем CMD: сначала миграции, потом запуск сервера
# Используем npx prisma, так как prisma есть в dependencies в package.json
CMD npx prisma migrate deploy && node server.js