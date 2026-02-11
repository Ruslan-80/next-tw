FROM node:20-alpine AS base

# --- Слой зависимостей ---
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/ 
# Устанавливаем ВСЕ зависимости для сборки
RUN npm ci

# --- Слой сборки ---
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
# Копируем зависимости и исходники
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PHASE=phase-production-build
RUN npx prisma generate
RUN npm run build

# --- Финальный слой (Runner) ---
FROM base AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# В Standalone режиме Next.js создает сервер в .next/standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# ХИТРОСТЬ: Чтобы работал `npx prisma`, нам нужен сам исполняемый файл prisma в финальном образе.
# Мы копируем только его, а не все node_modules (это сэкономит ~200МБ)
COPY --from=builder /app/node_modules/.bin/prisma /usr/local/bin/prisma
COPY --from=builder /app/node_modules/@prisma/engines /app/node_modules/@prisma/engines

EXPOSE 3000

# Запуск. Теперь prisma доступна как команда.
CMD prisma migrate deploy && node server.js