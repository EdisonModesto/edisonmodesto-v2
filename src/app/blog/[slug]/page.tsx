import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
  h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
  h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
  p: ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed">{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  li: ({ children }: { children: React.ReactNode }) => <li className="mb-1">{children}</li>,
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-600 hover:underline">{children}</a>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
  ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4 max-w-3xl mx-auto">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <time className="text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>
        <MDXRemote source={post.content} components={components} />
      </article>
    </main>
  );
}
