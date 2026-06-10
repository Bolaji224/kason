import React, { useState } from 'react';
import { User, BarChart3 } from 'lucide-react';

export default function FreelancerSponsorPlatform() {
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const plans = [
    {
      id: 'starter',
      price: '£15/month',
      title: 'Workason Sponsor 1',
      subtitle: 'SmartStart 6 months subscription',
      features: ['Basic support', 'Monthly reports', 'Email updates'],
      link: 'https://wise.com/pay/r/T2jWRBKW-wd3FFs'
    },
    {
      id: 'premium',
      price: '£30/month',
      title: 'Workason Sponsor 2',
      subtitle: 'Course bundle',
      features: ['Priority support', 'Weekly reports', 'Phone support'],
      link: 'https://wise.com/pay/r/D30qWrSuSzgE29E'
    },
    {
      id: 'custom',
      price: 'Custom',
      title: 'Enterprise',
      subtitle: 'Tailored Plan & Frequency',
      features: ['24/7 support', 'Daily reports', 'Dedicated manager'],
      link: null
    }
  ];

  const freelancers = [
    {
      id: 1,
      name: 'Joy E.',
      role: 'UI/UX Designer',
      location: 'Lagos, Nigeria',
      description: 'Manly for take 44 freelancers courses',
      image: '/api/placeholder/40/40',
      level: 'Mid Level'
    },
    {
      id: 2,
      name: 'Daniel M.',
      role: 'Web Editor',
      location: 'Lagos, Nigeria',
      description: 'Aiming to buy soft skills course',
      image: '/api/placeholder/40/40',
      level: 'Mid Level'
    }
  ];

  const impactData = [
    { month: 'Jan', courses: 12, skills: 8, jobs: 3 },
    { month: 'Feb', courses: 18, skills: 12, jobs: 5 },
    { month: 'Mar', courses: 15, skills: 10, jobs: 4 },
    { month: 'Apr', courses: 22, skills: 15, jobs: 7 }
  ];

  return (
    <div className="min-h-screen mt-20 bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2AA100' }}>
            Empower a Freelancer. Change a Life.
          </h1>
          <a
            href="https://wise.com/pay/r/T2jWRBKW-wd3FFs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: '#EE009D' }}
          >
            Sponsor Now (from £15/month)
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Plans and Freelancers */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sponsor Plans */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2AA100' }}>
                Select a Sponsor Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedPlan === plan.id
                        ? 'border-[#2AA100] bg-green-50'
                        : 'border-gray-200 hover:border-[#2AA100]'
                    }`}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      if (plan.link) window.open(plan.link, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#EE009D' }}>{plan.price}</h3>
                    <h4 className="font-semibold mb-1">{plan.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{plan.subtitle}</p>
                    <ul className="text-sm text-gray-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-1">• {feature}</li>
                      ))}
                    </ul>
                    {plan.link && (
                      <p className="text-xs text-blue-500 mt-3">Click to sponsor →</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Choose Freelancer */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#2AA100' }}>
                  Choose Your Freelancer
                </h2>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Country</option>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Skill Level</option>
                    <option>Beginner</option>
                    <option>Mid Level</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedFreelancer === freelancer.id
                        ? 'border-[#2AA100] bg-green-50'
                        : 'border-gray-200 hover:border-[#2AA100]'
                    }`}

                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{freelancer.name}</h3>
                            <p className="text-gray-600 text-sm">{freelancer.role}</p>
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {freelancer.level}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{freelancer.location}</p>
                        <p className="text-sm mb-4">{freelancer.description}</p>
                        <button
                          className="w-full py-2 text-white font-semibold rounded-lg transition-colors hover:opacity-90"
                          style={{ backgroundColor: '#2AA100' }}
                          onClick={() => {
                            const plan = plans.find(p => p.id === selectedPlan);
                            if (plan?.link) window.open(plan.link, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          Sponsor Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Live Impact Tracker */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2AA100' }}>
                Live Impact Tracker
              </h2>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 size={24} style={{ color: '#2AA100' }} />
                  <span className="font-semibold">Impact Metrics</span>
                </div>

                <div className="space-y-6">
                  {/* Chart representation */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Courses</span>
                      <span>Skills</span>
                      <span>Jobs</span>
                    </div>
                    
                    {impactData.map((data, index) => (
                      <div key={data.month} className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{data.month}</span>
                          <div className="flex gap-8">
                            <span>{data.courses}</span>
                            <span>{data.skills}</span>
                            <span>{data.jobs}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div 
                            className="h-3 rounded"
                            style={{ 
                              backgroundColor: '#2AA100',
                              width: `${(data.courses / 25) * 100}%`,
                              minWidth: '10%'
                            }}
                          />
                          <div 
                            className="h-3 rounded"
                            style={{ 
                              backgroundColor: '#EE009D',
                              width: `${(data.skills / 20) * 100}%`,
                              minWidth: '10%'
                            }}
                          />
                          <div 
                            className="h-3 rounded bg-orange-400"
                            style={{ 
                              width: `${(data.jobs / 10) * 100}%`,
                              minWidth: '10%'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold" style={{ color: '#2AA100' }}>847</p>
                      <p className="text-sm text-gray-600">Total Lives Impacted</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Courses Completed</span>
                      <span className="font-semibold" style={{ color: '#2AA100' }}>67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Skills Acquired</span>
                      <span className="font-semibold" style={{ color: '#EE009D' }}>45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Jobs Secured</span>
                      <span className="font-semibold text-orange-500">19</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Updated in real-time • 2 Minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}