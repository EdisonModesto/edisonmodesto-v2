import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ChevronLeft, Calendar } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 mb-12">
          Thoughts on Flutter, software engineering, and tech careers.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-[#302B65] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-3">{post.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
