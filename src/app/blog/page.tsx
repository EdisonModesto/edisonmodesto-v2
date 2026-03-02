import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 mb-12 text-lg">
        Thoughts on Flutter, software engineering, and tech careers.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-0">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">{post.description}</p>
            <time className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500 text-center py-12">No posts yet. Check back soon!</p>
      )}
    </main>
  );
}
