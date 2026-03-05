import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ScrollLink from "./components/ScrollLink";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

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
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} bg-white`}>
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-[#302B65] transition-colors">
                Edison Modesto
              </Link>
              <div className="hidden sm:flex items-center gap-8">
                <ScrollLink href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</ScrollLink>
                <ScrollLink href="#experience" className="text-gray-600 hover:text-gray-900 transition-colors">Experience</ScrollLink>
                <ScrollLink href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</ScrollLink>
                <ScrollLink href="#achievements" className="text-gray-600 hover:text-gray-900 transition-colors">Achievements</ScrollLink>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              </div>
              <ScrollLink
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 bg-[#302B65] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#252250] transition-colors"
              >
                Contact
              </ScrollLink>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-[#050505] mb-4">Edison Modesto</h3>
                <p className="text-[#414141] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Flutter Developer & Software Engineer<br />
                  Building impactful cross-platform applications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#050505] mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[#414141] text-sm">
                  <li><ScrollLink href="#home" className="hover:text-[#302B65] transition-colors">Home</ScrollLink></li>
                  <li><ScrollLink href="#experience" className="hover:text-[#302B65] transition-colors">Experience</ScrollLink></li>
                  <li><ScrollLink href="#projects" className="hover:text-[#302B65] transition-colors">Projects</ScrollLink></li>
                  <li><ScrollLink href="#achievements" className="hover:text-[#302B65] transition-colors">Achievements</ScrollLink></li>
                  <li><Link href="/blog" className="hover:text-[#302B65] transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#050505] mb-4">Connect</h3>
                <ul className="space-y-2 text-[#414141] text-sm">
                  <li><a href="https://github.com/EdisonModesto" target="_blank" rel="noopener noreferrer" className="hover:text-[#302B65] transition-colors">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/edison-modesto-a65440219/" target="_blank" rel="noopener noreferrer" className="hover:text-[#302B65] transition-colors">LinkedIn</a></li>
                  <li><a href="mailto:edisonmodesto22@gmail.com" className="hover:text-[#302B65] transition-colors">Email</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-8 text-center text-[#828282] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              © {new Date().getFullYear()} Edison Modesto. Built with Next.js.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
