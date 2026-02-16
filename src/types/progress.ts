export interface TopicProgress {
  topicId: string;
  learnCompleted: boolean;
  practiceScore: number; // 0-100
  masterScore: number; // 0-100
  attempts: number;
  lastAttempt?: Date;
}

export interface ProgressState {
  completedTopics: Record<string, TopicProgress>;
  unlockOverride: string[];
  flashcardProgress: Record<string, FlashcardProgress>;
  examHistory: ExamAttempt[];
  currentStreak: number;
  totalTimeSpent: number; // minutes
}

export interface FlashcardProgress {
  cardId: string;
  correctCount: number;
  wrongCount: number;
  lastSeen: Date;
  mastery: number; // 0-100
}

export interface ExamAttempt {
  id: string;
  date: Date;
  score: number;
  timeSpent: number; // seconds
  questionsCorrect: number;
  questionsTotal: number;
  weakAreas: string[];
}

export interface ReadinessMetrics {
  overallScore: number; // 0-100
  practiceAverage: number;
  masterAverage: number;
  flashcardMastery: number;
  weakAreas: Array<{
    topicId: string;
    topicName: string;
    score: number;
  }>;
  studyPlan: StudyPlanDay[];
}

export interface StudyPlanDay {
  day: number;
  date: Date;
  topics: Array<{
    topicId: string;
    topicName: string;
    timeAllocation: number; // minutes
    priority: 'high' | 'medium' | 'low';
  }>;
  totalMinutes: number;
}
