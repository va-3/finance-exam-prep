import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PracticeQuestion } from '../types';

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string | null;
  timeSpent: number; // seconds
  flagged: boolean;
}

export interface ExamAttempt {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // seconds
  questions: PracticeQuestion[];
  answers: Record<string, ExamAnswer>;
  score?: number;
  percentage?: number;
  status: 'in-progress' | 'completed' | 'abandoned';
  timeLimit: number; // seconds (default 3600 for 60 minutes)
}

interface ExamStore {
  attempts: ExamAttempt[];
  currentAttempt: ExamAttempt | null;

  // Actions
  startExam: (questions: PracticeQuestion[], timeLimit?: number) => void;
  submitExam: () => void;
  abandonExam: () => void;
  answerQuestion: (questionId: string, optionId: string | null) => void;
  flagQuestion: (questionId: string) => void;
  unflagQuestion: (questionId: string) => void;
  updateTimeSpent: (questionId: string, seconds: number) => void;
  getAttemptById: (attemptId: string) => ExamAttempt | undefined;
  getStatistics: () => {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
    averageTime: number;
    completionRate: number;
  };
  clearHistory: () => void;
}

const calculateScore = (
  questions: PracticeQuestion[],
  answers: Record<string, ExamAnswer>
): { score: number; percentage: number } => {
  let correct = 0;
  const total = questions.length;

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer?.selectedOptionId) {
      const selectedOption = question.options.find((opt) => opt.id === answer.selectedOptionId);
      if (selectedOption?.isCorrect) {
        correct++;
      }
    }
  });

  return {
    score: correct,
    percentage: total > 0 ? (correct / total) * 100 : 0,
  };
};

export const useExamStore = create<ExamStore>()(
  persist(
    (set, get) => ({
      attempts: [],
      currentAttempt: null,

      startExam: (questions, timeLimit = 3600) => {
        const attempt: ExamAttempt = {
          id: `exam-${Date.now()}`,
          startTime: new Date(),
          duration: 0,
          questions,
          answers: {},
          status: 'in-progress',
          timeLimit,
        };
        set({ currentAttempt: attempt });
      },

      submitExam: () => {
        const { currentAttempt, attempts } = get();
        if (!currentAttempt) return;

        const endTime = new Date();
        const duration = Math.floor(
          (endTime.getTime() - new Date(currentAttempt.startTime).getTime()) / 1000
        );

        const { score, percentage } = calculateScore(
          currentAttempt.questions,
          currentAttempt.answers
        );

        const completedAttempt: ExamAttempt = {
          ...currentAttempt,
          endTime,
          duration,
          score,
          percentage,
          status: 'completed',
        };

        set({
          attempts: [...attempts, completedAttempt],
          currentAttempt: null,
        });
      },

      abandonExam: () => {
        const { currentAttempt, attempts } = get();
        if (!currentAttempt) return;

        const endTime = new Date();
        const duration = Math.floor(
          (endTime.getTime() - new Date(currentAttempt.startTime).getTime()) / 1000
        );

        const abandonedAttempt: ExamAttempt = {
          ...currentAttempt,
          endTime,
          duration,
          status: 'abandoned',
        };

        set({
          attempts: [...attempts, abandonedAttempt],
          currentAttempt: null,
        });
      },

      answerQuestion: (questionId, optionId) => {
        const { currentAttempt } = get();
        if (!currentAttempt) return;

        const existingAnswer = currentAttempt.answers[questionId];
        const newAnswer: ExamAnswer = {
          questionId,
          selectedOptionId: optionId,
          timeSpent: existingAnswer?.timeSpent ?? 0,
          flagged: existingAnswer?.flagged ?? false,
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionId]: newAnswer,
            },
          },
        });
      },

      flagQuestion: (questionId) => {
        const { currentAttempt } = get();
        if (!currentAttempt) return;

        const existingAnswer = currentAttempt.answers[questionId];
        const newAnswer: ExamAnswer = existingAnswer ?? {
          questionId,
          selectedOptionId: null,
          timeSpent: 0,
          flagged: true,
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionId]: { ...newAnswer, flagged: true },
            },
          },
        });
      },

      unflagQuestion: (questionId) => {
        const { currentAttempt } = get();
        if (!currentAttempt) return;

        const existingAnswer = currentAttempt.answers[questionId];
        if (!existingAnswer) return;

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionId]: { ...existingAnswer, flagged: false },
            },
          },
        });
      },

      updateTimeSpent: (questionId, seconds) => {
        const { currentAttempt } = get();
        if (!currentAttempt) return;

        const existingAnswer = currentAttempt.answers[questionId];
        const newAnswer: ExamAnswer = existingAnswer ?? {
          questionId,
          selectedOptionId: null,
          timeSpent: seconds,
          flagged: false,
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionId]: { ...newAnswer, timeSpent: seconds },
            },
          },
        });
      },

      getAttemptById: (attemptId) => {
        const { attempts } = get();
        return attempts.find((attempt) => attempt.id === attemptId);
      },

      getStatistics: () => {
        const { attempts } = get();
        const completedAttempts = attempts.filter((a) => a.status === 'completed');

        if (completedAttempts.length === 0) {
          return {
            totalAttempts: 0,
            averageScore: 0,
            bestScore: 0,
            averageTime: 0,
            completionRate: 0,
          };
        }

        const scores = completedAttempts.map((a) => a.percentage ?? 0);
        const times = completedAttempts.map((a) => a.duration);

        return {
          totalAttempts: attempts.length,
          averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
          bestScore: Math.max(...scores),
          averageTime: times.reduce((a, b) => a + b, 0) / times.length,
          completionRate: (completedAttempts.length / attempts.length) * 100,
        };
      },

      clearHistory: () => {
        set({ attempts: [] });
      },
    }),
    {
      name: 'exam-attempts',
    }
  )
);
