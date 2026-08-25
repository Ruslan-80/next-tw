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

  const [files, setFiles] = useState([]); // Состояние для хранения файлов
  const [agreed, setAgreed] = useState(false);
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

  // Обработчик выбора файлов
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // 1. Добавляем файлы к существующим в интерфейсе
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // 2. Фоново отправляем файлы на сервер для немедленного сохранения на диске
      newFiles.forEach((file) => uploadFileInBackground(file));

      // Сбрасываем значение input, чтобы можно было повторно выбрать тот же файл
      e.target.value = "";
    }
  };

  const uploadFileInBackground = async (file) => {
    try {
      const body = new FormData();
      body.append("file", file);

      // Фоновый запрос на сервер
      await fetch("/api/upload-temp", {
        method: "POST",
        body,
      });
    } catch (error) {
      console.error("Ошибка фоновой загрузки файла:", error);
    }
  };

  // Удаление файла из списка перед отправкой
  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
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

    if (!agreed) {
      setFormError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    const formattedMessage = [
      initialContent,
      formData.message ? `Комментарий: ${formData.message}` : "",
      `Страница отправки: ${currentUrl}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    // Формируем FormData для отправки текстовых полей и файлов
    const submissionData = new FormData();
    submissionData.append("contact", formData.contact);
    submissionData.append("message", formattedMessage);
    if (formData.productName) {
      submissionData.append("productName", formData.productName);
    }

    // Добавляем файлы
    files.forEach((file) => {
      submissionData.append("files", file);
    });

    const result = await onSubmit(submissionData);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setFormError(result.error || "Ошибка отправки формы.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setAgreed(false);
    setFiles([]); // Сброс выбранных файлов
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
              className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300 dark:bg-gray-700 dark:text-gray-200"
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

              {/* Блок прикрепления файлов */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Прикрепить файлы (документы, изображения):
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.txt"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-800 dark:file:text-blue-400"
                />

                {/* Список прикрепленных файлов с возможностью удаления */}
                {files.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded"
                      >
                        <span className="truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2 font-bold"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

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

              <div className="mb-4 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="privacy"
                  className="text-xs text-gray-600 dark:text-gray-300 cursor-pointer leading-tight"
                >
                  Даю согласие на{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500 hover:text-blue-600"
                  >
                    обработку персональных данных
                  </a>{" "}
                  в соответствии с ФЗ №152.
                </label>
              </div>

              {formError && (
                <p className="text-red-500 mb-4 text-sm">{formError}</p>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300 dark:bg-gray-700 dark:text-gray-200"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`btn-gold ${
                    !agreed ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
