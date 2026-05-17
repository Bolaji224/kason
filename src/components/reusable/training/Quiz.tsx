import React, { useState } from 'react';

const Quiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectAnswer = (question: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const questions = [
    {
      question: "What key skills and experiences should I highlight in my virtual assistant portfolio to attract potential clients?",
      options: [
        "My hobbies and interests",
        "Relevant skills like time management and communication",
        "My favorite TV shows",
        "Random certifications not related to virtual assistance",
      ],
      correct: "Relevant skills like time management and communication",
    },
    {
      question: "What is the first step in creating a virtual assistant portfolio?",
      options: [
        "Choosing a fancy design",
        "Identifying your target clients and services",
        "Writing a long biography",
        "Adding random images",
      ],
      correct: "Identifying your target clients and services",
    },
    {
      question: "How often should I update my portfolio?",
      options: [
        "Once a year",
        "Whenever I feel like it",
        "Regularly, as I gain new skills and experiences",
        "Only when I get a new client",
      ],
      correct: "Regularly, as I gain new skills and experiences",
    },
    {
      question: "Which tool is crucial for storing and sharing files securely with clients?",
      options: [
        "USB flash drives",
        "Cloud storage solutions like Google Drive or Dropbox",
        "Email attachments only",
        "Printed documents",
      ],
      correct: "Cloud storage solutions like Google Drive or Dropbox",
    },
    {
      question: "For effective communication with clients, which tool is essential?",
      options: [
        "Instant messaging apps like Slack or Microsoft Teams",
        "Personal social media accounts",
        "A regular phone call",
        "Handwritten letters",
      ],
      correct: "Instant messaging apps like Slack or Microsoft Teams",
    },
    // Add more questions here...
  ];

  return (
    <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2">{q.question}</p>
            {q.options.map((option, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  checked={selectedAnswers[`question${index}`] === option}
                  onChange={() => handleSelectAnswer(`question${index}`, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={submitted}
        >
          {submitted ? 'Submitted' : 'Submit'}
        </button>
      </form>
      {submitted && (
        <div className="mt-4 text-green-500">
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              {selectedAnswers[`question${index}`] === q.correct ? (
                <p className="text-green-600">Correct: {q.question}</p>
              ) : (
                <p className="text-red-600">
                  Incorrect: {q.question} - Correct Answer: {q.correct}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
