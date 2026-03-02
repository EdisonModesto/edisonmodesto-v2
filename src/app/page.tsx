import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Show latest 3 posts

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Edison Modesto</h1>
        <p className="text-xl text-gray-600 mb-4">Software Engineer & Flutter Developer</p>
        <p className="text-lg text-gray-500 mb-8">Founder of Devtastic • Public Speaker</p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Read My Blog
          </Link>
          <a 
            href="https://github.com/EdisonModesto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;m a software engineer specializing in Flutter development and cross-platform applications. 
          Currently building Devtastic, a startup focused on productivity tools for developers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          I also speak at tech events about Flutter development and navigating tech careers. 
          Based in the Philippines, studying at Mapua Malayan Digital College.
        </p>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 max-w-4xl mx-auto bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Latest from the Blog</h2>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h3>
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
          {posts.length === 0 && (
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          )}
        </div>
        <div className="mt-6">
          <Link href="/blog" className="text-blue-600 hover:underline">
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
