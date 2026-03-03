import Link from "next/link";
import { achievements } from "@/lib/achievements";
import { ChevronLeft } from "lucide-react";

export default function AchievementsPage() {
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
          className="text-4xl sm:text-5xl font-bold text-[#050505] mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          My Achievements
        </h1>
        <p 
          className="text-xl text-[#414141] mb-16"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Here are some of my achievements in my career as a Flutter Developer
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-[#302B65] transform md:-translate-x-1/2"></div>
          
          {achievements.map((achievement, index) => (
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
                <h3 
                  className="text-xl font-bold text-[#050505] mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {achievement.title}
                </h3>
                <p 
                  className="text-[#414141]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {achievement.description}
                </p>
                {achievement.date && (
                  <p 
                    className="text-sm text-[#828282] mt-2"
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
    </main>
  );
}
