import React from 'react';
import { CheckCircle, Award, Users, Zap, Shield, Target, TrendingUp, Brain, Briefcase, Clock, Star } from 'lucide-react';

export default function RecruitPionerSection() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for the Modern Workforce
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Workason was created to solve three major problems in today's freelance industry
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 transition-all h-full hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unverified Talent</h3>
              <p className="text-gray-600 leading-relaxed">No guarantee of skills or credentials in traditional platforms</p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all h-full hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Missed Deadlines</h3>
              <p className="text-gray-600 leading-relaxed">Unreliable delivery timelines impact project success</p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-400 transition-all h-full hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust Issues</h3>
              <p className="text-gray-600 leading-relaxed">Poor job quality and lack of transparency</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Solution</h2>
            <p className="text-gray-600">Comprehensive tools designed for excellence</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-white to-pink-50 rounded-xl p-8 border border-pink-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-pink-200">
                  <Award className="w-8 h-8 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    SkillStamps™
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A role-specific verification badge issued only after passing real assessments. Each SkillStamp represents proven competency and professional standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white to-green-50 rounded-xl p-8 border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    SmartStart
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A comprehensive training pathway that equips freelancers with the skills clients actually need. Build expertise that drives real results.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <Users className="w-8 h-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    TalentVault
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A dedicated space for verified, reliable talent. Access pre-vetted professionals who meet our rigorous quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#023020] rounded-2xl p-12 mb-20">
          <div className="text-center">
            <p className="text-2xl text-white leading-relaxed max-w-4xl mx-auto">
              Every feature is designed to ensure <span className="font-bold text-pink-400">high-quality work</span>, <span className="font-bold text-green-400">fair payments</span>, and <span className="font-bold text-white">complete transparency</span> for both freelancers and employers.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-green-500 rounded-2xl mb-6 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Matching That Works for You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI engine reads job requirements and instantly recommends the most suitable freelancers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Skills Match</h4>
                  <p className="text-gray-600">Precise alignment of technical and soft skills with job requirements</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Verified Credentials</h4>
                  <p className="text-gray-600">Authenticated SkillStamps and professional certifications</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Completion History</h4>
                  <p className="text-gray-600">Proven track record of successfully delivered projects</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Role-Specific Performance</h4>
                  <p className="text-gray-600">Demonstrated success in similar positions and industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#023020] py-32">
  <div className="max-w-5xl mx-auto px-6">
    
    {/* Small Heading */}
    <p className="text-white text-lg font-semibold mb-6">
      Our culture
    </p>

    {/* Main Text */}
    <h1 className="text-white text-4xl md:text-6xl font-bold leading-snug max-w-3xl">
      We love what we do and collaborate every day,
       driven to change the world of work
    </h1>

  </div>
</div>


    </div>
  );
}