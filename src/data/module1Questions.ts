// src/data/module1Questions.ts

// 1️⃣ Define a Question type
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
}

// 2️⃣ Export the questions array
export const module1Questions: Question[] = [
  {
    id: 1,
    question: "What is the main advantage of working as a virtual assistant?",
    options: [
      "It limits flexibility and location freedom",
      "It allows you to work remotely and collaborate globally",
      "It requires strict office hours",
      "It only applies to IT professionals"
    ],
    answer: 1
  },
  {
    id: 2,
    question:
      "A virtual assistant can charge between ___ per hour depending on skill and service level.",
    options: ["$1–$10", "$5–$300", "$50–$500", "$3–$30"],
    answer: 1
  },
  {
    id: 3,
    question: "What is the first step in starting a virtual assistant business?",
    options: [
      "Branding and marketing",
      "Acquiring clients",
      "Choosing a business name",
      "Setting your pricing"
    ],
    answer: 2
  },
  {
    id: 4,
    question: "Why is registering your business name important?",
    options: [
      "It ensures your name cannot be used by competitors",
      "It guarantees instant profits",
      "It automatically gets you clients",
      "It allows you to avoid taxes"
    ],
    answer: 0
  },
  {
    id: 5,
    question: "Which of the following best defines a virtual assistant?",
    options: [
      "A robot that automates emails",
      "A professional offering services to clients digitally",
      "An on-site administrative assistant",
      "A freelancer working only with tech companies"
    ],
    answer: 1
  },
  {
    id: 6,
    question: "The main purpose of branding and marketing for a VA is to:",
    options: [
      "Increase expenses",
      "Create recognition and attract clients",
      "Confuse competitors",
      "Avoid registration costs"
    ],
    answer: 1
  },
  {
    id: 7,
    question: "Why do business owners hire virtual assistants to manage emails?",
    options: [
      "To reduce productivity and stress",
      "To increase productivity and save time",
      "To handle physical letters",
      "To stop responding to customers"
    ],
    answer: 1
  },
  {
    id: 8,
    question: "Which of these platforms was specifically mentioned as useful for marketing?",
    options: ["Fiverr", "LinkedIn", "Workason", "Upwork"],
    answer: 2
  },
  {
    id: 9,
    question:
      "When organizing emails, what is one major reason clients rely on virtual assistants?",
    options: [
      "To reduce company emails",
      "To manage inboxes that can be stressful and time-consuming",
      "To block spam entirely",
      "To handle only promotional messages"
    ],
    answer: 1
  },
  {
    id: 10,
    question: "According to the text, what do you need to start a virtual assistant business?",
    options: [
      "A large rented office space",
      "A computer and a small workspace at home",
      "Multiple employees",
      "A degree in IT"
    ],
    answer: 1
  },
  {
    id: 11,
    question: "Virtual Assistance primarily helps businesses by:",
    options: [
      "Replacing physical offices",
      "Reducing costs and increasing productivity",
      "Eliminating client communication",
      "Limiting scalability"
    ],
    answer: 1
  },
  {
    id: 12,
    question: "Which of the following tools is used for clipboard management on Windows?",
    options: ["Spartan", "Canva", "Slack", "Asana"],
    answer: 0
  },
  {
    id: 13,
    question:
      "The process of converting printed business cards into a digital Excel file uses:",
    options: [
      "Natural Language Processing (NLP)",
      "Optical Character Recognition (OCR)",
      "Image Rendering",
      "Screen Scraping"
    ],
    answer: 1
  },
  {
    id: 14,
    question:
      "Which file format is faster and smaller but offers fewer data manipulation options?",
    options: ["Excel (.xlsx)", "CSV (.csv)", "PDF (.pdf)", "JSON (.json)"],
    answer: 1
  },
  {
    id: 15,
    question: "The main goal of data mining is to:",
    options: [
      "Collect contact details manually",
      "Identify patterns and predict trends in large datasets",
      "Format spreadsheets",
      "Remove duplicates in Excel"
    ],
    answer: 1
  },
  {
    id: 16,
    question:
      "In building an email marketing list, which practice should be avoided?",
    options: [
      "Offering incentives for subscribers",
      "Including CTAs in multiple site areas",
      "Purchasing email lists from unknown sources",
      "Using pop-ups to collect leads"
    ],
    answer: 2
  },
  {
    id: 17,
    question: "Social media research allows businesses to:",
    options: [
      "Improve audience understanding and market strategy",
      "Reduce online engagement",
      "Hide competitors’ data",
      "Automate all customer service"
    ],
    answer: 0
  },
  {
    id: 18,
    question: "Web scraping is best defined as:",
    options: [
      "Copying data from printed materials",
      "Extracting information from websites using software tools",
      "Posting content on multiple platforms",
      "Translating online articles"
    ],
    answer: 1
  },
  {
    id: 19,
    question: "Which of the following is a warning sign of a data entry scam?",
    options: [
      "Typing speed test requirement",
      "Upfront payment or “training fee” request",
      "Remote work flexibility",
      "Clear contract terms"
    ],
    answer: 1
  },
  {
    id: 20,
    question: "A well-trained virtual assistant helps businesses most by:",
    options: [
      "Handling routine tasks so managers can focus on growth",
      "Managing only financial operations",
      "Reducing the number of employees",
      "Creating new software systems"
    ],
    answer: 0
  }
];

// ✅ Ensure this file is treated as a module
export {};
