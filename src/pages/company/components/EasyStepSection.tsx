import React from 'react'
import { ShieldCheck, Rocket, Briefcase } from 'lucide-react'

const badgeTypes = [
  {
    title: 'Verified',
    description: 'Awarded after passing test task or real work review. Boosts profile trust.',
    icon: <ShieldCheck className="w-8 h-8" />,
    color: 'from-green-400 to-green-500',
  },
  {
    title: 'Pro',
    description: 'Given to top-performing freelancers based on reviews, responsiveness, and consistency.',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-blue-400 to-blue-500',
  },
  {
    title: 'Agency',
    description: 'Identifies high-quality teams and businesses with multiple members.',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-pink-400 to-pink-500',
  },
]

const BadgeTypes: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Types of <span className="text-pink-600">SkillStamps</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Each badge has a unique meaning and helps freelancers stand out based on their status and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badgeTypes.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${badge.color} p-4 rounded-2xl w-fit mb-6 text-white shadow-md`}>
                {badge.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{badge.title}</h3>
              <p className="text-gray-600 leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BadgeTypes
