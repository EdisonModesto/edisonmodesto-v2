"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { experiences } from "@/lib/experience";
import { achievements } from "@/lib/achievements";
import { Github, Linkedin, Mail, Facebook, ExternalLink } from "lucide-react";
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
  const [btnColor, setBtnColor] = useState("#050505");

  // Typing effect for roles
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
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          projects: Math.round(15 * easeOut),
          years: Math.round(4 * easeOut),
          achievements: Math.round(9 * easeOut),
        });

        if (step >= steps) clearInterval(animate);
      }, interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full height, white background */}
      <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#050505] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Edison Modesto Jr.
              </h1>
              
              <div className="h-10 mb-4">
                <span 
                  className="text-2xl sm:text-3xl font-bold text-[#302B65]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {displayText}
                  <span className="animate-pulse">_</span>
                </span>
              </div>
              
              <p 
                className="text-lg sm:text-xl text-[#414141] mb-8"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Creating cross-platform applications that creates an impact.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="https://contra.com/edison_modesto_xaspco1y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 text-white font-medium transition-colors"
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    backgroundColor: btnColor,
                    fontSize: '18px'
                  }}
                  onMouseEnter={() => setBtnColor("#302B65")}
                  onMouseLeave={() => setBtnColor("#050505")}
                >
                  WORK WITH ME
                </a>
                
                <a
                  href="https://github.com/EdisonModesto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 hover:opacity-70 transition-opacity"
                >
                  <Github className="w-7 h-7 text-[#050505]" />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/edison-modesto-a65440219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 hover:opacity-70 transition-opacity"
                >
                  <Linkedin className="w-7 h-7 text-[#050505]" />
                </a>
              </div>
            </div>
            
            {/* Right side - Profile image */}
            <div className="flex-shrink-0">
              <div 
                className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#302B65]"
              >
                <img 
                  src="/images/me.png" 
                  alt="Edison Modesto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - White background */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-16 sm:gap-24">
            <div className="text-center">
              <div 
                className="text-4xl sm:text-5xl font-bold text-[#302B65] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {stats.projects}+
              </div>
              <div className="text-lg text-[#302B65]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Projects worked on
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="text-4xl sm:text-5xl font-bold text-[#302B65] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {stats.years}+
              </div>
              <div className="text-lg text-[#302B65]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Years of experience
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="text-4xl sm:text-5xl font-bold text-[#302B65] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {stats.achievements}+
              </div>
              <div className="text-lg text-[#302B65]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Achievements
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - White background */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#302B65] mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            My Experience
          </h2>
          <p 
            className="text-lg text-[#414141] mb-12"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Here are my experiences as a Flutter Developer.
          </p>
          
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-start gap-6">
                <div className="w-28 h-28 flex-shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={exp.logo} 
                    alt={exp.company}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-2xl font-bold text-gray-400">${exp.company.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <div className="flex-1 pt-2">
                  <h3 
                    className="text-xl font-bold text-[#050505]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {exp.company}
                  </h3>
                  <p 
                    className="text-lg text-[#050505]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {exp.role}
                  </p>
                  <p 
                    className="text-base text-[#828282] mt-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {exp.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - White background */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#302B65] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Projects i have worked on
          </h2>
          <p 
            className="text-lg text-[#414141] mb-12"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Here are some of the projects i have worked on for both of my personal and professional experience as a Flutter Developer.
          </p>
          
          <div className="flex flex-wrap gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group"
              >
                <div className="h-48 rounded-t-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, #302B65 0%, #7E60BF 100%)">
                          <span class="text-white text-lg font-medium px-4 text-center">${project.title}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="bg-white rounded-b-2xl p-6 border border-t-0 border-gray-100">
                  <h3 
                    className="text-lg font-bold text-[#050505] mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-sm text-[#414141] mb-4 line-clamp-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {project.description}
                  </p>
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
      </section>

      {/* Achievements Section - White background with timeline */}
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#050505] mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            My Achievements
          </h2>
          <p 
            className="text-lg text-[#414141] mb-16"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Here are some of my achievements in my career as a Flutter Developer
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-[#302B65] transform md:-translate-x-1/2"></div>
            
            {achievements.slice(0, 6).map((achievement, index) => (
              <div 
                key={achievement.id} 
                className={`relative flex items-start mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full bg-[#302B65] transform -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                    <img 
                      src={achievement.media} 
                      alt={achievement.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(achievement.media, '_blank')}
                    />
                  </div>
                  <h3 
                    className="text-lg font-bold text-[#050505] mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {achievement.title}
                  </h3>
                  <p 
                    className="text-sm text-[#414141]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {achievement.description}
                  </p>
                  {achievement.date && (
                    <p 
                      className="text-xs text-[#828282] mt-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {achievement.date}
                    </p>
                  )}
                </div>
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - White background */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#302B65] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Get in touch
          </h2>
          <p 
            className="text-lg text-[#414141] mb-16"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            If you have any questions or would like to get in touch with me, feel free to reach out.
          </p>
          
          <div className="flex flex-wrap justify-center gap-12">
            <a
              href="mailto:edisonmodesto22@gmail.com?subject=Contact&body=Hello Edison,"
              className="w-32 h-32 bg-[#302B65] rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Mail className="w-10 h-10 text-white" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/edison-modesto-a65440219/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-32 h-32 bg-[#050505] rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Linkedin className="w-10 h-10 text-white" />
            </a>
            
            <a
              href="https://www.facebook.com/ed.modestoo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-32 h-32 bg-[#302B65] rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Facebook className="w-10 h-10 text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section - Only if there are posts */}
      {posts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-[#302B65] mb-12"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Latest from the Blog
            </h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 
                      className="text-xl font-bold text-[#050505] mb-2 group-hover:text-[#302B65] transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {post.title}
                    </h3>
                    <p 
                      className="text-[#414141] mb-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {post.description}
                    </p>
                    <time 
                      className="text-sm text-[#828282]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
