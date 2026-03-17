"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const AttributeItem = ({ attribute, index }) => {
  // Логика:
  // Мобильные (1 колонка): чередуем по 1 (0, 2, 4... — синие)
  // Десктоп (2 колонки): чередуем по 2 (пары 0-1, 4-5... — синие)

  const isBlue = Math.floor(index / 2) % 2 === 0;

  return (
    <motion.div
      key={attribute.id}
      className={`
        flex justify-between w-full p-4 rounded-lg transition-colors duration-200 hover:bg-blue-100
        ${index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"} 
        ${isBlue ? "sm:bg-blue-50" : "sm:bg-gray-50"}
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      role="listitem"
    >
      <span className="text-sm md:text-base text-gray-700 font-medium">
        {attribute.attributeName}
      </span>
      <span className="text-sm md:text-base text-gray-900 font-semibold">
        {attribute.attributeValueName}
      </span>
    </motion.div>
  );
};

export default function CharacteristicsTab({
  attributes,
  emptyMessage = "Нет характеристик",
}) {
  // Кэшируем отфильтрованный список, чтобы не пересчитывать его при каждом рендере
  const filteredAttributes = useMemo(() => {
    return (attributes || []).filter((attr) => attr.attributeValueName);
  }, [attributes]);

  if (filteredAttributes.length === 0) {
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
        {filteredAttributes.map((attr, index) => (
          <AttributeItem key={attr.id} attribute={attr} index={index} />
        ))}
      </div>
    </div>
  );
}
