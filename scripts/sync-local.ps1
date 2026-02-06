$DB_USER = "root"
$DB_PASS = "O47sKHOweAb10Vom8aSh"
$DB_NAME = "next-tw"
$OUTPUT_FILE = "prisma/seed/dump.sql"

$MYSQLDUMP = "mysqldump"

$TABLES = @(
    "product",
    "category",
    "attribute",
    "attributevalue",
    "mediafile",
    "productattribute",
    "topslider"
)

Write-Host "📦 Создаю оптимизированный dump..." -ForegroundColor Cyan

mysqldump `
  --user=$DB_USER `
  --password=$DB_PASS `
  $DB_NAME `
  $TABLES `
  --no-tablespaces `
  --single-transaction `
  --skip-lock-tables `
  --result-file=$OUTPUT_FILE

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Dump created successfully" -ForegroundColor Green
} else {
  Write-Host "❌ Dump failed" -ForegroundColor Red
  exit 1
}