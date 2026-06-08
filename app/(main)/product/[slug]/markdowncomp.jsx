import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function ProductDescription({ description }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(description);

  if (isHtml) {
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  }

  const normalizedDescription = description
    ?.replace(/\\n/g, "\n")
    ?.replace(/\\t/g, "\t");

  return (
    <div className="prose max-w-none text-gray-700 text-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          strong: ({ children }) => (
            <strong className="text-2xl font-bold pb-4">{children}</strong>
          ),
          p: ({ children }) => <p className="">{children}</p>,
          ul: ({ children }) => <ul className="">{children}</ul>,
          li: ({ children }) => <li className="">{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className="text-blue-500 underline">
              {children}
            </a>
          ),
        }}
      >
        {normalizedDescription}
      </ReactMarkdown>
    </div>
  );
}
