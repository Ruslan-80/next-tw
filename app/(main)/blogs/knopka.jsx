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
        // className="px-4 py-2 lg:px-8 lg:py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-xl"
        // className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] bg-slate-900 text-white hover:bg-slate-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
        className="btn-gold"
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
