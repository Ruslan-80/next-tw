import { useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  initialContent,
  onSubmit,
  productName,
  submitError,
}) {
  const [formData, setFormData] = useState({
    contact: "",
    name: "",
    message: "",
    productName,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const validateContact = (contact) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    return emailRegex.test(contact) || phoneRegex.test(contact);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name) {
      setFormError("Ошибка: Форма не отправлена.");
      return;
    }

    if (!validateContact(formData.contact)) {
      setFormError("Введите корректный телефон или email.");
      return;
    }

    // 1. Получаем URL текущей страницы, где открыта форма
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    // 2. Формируем сообщение, добавляя в него URL страницы
    const formattedMessage = [
      initialContent,
      formData.message ? `Комментарий: ${formData.message}` : "",
      `Страница отправки: ${currentUrl}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const dataToSend = {
      ...formData,
      message: formattedMessage,
    };

    const result = await onSubmit(dataToSend);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setFormError(result.error || "Ошибка отправки формы.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    // При сбросе возвращаем productName из пропсов, чтобы не ломать логику при повторном открытии
    setFormData({
      contact: "",
      name: "",
      message: "",
      productName: productName || "",
    });
    setFormError("");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
      onClick={handleOverlayClick}
    >
      <div className="bg-card text-lg p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-105 dark:bg-gray-900 dark:text-white">
        {isSubmitted ? (
          <div className="text-center">
            <p className="mb-6 text-xl text-text">
              {`Ваш контакт ${formData.contact} отправлен менеджеру.`}
            </p>
            <p className="mb-6 text-xl text-text">
              В ближайшее время менеджер с вами свяжется.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2 className="bg-card text-2xl font-bold mb-4 text-text">
              {initialContent}
            </h2>
            <p className="mb-6 text-xl text-text">
              Укажите Ваш телефон или email, и мы свяжемся с вами!
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Телефон или email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Сообщение (опционально)"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {formError && (
                <p className="text-red-500 mb-4 text-sm">{formError}</p>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  // className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  className="btn-gold"
                >
                  Отправить
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
