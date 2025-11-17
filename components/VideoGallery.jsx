import Link from "next/link";
import ReactPlayer from "react-player";

export default function VideoGallery() {
  return (
    <>
      <section className="py-4 mt-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Как происходит демонтаж и установка накладок щитов этажных?
          </h3>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
          {/* Видео 1 */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <h3 className="text-2xl font-medium">
              <Link href="/product/sen24b" className="text-accent underline">
                Накладка щита этажного ЩЭ-4 на 4 квартиры (счетчика) 2-дверный
                без слаботочного отсека.
              </Link>
            </h3>

            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden max-w-[280px]">
              <ReactPlayer
                src="/video/video1.mp4"
                controls
                width="100%"
                height="100%"
                className="!w-full !h-full"
              />
            </div>
          </div>

          {/* Видео 2 */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <h3 className="text-2xl font-medium">
              <Link href="/product/sen34r" className="text-accent underline">
                Накладка щита этажного ЩЭ-4 на 4 квартиры (счетчика) 3-дверный
                со слаботочным отсеком справа.
              </Link>
            </h3>

            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden max-w-[280px]">
              <ReactPlayer
                src="/video/video2.mp4"
                controls
                width="100%"
                height="100%"
                className="!w-full !h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
