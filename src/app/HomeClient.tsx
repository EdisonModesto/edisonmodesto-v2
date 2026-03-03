"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      let currentStep = 0;

      const animate = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          projects: Math.round(15 * easeOut),
          years: Math.round(4 * easeOut),
          achievements: Math.round(achievements.length * easeOut),
        });

        if (currentStep >= steps) {
          clearInterval(animate);
        }
      }, interval);

      return () => clearInterval(animate);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              Available for freelance work
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Edison Modesto
          </h1>
          
          <div className="h-8 mb-8">
            <span className="text-xl md:text-2xl text-gray-400">
              {displayText}
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Building beautiful, performant mobile and web applications with Flutter and modern web technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              View Projects
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:edison@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">{stats.projects}+</div>
              <div className="text-gray-500 text-sm mt-1">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">{stats.years}+</div>
              <div className="text-gray-500 text-sm mt-1">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400">{stats.achievements}</div>
              <div className="text-gray-500 text-sm mt-1">Awards</div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <a
            href="https://github.com/edisonmodesto"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/edisonmodesto"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.title}
                href={project.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-gray-800 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Recent Posts</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Achievements */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.slice(0, 2).map((exp) => (
                  <div key={exp.company} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <div className="text-sm text-purple-400 font-medium mb-1">{exp.period}</div>
                    <h3 className="text-lg font-semibold mb-1">{exp.role}</h3>
                    <div className="text-gray-400">{exp.company}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-pink-400" />
                <h2 className="text-2xl font-bold">Achievements</h2>
              </div>
              <div className="space-y-6">
                {achievements.slice(0, 2).map((achievement) => (
                  <div key={achievement.title} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <div className="text-sm text-pink-400 font-medium mb-1">{achievement.date}</div>
                    <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                    <div className="text-gray-400">{achievement.description.slice(0, 60)}...</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's work together</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
          <a
            href="mailto:edison@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
