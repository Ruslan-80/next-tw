export const dynamic = "force-dynamic";
import AdminExcelHandler from "@/components/AdminExcelHandler";
import AdminExcelHandlerWithPreview from "@/components/AdminExcelHandlerWithPreview";

export default async function ImportPageAdmin() {
  return (
    <div className="p-4 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Импорт/Экспорт</h1>
      {/* <AdminExcelHandler /> */}
      <AdminExcelHandlerWithPreview />
    </div>
  );
}

// Файлы API роутов: Убедитесь, что все эндпоинты созданы в структуре проекта:

// app/api/admin/schema/route.js (динамическая схема Prisma)

// app/api/admin/export/route.js (генерация .xlsx через ExcelJS)

// app/api/admin/import/preview/route.js (валидация файла без сохранения)

// app/api/admin/import/route.js (сохранение в БД)

// Защита маршрута: Поскольку эта страница работает в админ-панели, убедитесь, что роут заблокирован для обычных пользователей (через Middleware или проверку сессии/роли UserRole.ADMIN на сервере).
