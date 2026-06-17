"use client";
import Link from "next/link";
import ShieldConfigurator from "./configurator";
// import ShieldConfigurator from "./ShieldConfigurator";
import SchemaUploader from "./SchemaUploader";
import { useState } from "react";

export default function FAQ() {
  // const FaqJsonLd = FAQPageJSONLD();
  return (
    <div className="max-w-8xl mx-auto space-y-4">
      <SchemaUploader />
      <ShieldConfigurator />
    </div>
  );
}
