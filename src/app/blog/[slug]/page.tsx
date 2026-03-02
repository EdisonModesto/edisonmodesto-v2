import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronLeft, Calendar } from "lucide-react";

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
      title: `${post.title} | Edison Modesto`,
      description: post.description,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-8">{children}</h1>,
  h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold mb-4 mt-8 text-[#302B65]">{children}</h2>,
  h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
  p: ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  li: ({ children }: { children: React.ReactNode }) => <li className="text-gray-700">{children}</li>,
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-[#302B65] hover:underline font-medium">{children}</a>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-[#302B65]">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>
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
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{post.description}</p>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#302B65] hover:underline">
            <ChevronLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
