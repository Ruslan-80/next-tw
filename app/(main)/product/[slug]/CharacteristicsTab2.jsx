"use client";

export default function CharacteristicsTab({ attributes }) {
  if (!attributes || attributes.length === 0) {
    return <p className="text-center py-4 text-gray-500">Нет характеристик</p>;
  }

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Характеристики
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attributes
          .filter((attr) => attr.attributeValueName)
          .map((attr) => (
            <div
              key={attr.id}
              className="flex justify-between items-center py-3 border-b border-gray-100"
            >
              <div className="flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{attr.attributeName}</span>
              </div>
              <span className="font-medium text-gray-900">
                {attr.attributeValueName}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
