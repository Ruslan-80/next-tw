"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export default function MainComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  console.log({
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    plugins: navigator.plugins,
    platform: navigator.platform,
    battery: navigator.getBattery ? navigator.getBattery() : null,
    // all: req.all,
  });

  return (
    <div>
      <button
        onClick={() => handleButtonClick("Связаться с менеджером")}
        style={{ padding: "16px", fontSize: "20px", cursor: "pointer" }}
      >
        Связаться с менеджером
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}
