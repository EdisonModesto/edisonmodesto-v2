import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edison Modesto | Flutter Developer & Software Engineer",
  description: "Software Engineer specializing in Flutter development. Founder of Devtastic. Public speaker for Flutter and tech career events.",
  keywords: ["Flutter", "Software Engineer", "Developer", "Philippines", "Cross-platform"],
  authors: [{ name: "Edison Modesto" }],
  openGraph: {
    title: "Edison Modesto | Flutter Developer",
    description: "Creating cross-platform applications that create an impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-[#302B65] transition-colors">
                Edison Modesto
              </Link>
              <div className="hidden sm:flex items-center gap-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</Link>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
                <Link href="/achievements" className="text-gray-600 hover:text-gray-900 transition-colors">Achievements</Link>
              </div>
              <a
                href="mailto:edisonmodesto22@gmail.com"
                className="hidden sm:inline-flex items-center gap-2 bg-[#302B65] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#252250] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Edison Modesto</h3>
                <p className="text-gray-400 text-sm">
                  Flutter Developer & Software Engineer<br />
                  Building impactful cross-platform applications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/achievements" className="hover:text-white transition-colors">Achievements</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Connect</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="https://github.com/EdisonModesto" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/edison-modesto-a65440219/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="mailto:edisonmodesto22@gmail.com" className="hover:text-white transition-colors">Email</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Edison Modesto. Built with Next.js.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
