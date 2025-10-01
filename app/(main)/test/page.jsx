import React from "react";
import {
  KozhukhTop,
  KozhukhBottom,
} from "components/shared/kozhuh-she-dlya-etazhnogo-shita.jsx";

const page = () => {
  return (
    <div className="container mx-auto p-6 bg-background text-2xl">
      <KozhukhTop />
      <KozhukhBottom />
    </div>
  );
};

export default page;
