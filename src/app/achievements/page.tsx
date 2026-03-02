import Link from "next/link";
import { achievements } from "@/lib/achievements";
import { ChevronLeft, Award } from "lucide-react";

export default function AchievementsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-10 h-10 text-[#302B65]" />
          <h1 className="text-4xl sm:text-5xl font-bold">Achievements</h1>
        </div>
        <p className="text-xl text-gray-600 mb-12">
          Here are some of my achievements in my career as a Flutter Developer.
        </p>

        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="relative pl-8 pb-8 border-l-2 border-[#302B65] last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#302B65]"></div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.date && (
                    <span className="text-sm text-gray-400 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full">
                      {achievement.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
