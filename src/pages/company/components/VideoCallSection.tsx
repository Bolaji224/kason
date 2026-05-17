import React from 'react'
import { FileText, UserCheck, Award } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Apply for SkillStamp',
    description:
      'Complete 1-2 real jobs on the platform OR submit portfolio/test task. Must follow SmartGuide steps.',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-600',
  },
  {
    number: '02',
    title: 'Admin Review & Verification',
    description:
      'Our team reviews your work quality or test results to ensure you meet our standards.',
    icon: <UserCheck className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '03',
    title: 'Badge Displayed Publicly',
    description:
      'Approved badge appears under your name with a green label, boosting visibility and trust.',
    icon: <Award className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Getting your SkillStamp™ is a simple 3-step process designed to verify your skills and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>

                <div className={`bg-gradient-to-r ${step.color} p-4 rounded-2xl w-fit mb-6 text-white shadow-md`}>
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
