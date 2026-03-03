"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { experiences } from "@/lib/experience";
import { achievements } from "@/lib/achievements";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Calendar, Award, Briefcase, Code2 } from "lucide-react";
import type { Post } from "@/lib/posts";

const roles = ["Flutter Developer", "Software Engineer", "Freelance Developer", "Resource Speaker"];

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({ projects: 0, years: 0, achievements: 0 });

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Stats animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1000;
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const animate = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          projects: Math.round(10 * progress),
          years: Math.round(4 * progress),
          achievements: Math.round(9 * progress),
        });
        
        if (step >= steps) clearInterval(animate);
      }, interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Edison Modesto Jr.
              </h1>
              <div className="h-12 mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#302B65]">
                  {displayText}
                  <span className="animate-pulse">_</span>
                </span>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
                Creating cross-platform applications that create an impact. 
                Founder of Devtastic. Public speaker for Flutter and tech career events.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://contra.com/edison_modesto_xaspco1y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#302B65] transition-colors"
                >
                  Work With Me
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Read My Blog
                </Link>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/EdisonModesto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/edison-modesto-a65440219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:edisonmodesto22@gmail.com"
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[#302B65] shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-[#302B65] to-[#7E60BF] flex items-center justify-center text-white text-6xl font-bold">
                    EM
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#302B65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stats.projects}+</div>
              <div className="text-white/80">Projects Worked On</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stats.years}+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stats.achievements}+</div>
              <div className="text-white/80">Achievements</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              I'm a software engineer specializing in Flutter development and cross-platform applications. 
              Currently building <strong>Devtastic</strong>, a startup focused on productivity tools for developers.
            </p>
            <p>
              I also speak at tech events about Flutter development and navigating tech careers. 
              Based in the Philippines, studying at Mapua Malayan Digital College. I'm passionate about 
              creating accessible, impactful applications that solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-[#302B65]" />
            <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-[#302B65] font-medium">{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Code2 className="w-8 h-8 text-[#302B65]" />
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-2 text-[#302B65] hover:underline">
              View all projects
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <div key={project.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-[#302B65] to-[#7E60BF] flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{project.title}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
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
          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[#302B65]">
              View all projects
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-[#302B65]" />
            <h2 className="text-3xl sm:text-4xl font-bold">Achievements</h2>
          </div>
          <div className="space-y-6">
            {achievements.slice(0, 5).map((achievement) => (
              <div key={achievement.id} className="relative pl-8 pb-8 border-l-2 border-[#302B65] last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#302B65]"></div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.date && (
                      <span className="text-sm text-gray-400 whitespace-nowrap">{achievement.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {achievements.length > 5 && (
            <div className="mt-8 text-center">
              <Link href="/achievements" className="inline-flex items-center gap-2 text-[#302B65] hover:underline">
                View all achievements
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      {posts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">Latest from the Blog</h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#302B65] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{post.description}</p>
                        <time className="text-sm text-gray-400">
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
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#302B65] hover:underline">
                View all posts
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. 
            I'm always open to discussing new opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:edisonmodesto22@gmail.com"
              className="inline-flex items-center gap-3 bg-[#302B65] text-white px-6 py-4 rounded-xl hover:bg-[#252250] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">edisonmodesto22@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/edison-modesto-a65440219/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
