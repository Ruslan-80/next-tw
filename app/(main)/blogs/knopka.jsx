"use client";
import React from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import { useState } from "react";

export default function Knopka({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => handleButtonClick(props)}
        size="lg"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-xl"
      >
        {props}
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </>
  );
}
