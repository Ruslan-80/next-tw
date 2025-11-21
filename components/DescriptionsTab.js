"use client";

export default function DescriptionsTab({ description }) {
  if (!description || description.length === 0) {
    return (
      <p className="text-center py-4 text-gray-500">
        Пока нет описания этого товара, но мы над этим работаем
      </p>
    );
  }

  return (
    <div className="bg-white shadow text-xs lg:text-base rounded-md p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Характеристики</h2> */}
      <div className="divide-y">
        <div className="py-3 grid">
          <span
            className="text-gray-900 text-sm lg:text-2xl text-justify indent-30"
            itemProp="description"
          >
            {description}
          </span>
          {/* <span className="font-semibold">{attr.attributeValueName}</span> */}
        </div>
      </div>
    </div>
  );
}
