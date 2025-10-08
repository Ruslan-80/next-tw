"use client";

import ReactCompareImage from "react-compare-image";
import Image from "next/image";

// export function WorksSection() {
//   return (
//     <section className="container mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
//         Выполненные работы
//       </h2>

//       <div className="grid gap-8 md:grid-cols-2">
//         {/* 1 */}
//         <div className="rounded-xl shadow-lg overflow-hidden">
//           <ReactCompareImage
//             leftImage="/images/after/after-1.jpg"
//             rightImage="/images/after/photo2.jpg"
//             sliderLineColor="#2563eb"
//             sliderPositionPercentage={0.5}
//           />
//         </div>

//         {/* 2 */}
//         <div className="rounded-xl shadow-lg overflow-hidden">
//           <ReactCompareImage
//             leftImage="/images/after/after-2.jpg"
//             rightImage="/images/after/after-2.jpg"
//             sliderLineColor="#2563eb"
//             sliderPositionPercentage={0.5}
//           />
//         </div>

//         {/* 3 */}
//         <div className="rounded-xl shadow-lg overflow-hidden">
//           <ReactCompareImage
//             leftImage="/images/after/after-3.jpg"
//             rightImage="/images/after/after-3.jpg"
//             sliderLineColor="#2563eb"
//             sliderPositionPercentage={0.5}
//           />
//         </div>

//         {/* 4 */}
//         <div className="rounded-xl shadow-lg overflow-hidden">
//           <ReactCompareImage
//             leftImage="/images/after/after-4.jpg"
//             rightImage="/images/after/after-4.jpg"
//             sliderLineColor="#2563eb"
//             sliderPositionPercentage={0.5}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
export default function WorksGallery() {
  const images = [
    "/images/after/after-1.jpg",
    "/images/after/after-2.jpg",
    "/images/after/after-3.jpg",
    "/images/after/after-4.jpg",
    "/images/after/after-5.jpg",
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Выполненные работы
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={src}
              alt={`Выполненная работа ${idx + 1}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
