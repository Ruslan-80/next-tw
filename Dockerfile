FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
# Копируем схему заранее, чтобы сгенерировать клиент сразу после npm ci
COPY prisma ./prisma/ 
RUN npm ci && npx prisma generate

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PHASE=phase-production-build

# Повторная генерация на случай, если файлы потерялись при копировании
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD sh -c "node_modules/.bin/prisma migrate deploy && node server.js"
