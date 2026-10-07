export interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  answer: number; // 0-based index of correct option
}

// 20 questions × 5 marks = 100 marks total.  Pass mark: 14/20 correct (70 marks).
export const module1Questions: Question[] = [
  // ── Section A: Understanding the VA Role ──────────────────────────
  {
    id: 1,
    section: 'Section A: Understanding the VA Role',
    question: 'What is the main role of a Virtual Assistant?',
    options: [
      'A. Repair cars',
      'B. Support clients remotely with tasks',
      'C. Build houses',
      'D. Sell land',
    ],
    answer: 1, // B
  },
  {
    id: 2,
    section: 'Section A: Understanding the VA Role',
    question: 'A Virtual Assistant usually works:',
    options: [
      'A. Only in a hospital',
      'B. Remotely using internet tools',
      'C. Only in a classroom',
      'D. Only at night',
    ],
    answer: 1, // B
  },
  {
    id: 3,
    section: 'Section A: Understanding the VA Role',
    question: 'Which of these is a common VA task?',
    options: [
      'A. Email management',
      'B. Driving buses',
      'C. Mining gold',
      'D. Surgery',
    ],
    answer: 0, // A
  },
  {
    id: 4,
    section: 'Section A: Understanding the VA Role',
    question: 'A VA helps clients save:',
    options: [
      'A. Noise',
      'B. Time',
      'C. Rain',
      'D. Fuel only',
    ],
    answer: 1, // B
  },
  {
    id: 5,
    section: 'Section A: Understanding the VA Role',
    question: 'Which skill is important for a VA?',
    options: [
      'A. Laziness',
      'B. Organization',
      'C. Fighting',
      'D. Gossip',
    ],
    answer: 1, // B
  },

  // ── Section B: Communication & Professionalism ────────────────────
  {
    id: 6,
    section: 'Section B: Communication & Professionalism',
    question: 'If a client sends instructions, you should:',
    options: [
      'A. Ignore them',
      'B. Read carefully and confirm',
      'C. Delete message',
      'D. Reply next month',
    ],
    answer: 1, // B
  },
  {
    id: 7,
    section: 'Section B: Communication & Professionalism',
    question: "If you don't understand a task:",
    options: [
      'A. Guess',
      'B. Ask clear questions',
      'C. Complain online',
      'D. Block client',
    ],
    answer: 1, // B
  },
  {
    id: 8,
    section: 'Section B: Communication & Professionalism',
    question: 'Best tone when replying to a client:',
    options: [
      'A. Rude',
      'B. Professional and polite',
      'C. Angry',
      'D. Silent',
    ],
    answer: 1, // B
  },
  {
    id: 9,
    section: 'Section B: Communication & Professionalism',
    question: 'What builds client trust most?',
    options: [
      'A. Excuses',
      'B. Reliability and timely delivery',
      'C. Fashion',
      'D. Arguments',
    ],
    answer: 1, // B
  },
  {
    id: 10,
    section: 'Section B: Communication & Professionalism',
    question: 'Missing deadlines often can:',
    options: [
      'A. Increase trust',
      'B. Harm your reputation',
      'C. Raise salary automatically',
      'D. Do nothing',
    ],
    answer: 1, // B
  },

  // ── Section C: Tools & Productivity ──────────────────────────────
  {
    id: 11,
    section: 'Section C: Tools & Productivity',
    question: 'Which tool is used for meetings?',
    options: [
      'A. Zoom',
      'B. Spoon',
      'C. Pillow',
      'D. Mirror',
    ],
    answer: 0, // A
  },
  {
    id: 12,
    section: 'Section C: Tools & Productivity',
    question: 'Which tool helps with task management?',
    options: [
      'A. Trello',
      'B. Toaster',
      'C. Netflix',
      'D. Radio',
    ],
    answer: 0, // A
  },
  {
    id: 13,
    section: 'Section C: Tools & Productivity',
    question: 'Which tool is best for documents?',
    options: [
      'A. Google Docs',
      'B. Hammer',
      'C. Flashlight',
      'D. Kettle',
    ],
    answer: 0, // A
  },
  {
    id: 14,
    section: 'Section C: Tools & Productivity',
    question: 'Why is internet stability important?',
    options: [
      'A. For decoration',
      'B. For smooth communication and delivery',
      'C. For dancing',
      'D. For sleep',
    ],
    answer: 1, // B
  },
  {
    id: 15,
    section: 'Section C: Tools & Productivity',
    question: 'Password security is important because:',
    options: [
      'A. It protects client data',
      'B. It makes food sweeter',
      'C. It changes weather',
      'D. It grows hair',
    ],
    answer: 0, // A
  },

  // ── Section D: Business Growth & Earnings ────────────────────────
  {
    id: 16,
    section: 'Section D: Business Growth & Earnings',
    question: 'A VA can increase income by:',
    options: [
      'A. Learning new skills',
      'B. Ignoring clients',
      'C. Sleeping during deadlines',
      'D. Deleting work',
    ],
    answer: 0, // A
  },
  {
    id: 17,
    section: 'Section D: Business Growth & Earnings',
    question: 'Rates may depend on:',
    options: [
      'A. Value and skill level',
      'B. Height only',
      'C. Shoe color',
      'D. Luck only',
    ],
    answer: 0, // A
  },
  {
    id: 18,
    section: 'Section D: Business Growth & Earnings',
    question: 'Repeat clients usually come from:',
    options: [
      'A. Poor service',
      'B. Good results and consistency',
      'C. Late replies',
      'D. Arguments',
    ],
    answer: 1, // B
  },
  {
    id: 19,
    section: 'Section D: Business Growth & Earnings',
    question: 'A portfolio helps by:',
    options: [
      'A. Showing past work and ability',
      'B. Hiding skills',
      'C. Causing confusion',
      'D. Reducing trust',
    ],
    answer: 0, // A
  },
  {
    id: 20,
    section: 'Section D: Business Growth & Earnings',
    question: 'Best mindset for a successful VA:',
    options: [
      'A. Growth and professionalism',
      'B. Excuses',
      'C. Carelessness',
      'D. Delay',
    ],
    answer: 0, // A
  },
];

export {};
