import { useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  initialContent,
  onSubmit,
  submitError,
}) {
  const [formData, setFormData] = useState({ contact: "", name: "" });
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
      // Если поле name заполнено, это бот, игнорируем отправку
      setFormError("Ошибка: Форма не отправлена.");
      return;
    }
    if (!validateContact(formData.contact)) {
      setFormError("Введите корректный телефон или email.");
      return;
    }
    const result = await onSubmit(formData);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setFormError(result.error || "Ошибка отправки формы.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ contact: "", name: "" });
    setFormError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out">
      <div className="bg-white text-lg p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
        {isSubmitted ? (
          <div className="text-center">
            <p className="mb-6 text-xl text-gray-600">
              {`Ваш контакт ${formData.contact} отправлен менеджеру.`}
            </p>
            <p className="mb-6 text-xl text-gray-600">
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {initialContent}
            </h2>
            <p className="mb-6 text-xl text-gray-600">
              Укажите ваш телефон или email, и мы свяжемся с вами!
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Телефон или email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
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
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
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
