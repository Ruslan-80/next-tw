FROM node:20-alpine AS base

# --- Слой зависимостей ---
FROM base AS deps
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
# Устанавливаем curl для Coolify и openssl для Prisma
RUN apk add --no-cache openssl curl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Устанавливаем prisma глобально в финальном слое
# Это гарантирует наличие бинарников и движков (engines) в системе
RUN npm install -g prisma@6.17.0

# 2. Копируем результаты сборки Next.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# 3. Теперь команда 'prisma' доступна во всей системе.
# Используем путь к схеме явно.
# CMD prisma migrate deploy --schema ./prisma/schema.prisma && node server.js
# CMD prisma db push --accept-data-loss && node server.js
# CMD prisma migrate deploy && node server.js
# CMD npx prisma db push --skip-generate && node server.js

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]