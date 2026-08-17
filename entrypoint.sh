#!/bin/sh
set -e

echo "==> Применение изменений Prisma..."
npx prisma db push --skip-generate --accept-data-loss

echo "==> Запуск Node.js..."
exec node server.js