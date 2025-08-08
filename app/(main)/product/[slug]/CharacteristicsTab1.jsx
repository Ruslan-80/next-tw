"use client";

export default function CharacteristicsTab({ attributes }) {
  if (!attributes || attributes.length === 0) {
    return <p className="text-center py-4 text-gray-500">Нет характеристик</p>;
  }

  return (
    <div className="bg-white shadow text-xs lg:text-base rounded-2xl p-6">
      <div className="flex justify-between flex-wrap items-center mb-4">
        {attributes
          .filter((attr) => attr.attributeValueName)
          .map((attr, index) => (
            <div
              key={attr.id}
              className={`flex justify-between w-[49%] p-4   ${
                Math.floor(index / 2) % 2 === 0 ? "bg-blue-700/10" : ""
              }`}
            >
              <span className="text-gray-900">{attr.attributeName}</span>
              <span className="font-semibold">{attr.attributeValueName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
