import Category from "../../components/shared/Category";
import Partners from "../../components/shared/Partners";
import JsonLd from "@/components/JsonLdComponent";
import getOrganizationJsonLd from "@/lib/organizationJsonLd";

import Slider from "../../components/Swiper";

export const metadata = {
  title:
    "Электрощитовое оборудование в сборе и металлокорпуса | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Электрощитовое оборудование в сборе и металлокорпуса по индивидуальному запросу",
};

export default function Home() {
  const organizationJsonLd = getOrganizationJsonLd();
  return (
    <>
      <JsonLd data={organizationJsonLd} script_name="organization-jsonld" />
      <main className=" container mx-auto bg-background">
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
