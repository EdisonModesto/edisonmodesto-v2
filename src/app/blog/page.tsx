import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ChevronLeft, Calendar } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#414141] hover:text-[#302B65] mb-8 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <h1 
          className="text-4xl sm:text-5xl font-bold text-[#302B65] mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Blog
        </h1>
        <p 
          className="text-xl text-[#414141] mb-12"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Thoughts on Flutter, software engineering, and tech careers.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 
                    className="text-xl font-bold text-[#050505] mb-2 group-hover:text-[#302B65] transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {post.title}
                  </h2>
                  <p 
                    className="text-[#414141] mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#828282]">
                    <Calendar className="w-4 h-4" />
                    <time style={{ fontFamily: 'Poppins, sans-serif' }}>
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
            <p className="text-[#828282]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
