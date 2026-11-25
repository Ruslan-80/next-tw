export default function JsonLd({ data, script_name }) {
  if (!data) return null;

  // Защита от преждевременного закрытия script-тега
  const jsonLd = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={script_name || "jsonld-script"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
