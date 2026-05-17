import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APP_API_URL } from '../../../utils/http_utils';
import  ls  from 'localstorage-slim';

// =========================
// Types
// =========================
type Category = 'role' | 'experience' | 'goal' | 'market' | 'workStyle';

type Option = {
  value: string;
  label: string;
  description?: string;
};

type Question = {
  id: Category;
  title: string;
  subtitle?: string;
  options: Option[];
};

type Selections = Record<Category, string>;

// =========================
// Questions Data
// =========================
const questions: Question[] = [
  {
    id: 'role',
    title: "What's your primary role?",
    subtitle: "Choose the role that best describes what you do",
    options: [
      { value: 'va', label: 'Virtual Assistant', description: 'Support clients with administrative tasks' },
      { value: 'editor', label: 'Editor', description: 'Create and refine written content' }
    ]
  },
  {
    id: 'experience',
    title: "What's your experience level?",
    subtitle: "Help us understand where you're at in your journey",
    options: [
      { value: 'beginner', label: 'Beginner', description: 'Just starting out or less than 1 year' },
      { value: 'advanced', label: 'Advanced', description: 'Experienced with multiple clients' }
    ]
  },
  {
    id: 'goal',
    title: "What's your main goal?",
    subtitle: "What would make the biggest impact for you right now?",
    options: [
      { value: 'clients', label: 'Get clients fast', description: 'Find paying clients quickly' },
      { value: 'skills', label: 'Improve skills', description: 'Develop expertise and capabilities' },
      { value: 'credibility', label: 'Build credibility', description: 'Establish reputation and trust' }
    ]
  },
  {
    id: 'market',
    title: 'Which market do you target?',
    subtitle: "Where are most of your clients located?",
    options: [
      { value: 'uk', label: 'UK', description: 'United Kingdom market' },
      { value: 'us', label: 'US', description: 'United States market' },
      { value: 'nigeria', label: 'Nigeria', description: 'Nigerian market' },
      { value: 'global', label: 'Global', description: 'International clients' }
    ]
  },
  {
    id: 'workStyle',
    title: "What's your preferred work style?",
    subtitle: "How do you like to collaborate and work?",
    options: [
      { value: 'solo', label: 'Solo', description: 'Independent work, minimal collaboration' },
      { value: 'team', label: 'Team', description: 'Collaborative projects with others' },
      { value: 'flexible', label: 'Flexible', description: 'Adaptable to different situations' }
    ]
  }
];

// =========================
// Component
// =========================
const SmartStartAssessment: React.FC = () => {
  useEffect(() => {
    const fetchSavedSelections = async () => {
      try {
        const { data } = await axios.get(
          `${APP_API_URL}/smartguide`,
          { headers: { Authorization: `Bearer ${ls.get("wwph_token", { decrypt: true })}` } }
        );
  
        if (data?.selections) {
          setSelections(data.selections);
        }
      } catch (err) {
        console.log("No saved SmartGuide yet");
      }
    };
  
    fetchSavedSelections();
  }, []);

  const navigate = useNavigate();

  const [selections, setSelections] = useState<Selections>({
    role: '',
    experience: '',
    goal: '',
    market: '',
    workStyle: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const isSelected = (category: Category, value: string) =>
    selections[category] === value;

  const allQuestionsAnswered = Object.values(selections).every(v => v !== '');
  const answeredCount = Object.values(selections).filter(v => v !== '').length;

  const getLabel = (cat: Category, val: string): string => {
    const q = questions.find(q => q.id === cat);
    return q?.options.find((o: Option) => o.value === val)?.label ?? '';
  };

  const handleSelection = (category: Category, value: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (allQuestionsAnswered) {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoToSmartGuide = async () => {
    try {
      const role = selections.role.toLowerCase();
      const exp = selections.experience.toLowerCase();
      const selectedGuideId = `${role}-${exp}`;
  
      // ✅ Save to backend
      console.log("Sending guideId:", selectedGuideId);
console.log("Sending selections:", selections);
      await axios.post(
        `${APP_API_URL}/smartguide`,
        { selections, guideId: selectedGuideId },
        { headers: { Authorization: `Bearer ${ls.get("wwph_token", { decrypt: true })}` } }
      );
  
      // (optional) still keep localStorage for quick access
      localStorage.setItem("userSelections", JSON.stringify(selections));
      localStorage.setItem("selectedGuideId", selectedGuideId);
  
      // Navigate
      navigate(`/smart-guide/${selectedGuideId}`);
    }  catch (err: any) {
  console.log("FULL ERROR:", err.response?.data);
  console.log("STATUS:", err.response?.status);
  console.log("VALIDATION ERRORS:", err.response?.data?.errors);

  alert(
    err.response?.data?.message ||
    JSON.stringify(err.response?.data?.errors) ||
    "Could not save SmartGuide"
  );
}


  };

  // =========================
  // Summary View
  // =========================
  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 mt-20 via-white to-green-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2AA100] rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your SmartStart Profile</h2>
            <p className="text-gray-600">Here's what we learned about you</p>
          </div>

          <div className="space-y-4 mb-8">
            {Object.entries(selections).map(([cat, val]) => {
              const question = questions.find(q => q.id === cat);
              return (
                <div key={cat} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {question?.title}
                      </h3>
                      <p className="text-[#2AA100] font-medium text-lg">
                        {getLabel(cat as Category, val)}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 bg-[#2AA100] rounded-full ml-4">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoToSmartGuide}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#2AA100] text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to SmartGuide
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowSummary(false);
                setCurrentStep(0);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Assessment View
  // =========================
  const currentQuestion = questions[currentStep];
  const isCurrentAnswered = selections[currentQuestion.id] !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-green-50 via-white to-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SmartStart Assessment</h1>
          <p className="text-gray-600">Let's personalize your experience in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-[#2AA100]">
              {Math.round(((currentStep + (isCurrentAnswered ? 1 : 0)) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#2AA100] h-2 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentStep + (isCurrentAnswered ? 1 : 0)) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentQuestion.title}
            </h2>
            {currentQuestion.subtitle && (
              <p className="text-gray-600 text-lg">{currentQuestion.subtitle}</p>
            )}
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelection(currentQuestion.id, option.value)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  isSelected(currentQuestion.id, option.value)
                    ? 'bg-[#2AA100] text-white border-[#2AA100] shadow-lg transform scale-[1.02]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#2AA100] hover:bg-green-50 active:bg-[#2AA100] active:text-white active:border-[#2AA100]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                    {option.description && (
                      <p
                        className={`text-sm ${
                          isSelected(currentQuestion.id, option.value)
                            ? 'text-green-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {option.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected(currentQuestion.id, option.value)
                        ? 'border-white bg-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected(currentQuestion.id, option.value) && (
                      <div className="w-3 h-3 bg-[#2AA100] rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep > 0
                ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={currentStep === 0}
          >
            Back
          </button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-[#2AA100] w-8'
                    : index < currentStep || selections[questions[index].id] !== ''
                    ? 'bg-[#2AA100]'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              isCurrentAnswered
                ? 'bg-[#2AA100] text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isCurrentAnswered}
          >
            {currentStep === questions.length - 1 ? 'View Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
            
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {answeredCount} of {questions.length} questions completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartStartAssessment;
