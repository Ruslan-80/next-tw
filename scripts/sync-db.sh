#!/bin/bash

# --- НАСТРОЙКИ ---
SSH_HOST="89.23.101.24"            # IP вашего сервера
SSH_USER="root"                      # Пользователь вашего сервера
SSH_PASS="yb,MqMRU9jqHKD"            # IP вашего сервера

DB_NAME="default"         # Имя базы в Coolify/Docker
DB_USER="root"                 # Пользователь базы данных
DB_PASS="0DuzQPmtVHMtpIoLnF1VA9BdZUdvSQDNTU8OutJ8tn3Cg1PjIPaBh0FhMWYbDqan"             # Пароль базы (можно оставить пустым, если есть .my.cnf)
DB_PORT="3306"                 # Порт базы данных
CONTAINER_NAME="mysql://mysql:0DuzQPmtVHMtpIoLnF1VA9BdZUdvSQDNTU8OutJ8tn3Cg1PjIPaBh0FhMWYbDqan@i0ko0oowk88s00s04ooks84c:3306/default"               # Имя контейнера с MySQL в Coolify (обычно это часть имени сервиса)

OUTPUT_FILE="prisma/seed/dump.sql"

echo "🚀 Начинаю экспорт базы данных с сервера $SSH_HOST..."

# --- ВЫПОЛНЕНИЕ ---
# Мы подключаемся по SSH, заходим внутрь Docker-контейнера, 
# делаем дамп и передаем поток данных прямо в локальный файл.
ssh $SSH_USER@$SSH_HOST "docker exec $CONTAINER_NAME mysqldump -u$DB_USER -p$DB_PASS $DB_NAME --no-tablespaces --ignore-table=$DB_NAME.users" > $OUTPUT_FILE

# Проверка результата
if [ $? -eq 0 ]; then
    echo "✅ Дамп успешно сохранен в $OUTPUT_FILE"
    # Опционально: выводим размер файла
    du -sh $OUTPUT_FILE
else
    echo "❌ Ошибка при создании дампа"
    exit 1
fi