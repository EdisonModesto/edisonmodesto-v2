import Link from "next/link";
import { projects } from "@/lib/projects";
import { Github, ChevronLeft } from "lucide-react";

export default function ProjectsPage() {
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
          Projects i have worked on
        </h1>
        <p 
          className="text-xl text-[#414141] mb-12 max-w-2xl"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Here are some of the projects i have worked on for both of my personal and professional experience as a Flutter Developer.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div 
                className="aspect-video flex items-center justify-center p-6"
                style={{ background: 'linear-gradient(135deg, #302B65 0%, #7E60BF 100%)' }}
              >
                <span 
                  className="text-white text-lg font-medium text-center"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {project.title}
                </span>
              </div>
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-[#050505] mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-[#414141] text-sm mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-3 py-1 bg-gray-100 rounded-full text-[#414141]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#302B65] hover:underline"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
