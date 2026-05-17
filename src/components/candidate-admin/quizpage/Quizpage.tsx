import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { module1Questions } from '../../../data/module1Questions';
import axios from 'axios';
import BadgeModal from './BadgeModal';
import { httpPostWithToken } from '../../../utils/http_utils';

// 1️⃣ Define a type for a question
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
}

export default function QuizPage() {
  const [showBadge, setShowBadge] = useState(false);
  const navigate = useNavigate(); // Add this to enable navigation
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < module1Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleContinueCourse = () => {
    navigate('/paid-course'); // ✅ Navigate to paid course
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    module1Questions.forEach((q: Question, index: number) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
  
    setScore(calculatedScore);
  
    try {
      const response = await httpPostWithToken('skillstamp/award', {
        course_name: "Virtual Assistant Level 1",
        score: calculatedScore, // raw score
        total_questions: module1Questions.length, // total questions dynamically
      });
  
      console.log("Award response:", response);
  
      if (response.skillstamp_issued) {
        setShowBadge(true);
      }
    } catch (err) {
      console.error("Error awarding skillstamp:", err);
    }
  
    setShowResults(true);
  };
  
  
  

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / module1Questions.length) * 100;
  const question = module1Questions[currentQuestion] as Question;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  // ---------------- RESULTS PAGE ----------------
  if (showResults) {
    const percentage = (score / module1Questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div
              className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold ${
                passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              {percentage.toFixed(0)}%
            </div>

            <h2 className="text-3xl font-bold mt-6">
              {passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
            </h2>

            <p className="text-gray-600 mb-6">
              You scored {score} out of {module1Questions.length}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Review Answers</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {(module1Questions as Question[]).map((q: Question, index: number) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === q.answer;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <p className="text-sm font-medium">
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          Q{index + 1}:
                        </span>{' '}
                        {q.question}
                      </p>

                      {!isCorrect && (
                        <div className="text-xs mt-2">
                          <p className="text-red-600">Your answer: {q.options[userAnswer]}</p>
                          <p className="text-green-600">Correct answer: {q.options[q.answer]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {showBadge && (
                          <BadgeModal
                          message="You earned a SkillStamp!"
                          onClose={() => setShowBadge(false)}
                        />                        
                        )}

            {/* ✅ Buttons side by side */}
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={handleRestart}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Retake Quiz
              </button>

              <button
                onClick={handleContinueCourse}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Continue Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- QUIZ PAGE ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="bg-gray-200 h-2">
          <div className="bg-indigo-600 h-2 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Virtual Assistant Quiz</h1>
            <p className="text-sm text-gray-600">Module 1 Assessment</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Question</p>
            <p className="text-2xl font-bold text-indigo-600">
              {currentQuestion + 1}/{module1Questions.length}
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion === module1Questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount !== module1Questions.length}
              className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
