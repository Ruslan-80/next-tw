"use client";

export default function CharacteristicsTab({ attributes }) {
  if (!attributes || attributes.length === 0) {
    return <p className="text-center py-4 text-gray-500">Нет характеристик</p>;
  }

  return (
    <div className="bg-white shadow text-xs lg:text-base rounded-md p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Характеристики</h2> */}
      <div className="divide-y">
        {attributes
          .filter((attr) => attr.attributeValueName)
          .map((attr) => (
            <div key={attr.id} className="py-3 grid grid-cols-2">
              <span className="text-gray-900">{attr.attributeName}</span>
              <span className="font-semibold">{attr.attributeValueName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
