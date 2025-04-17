export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl text-black">Страница не найдена</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">
                Вернуться на главную
            </a>
        </div>
    );
}
