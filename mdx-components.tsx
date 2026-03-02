import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children }) => <a href={href} className="text-blue-600 hover:underline">{children}</a>,
    code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
    pre: ({ children }) => <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
    ...components,
  };
}
