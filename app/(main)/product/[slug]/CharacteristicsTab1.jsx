"use client";

import { motion } from "framer-motion"; // Для анимаций (опционально)

// Компонент для рендеринга отдельного атрибута
const AttributeItem = ({ attribute, index }) => (
  <motion.div
    key={attribute.id}
    className={`flex justify-between w-full  p-4 rounded-lg ${
      Math.floor(index / 2) % 2 === 0 ? "bg-blue-50" : "bg-gray-50"
    } hover:bg-blue-100 transition-colors duration-200`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    role="listitem"
  >
    <span className="text-gray-700 font-medium">{attribute.attributeName}</span>
    <span className="text-gray-900 font-semibold">
      {attribute.attributeValueName}
    </span>
  </motion.div>
);

export default function CharacteristicsTab({
  attributes,
  emptyMessage = "Нет характеристик",
}) {
  if (!attributes || attributes.length === 0) {
    return (
      <p className="text-center py-6 text-gray-500 text-sm md:text-base">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        role="list"
        aria-label="Характеристики"
      >
        {attributes
          .filter((attr) => attr.attributeValueName)
          .map((attr, index) => (
            <AttributeItem key={attr.id} attribute={attr} index={index} />
          ))}
      </div>
    </div>
  );
}
