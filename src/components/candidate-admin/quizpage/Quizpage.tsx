import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { module1Questions } from '../../../data/module1Questions';
import BadgeModal from './BadgeModal';
import { httpPostWithToken } from '../../../utils/http_utils';

interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  answer: number;
}

const MARKS_PER_QUESTION = 5;
const TOTAL_MARKS = module1Questions.length * MARKS_PER_QUESTION; // 100
const PASS_CORRECT = 14; // 14/20 = 70 marks = pass

const PRACTICAL_TASKS = [
  'Create a Calendly account and generate your booking link.',
  'Create a sample Google Doc and upload it to Google Drive.',
  'Write a professional response to a sample client message.',
  'Set up a simple task board using Trello or Notion.',
  'Write a short plan on how you will manage your time as a Virtual Assistant.',
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showPractical, setShowPractical] = useState(false);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  const question = module1Questions[currentQuestion] as Question;
  const total = module1Questions.length;
  const progress = ((currentQuestion + 1) / total) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  // Section changes — used to show a divider label
  const prevSection =
    currentQuestion > 0
      ? (module1Questions[currentQuestion - 1] as Question).section
      : null;
  const sectionChanged = currentQuestion === 0 || question.section !== prevSection;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < total - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = async () => {
    let correct = 0;
    (module1Questions as Question[]).forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    setScore(correct);

    try {
      const response = await httpPostWithToken('skillstamp/award', {
        course_name: 'Virtual Assistant Level 1',
        score: correct,
        total_questions: total,
      });
      if (response?.skillstamp_issued) setShowBadge(true);
    } catch {
      // non-fatal — continue to show results regardless
    }

    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowPractical(false);
    setScore(0);
    setShowBadge(false);
  };

  // ── PRACTICAL WORK VIEW ────────────────────────────────────────────────────
  if (showPractical) {
    return (
      <div className="min-h-screen bg-[#FFF5F8] mt-20 lg:ml-64 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2AA100]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-sans mb-2">
                Practical Work Assessment
              </h2>
              <p className="text-gray-600 font-sans text-sm">
                Complete all 5 tasks below within your <strong>14-day window</strong> and submit
                via Google Drive.
              </p>
            </div>

            <ol className="space-y-4 mb-8">
              {PRACTICAL_TASKS.map((task, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 bg-[#f5f5f5] border border-gray-200 rounded-lg p-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EE009D] text-white text-sm font-bold font-sans flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-800 font-sans text-sm leading-relaxed pt-1">{task}</p>
                </li>
              ))}
            </ol>

            <div className="bg-[#2AA100]/10 border border-[#2AA100]/30 rounded-lg p-5 mb-8">
              <p className="text-sm font-sans text-gray-800 leading-relaxed">
                <strong className="text-[#2AA100]">How to submit:</strong> Compile all tasks into
                a shared Google Drive folder, then send the link to{' '}
                <a
                  href="mailto:assessment@workason.com"
                  className="text-[#EE009D] font-semibold hover:underline"
                >
                  assessment@workason.com
                </a>
                . Assessment must be submitted within your 14-day window.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPractical(false)}
                className="flex-1 font-sans text-sm font-medium text-[#2AA100] border-2 border-[#2AA100] hover:bg-[#2AA100] hover:text-white py-3 px-6 rounded-lg transition-colors duration-200"
              >
                ← Back to Results
              </button>
              <button
                onClick={() => navigate('/paid-course')}
                className="flex-1 font-sans text-sm font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Continue Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS VIEW ───────────────────────────────────────────────────────────
  if (showResults) {
    const marksEarned = score * MARKS_PER_QUESTION;
    const percentage = (marksEarned / TOTAL_MARKS) * 100;
    const passed = score >= PASS_CORRECT;

    return (
      <div className="min-h-screen bg-[#FFF5F8] mt-20 lg:ml-64 p-6">
        <div className="max-w-2xl mx-auto">
          {showBadge && (
            <BadgeModal
              message="You earned a SkillStamp!"
              onClose={() => setShowBadge(false)}
            />
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Score circle */}
            <div className="text-center mb-8">
              <div
                className={`w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center font-bold mb-4 ${
                  passed
                    ? 'bg-[#2AA100]/10 border-4 border-[#2AA100]'
                    : 'bg-red-50 border-4 border-red-400'
                }`}
              >
                <span
                  className={`text-3xl font-sans font-bold ${
                    passed ? 'text-[#2AA100]' : 'text-red-500'
                  }`}
                >
                  {marksEarned}
                </span>
                <span className="text-xs font-sans text-gray-500">/ {TOTAL_MARKS}</span>
              </div>

              <h2 className="text-2xl font-bold font-sans text-gray-900 mb-1">
                {passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
              </h2>
              <p className="text-gray-600 font-sans text-sm">
                You answered <strong>{score}</strong> out of <strong>{total}</strong> questions
                correctly —{' '}
                <strong className={passed ? 'text-[#2AA100]' : 'text-red-500'}>
                  {marksEarned} marks ({percentage.toFixed(0)}%)
                </strong>
              </p>
              <p className="text-xs text-gray-400 font-sans mt-1">
                Pass mark: 14/20 correct (70 marks)
              </p>
            </div>

            {/* Section breakdown */}
            {['Section A', 'Section B', 'Section C', 'Section D'].map((sec) => {
              const secQuestions = (module1Questions as Question[]).filter((q) =>
                q.section.startsWith(sec)
              );
              const secCorrect = secQuestions.filter(
                (q) => selectedAnswers[q.id - 1] === q.answer
              ).length;
              return (
                <div
                  key={sec}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 text-sm font-sans"
                >
                  <span className="text-gray-600">
                    {(module1Questions as Question[]).find((q) => q.section.startsWith(sec))
                      ?.section ?? sec}
                  </span>
                  <span
                    className={`font-bold ${
                      secCorrect === secQuestions.length
                        ? 'text-[#2AA100]'
                        : secCorrect >= Math.ceil(secQuestions.length * 0.6)
                        ? 'text-amber-500'
                        : 'text-red-500'
                    }`}
                  >
                    {secCorrect}/{secQuestions.length}
                  </span>
                </div>
              );
            })}

            {/* Review answers */}
            <div className="mt-6 bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold font-sans text-gray-900 mb-4">Review Answers</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {(module1Questions as Question[]).map((q, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-lg border ${
                        isCorrect
                          ? 'border-[#2AA100]/30 bg-[#2AA100]/5'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <p className="text-sm font-sans font-medium text-gray-800">
                        <span
                          className={`font-bold ${isCorrect ? 'text-[#2AA100]' : 'text-red-500'}`}
                        >
                          Q{index + 1}:
                        </span>{' '}
                        {q.question}
                      </p>
                      {!isCorrect && (
                        <div className="mt-1.5 text-xs font-sans space-y-0.5">
                          <p className="text-red-600">
                            Your answer:{' '}
                            {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                          </p>
                          <p className="text-[#2AA100]">
                            Correct answer: {q.options[q.answer]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleRestart}
                className="flex-1 font-sans text-sm font-medium text-[#2AA100] border-2 border-[#2AA100] hover:bg-[#2AA100] hover:text-white py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Retake Quiz
              </button>

              {passed && (
                <button
                  onClick={() => setShowPractical(true)}
                  className="flex-1 font-sans text-sm font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  View Practical Tasks →
                </button>
              )}

              <button
                onClick={() => navigate('/paid-course')}
                className="flex-1 font-sans text-sm font-medium text-white bg-[#2AA100] hover:bg-[#EE009D] py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Continue Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ VIEW ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FFF5F8] mt-20 lg:ml-64 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="bg-gray-200 h-2">
          <div
            className="bg-[#2AA100] h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold font-sans text-gray-900">
              Virtual Assistant Quiz
            </h1>
            <p className="text-sm font-sans text-gray-500 mt-0.5">{question.section}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-xs font-sans text-gray-500">Question</p>
            <p className="text-2xl font-bold font-sans text-[#EE009D]">
              {currentQuestion + 1}
              <span className="text-gray-400 text-lg">/{total}</span>
            </p>
            <p className="text-xs font-sans text-gray-400">{answeredCount} answered</p>
          </div>
        </div>

        {/* Section label — shown when section changes */}
        {sectionChanged && (
          <div className="px-8 pt-5">
            <span className="inline-block bg-[#EE009D]/10 text-[#EE009D] font-sans text-xs font-semibold px-3 py-1 rounded-full border border-[#EE009D]/20">
              {question.section}
            </span>
          </div>
        )}

        {/* Question */}
        <div className="p-8 pt-5">
          <h2 className="text-lg font-semibold font-sans text-gray-900 mb-6">
            {currentQuestion + 1}. {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 font-sans text-sm transition-all duration-150 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-[#2AA100] bg-[#2AA100]/5 text-[#2AA100] font-semibold'
                    : 'border-gray-200 text-gray-700 hover:border-[#2AA100]/50 hover:bg-[#f5f5f5]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 bg-[#f5f5f5] border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="font-sans text-sm font-medium px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:border-[#2AA100] hover:text-[#2AA100] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            ← Previous
          </button>

          <span className="text-xs font-sans text-gray-400">
            {MARKS_PER_QUESTION} marks per question · {TOTAL_MARKS} marks total
          </span>

          {currentQuestion === total - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount !== total}
              className="font-sans text-sm font-medium px-6 py-2.5 bg-[#2AA100] hover:bg-[#EE009D] text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="font-sans text-sm font-medium px-6 py-2.5 bg-[#EE009D] hover:bg-[#2AA100] text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
