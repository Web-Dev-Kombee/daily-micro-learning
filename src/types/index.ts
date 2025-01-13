export interface User {
  id: string;
  email: string;
  displayName: string;
  selectedTopics: string[];
  streak: number;
  lastLoginDate: Date;
  reminderTime: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
  };
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  topic: string;
  type: "text" | "video" | "audio";
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}
