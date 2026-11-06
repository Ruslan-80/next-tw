"use client";
import ShieldConfigurator from "./configurator";
import SchemaUploader from "./SchemaUploader";

export default function FAQ() {
  // const FaqJsonLd = FAQPageJSONLD();
  return (
    <div className="max-w-8xl mx-auto space-y-4">
      <SchemaUploader />
      <ShieldConfigurator />
    </div>
  );
}
