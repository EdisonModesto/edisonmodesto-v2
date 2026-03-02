import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="border-b border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-blue-600">
            Edison Modesto
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
          </div>
        </div>
      </nav>
      {children}
      <footer className="border-t border-gray-200 py-8 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Edison Modesto. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
