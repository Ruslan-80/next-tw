"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export default function BlogCta({
  title,
  description,
  buttonText,
  modalTitle,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleFormSubmit, error } = useFormSubmit();

  return (
    <>
      <div className="bg-accent/5 border-l-4 border-accent p-6 lg:p-8 rounded-r-xl my-10 shadow-sm">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-text">
          {title}
        </h3>
        <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-text/80">
          {description}
        </p>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="bg-accent font-bold text-background hover:bg-accent/90 text-lg px-8 py-6 h-auto"
        >
          {buttonText}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        onSubmit={handleFormSubmit}
        error={error}
      />
    </>
  );
}
