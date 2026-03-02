import Link from "next/link";
import { projects } from "@/lib/projects";
import { Github, ExternalLink, ChevronLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Here are some of the projects I've worked on for both my personal and professional experience as a Flutter Developer.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-video bg-gradient-to-br from-[#302B65] to-[#7E60BF] flex items-center justify-center p-6">
                <span className="text-white text-lg font-medium text-center">{project.title}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
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
