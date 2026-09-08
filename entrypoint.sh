#!/bin/sh
set -e

echo "==> Применение изменений Prisma..."
npx prisma db push --skip-generate --accept-data-loss

echo "🚀 Запуск фонового воркера очереди (scripts/index.js)..."
node scripts/index.js &

echo "==> Запуск Node.js..."
exec node server.js