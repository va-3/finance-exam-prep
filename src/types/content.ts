export interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example: Example;
  calculatorSequence: CalculatorStep[];
  chapter: number;
}

export interface Topic {
  id: string;
  name: string;
  chapter: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[]; // IDs of prerequisite topics
  learnContent: LearnContent;
  practiceProblems: Problem[];
  masterQuestions: Question[];
}

export interface LearnContent {
  explanation: string;
  formula?: Formula;
  analogy: string;
  workedExample: Example;
}

export interface Example {
  problem: string;
  solution: string;
  steps: string[];
  answer: string | number;
}

export interface CalculatorStep {
  action: string;
  button: string;
  display: string;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'calculation';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  distractors?: string[]; // Common wrong answers
}

export interface Problem {
  id: string;
  question: string;
  type: 'multiple-choice' | 'calculation';
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  solution: string;
  correctAnswer: string | number;
  options?: string[];
}

export interface TopicProgress {
  learnCompleted: boolean;
  practiceScore: number; // 0-100
  masterScore: number; // 0-100
  attempts: number;
  lastAttemptDate?: string;
}
