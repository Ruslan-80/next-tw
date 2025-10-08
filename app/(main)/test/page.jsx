import React from "react";
import {
  KozhukhTop,
  KozhukhBottom,
} from "components/shared/kozhuh-she-dlya-etazhnogo-shita.jsx";
import {
  ShityEtazhnyeBottom,
  ShityEtazhnyeTop,
} from "@/components/shared/shity-etazhnye-she";

const page = () => {
  return (
    <div className="container mx-auto p-6 bg-background text-2xl">
      <ShityEtazhnyeTop />
      <ShityEtazhnyeBottom />
    </div>
  );
};

export default page;
