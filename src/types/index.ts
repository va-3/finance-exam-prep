// Core Type Definitions for Finance Exam Prep

export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
  units?: string;
}

export interface Formula {
  id: string;
  name: string;
  category: string;
  chapter: number;
  formula: string;
  latex?: string;
  variables: FormulaVariable[];
  description: string;
  example?: {
    problem: string;
    solution: string;
    values: Record<string, number | string>;
  };
  relatedFormulas?: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface CalculatorSequence {
  id: string;
  name: string;
  description: string;
  formulaId: string;
  steps: CalculatorStep[];
  example: {
    inputs: Record<string, number>;
    expectedOutput: number;
  };
  tips?: string[];
}

export interface CalculatorStep {
  stepNumber: number;
  instruction: string;
  keys: string[];
  display?: string;
  note?: string;
}

export interface Topic {
  id: string;
  name: string;
  chapter: number;
  description: string;
  prerequisites: string[];
  formulas: string[];
  learningObjectives: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
}

export interface PracticeQuestion {
  id: string;
  topicId: string;
  formulaIds?: string[];
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  calculatorRequired: boolean;
  hints?: string[];
  solution?: {
    steps: string[];
    workingOut: string;
  };
}

export interface Flashcard {
  id: string;
  topicId: string;
  formulaId?: string;
  front: string;
  back: string;
  type: 'formula' | 'concept' | 'definition' | 'calculation';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  topics: string[];
  estimatedHours: number;
  prerequisites?: string[];
}

export type ChapterNumber = 2 | 3 | 4 | 5 | 6;

export interface Chapter {
  number: ChapterNumber;
  title: string;
  topics: string[];
  formulas: string[];
  keyConceptsAndSkills: string[];
}
