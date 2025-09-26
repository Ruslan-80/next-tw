import Category from "../../components/shared/Category";
import Partners from "../../components/shared/Partners";

import Slider from "../../components/Swiper";

export const metadata = {
  title:
    "Электрощитовое оборудование в сборе и металлокорпуса | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Электрощитовое оборудование в сборе и металлокорпуса по индивидуальному запросу",
};

export default function Home() {
  return (
    <>
      <main className=" container mx-auto bg-white">
        <h1 className="hidden">
          Производство электрощитового оборудования и металлокорпусов
        </h1>
        <Slider />
        <Category />
        <Partners />
      </main>
    </>
  );
}
