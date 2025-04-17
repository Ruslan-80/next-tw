export default function ReviewsTab() {
    return (
        <div className="py-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                Отзывы
                <div className="flex ml-2">
                    {[1, 2, 3, 4, 5].map(star => (
                        <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-300"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    ))}
                </div>
            </h2>

            <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p className="text-center text-gray-600">
                    Станьте первым, кто оставит отзыв об этом товаре.
                </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-md">
                <p className="text-center text-gray-600">
                    <a
                        href="#"
                        className="text-[hsl(var(--ekf-red))] font-medium hover:underline"
                    >
                        Авторизуйтесь
                    </a>{" "}
                    на сайте, чтобы добавить отзыв.
                </p>
            </div>
        </div>
    );
}
