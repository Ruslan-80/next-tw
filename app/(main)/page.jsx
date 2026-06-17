import Category from "../../components/shared/Category";
import Partners from "../../components/shared/Partners";
import JsonLd from "@/components/JsonLdComponent";
import getOrganizationJsonLd from "@/lib/organizationJsonLd";

import Slider from "../../components/Swiper";
import TestHeader from "@/components/testHeader";
import TestHero from "@/components/testHero";
import TestSectionText from "@/components/testSectionText";
import TestProjects from "@/components/testProjects";
import TestFooter from "@/components/testFooter";

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
      <main className=" container mx-auto">
        <h1 className="hidden">
          Производство электрощитового оборудования и металлокорпусов
        </h1>

        <Slider />
        <TestHeader />
        <TestHero />
        <TestSectionText />
        <TestProjects />
        <TestFooter />
        <Category />
        <Partners />
      </main>
    </>
  );
}
