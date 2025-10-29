"use client";
import { useEffect } from "react";

const JsonLd = ({ data, script_name }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = script_name || "jsonld-script";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
};

export default JsonLd;
