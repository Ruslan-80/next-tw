import Category from "@/components/shared/Category";
import Partners from "@/components/shared/Partners";

import Slider from "@/components/Swiper";

export default function Home() {
  return (
    <>
      <main className="container mx-auto bg-white">
        <Slider />
        <Category />
        <Partners />
      </main>
    </>
  );
}
