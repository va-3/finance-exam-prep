import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Flashcard } from '../types';

export interface FlashcardProgress {
  flashcardId: string;
  lastReviewed: Date;
  nextReview: Date;
  easeFactor: number; // SM-2 algorithm: 1.3 - 2.5
  interval: number; // days
  repetitions: number;
  masteryLevel: 'new' | 'learning' | 'review' | 'mastered';
  correctStreak: number;
  totalReviews: number;
  correctReviews: number;
}

export interface FlashcardSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  flashcardsReviewed: number;
  correctCount: number;
  topicIds: string[];
}

interface FlashcardStore {
  progress: Record<string, FlashcardProgress>;
  sessions: FlashcardSession[];
  currentSession: FlashcardSession | null;

  // Actions
  startSession: (topicIds: string[]) => void;
  endSession: () => void;
  recordReview: (flashcardId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  getFlashcardProgress: (flashcardId: string) => FlashcardProgress | undefined;
  getDueFlashcards: (flashcards: Flashcard[]) => Flashcard[];
  resetProgress: (flashcardId?: string) => void;
  getStatistics: () => {
    total: number;
    new: number;
    learning: number;
    review: number;
    mastered: number;
    dueToday: number;
  };
}

const calculateNextReview = (
  interval: number,
  easeFactor: number,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): { newInterval: number; newEaseFactor: number; newRepetitions: number } => {
  // SM-2 Algorithm (Spaced Repetition)
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = 0;

  if (quality >= 3) {
    // Correct response
    if (interval === 0) {
      newInterval = 1;
    } else if (interval === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = 1;
  } else {
    // Incorrect response - reset
    newInterval = 0;
    newRepetitions = 0;
  }

  // Update ease factor
  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEaseFactor = Math.max(1.3, Math.min(2.5, newEaseFactor));

  return { newInterval, newEaseFactor, newRepetitions };
};

const getMasteryLevel = (
  repetitions: number,
  correctStreak: number,
  accuracy: number
): FlashcardProgress['masteryLevel'] => {
  if (repetitions === 0) return 'new';
  if (accuracy >= 0.9 && correctStreak >= 5 && repetitions >= 5) return 'mastered';
  if (repetitions >= 3 && correctStreak >= 2) return 'review';
  return 'learning';
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      progress: {},
      sessions: [],
      currentSession: null,

      startSession: (topicIds) => {
        const session: FlashcardSession = {
          id: `session-${Date.now()}`,
          startTime: new Date(),
          flashcardsReviewed: 0,
          correctCount: 0,
          topicIds,
        };
        set({ currentSession: session });
      },

      endSession: () => {
        const { currentSession, sessions } = get();
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: new Date(),
          };
          set({
            sessions: [...sessions, completedSession],
            currentSession: null,
          });
        }
      },

      recordReview: (flashcardId, quality) => {
        const { progress, currentSession } = get();
        const existing = progress[flashcardId];

        const currentEaseFactor = existing?.easeFactor ?? 2.5;
        const currentInterval = existing?.interval ?? 0;
        const currentRepetitions = existing?.repetitions ?? 0;
        const currentCorrectStreak = existing?.correctStreak ?? 0;
        const currentTotalReviews = existing?.totalReviews ?? 0;
        const currentCorrectReviews = existing?.correctReviews ?? 0;

        const { newInterval, newEaseFactor, newRepetitions } = calculateNextReview(
          currentInterval,
          currentEaseFactor,
          quality
        );

        const isCorrect = quality >= 3;
        const newCorrectStreak = isCorrect ? currentCorrectStreak + 1 : 0;
        const newTotalReviews = currentTotalReviews + 1;
        const newCorrectReviews = currentCorrectReviews + (isCorrect ? 1 : 0);
        const accuracy = newCorrectReviews / newTotalReviews;

        const now = new Date();
        const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

        const newProgress: FlashcardProgress = {
          flashcardId,
          lastReviewed: now,
          nextReview,
          easeFactor: newEaseFactor,
          interval: newInterval,
          repetitions: currentRepetitions + newRepetitions,
          masteryLevel: getMasteryLevel(
            currentRepetitions + newRepetitions,
            newCorrectStreak,
            accuracy
          ),
          correctStreak: newCorrectStreak,
          totalReviews: newTotalReviews,
          correctReviews: newCorrectReviews,
        };

        // Update session stats
        if (currentSession) {
          set({
            currentSession: {
              ...currentSession,
              flashcardsReviewed: currentSession.flashcardsReviewed + 1,
              correctCount: currentSession.correctCount + (isCorrect ? 1 : 0),
            },
          });
        }

        set({
          progress: {
            ...progress,
            [flashcardId]: newProgress,
          },
        });
      },

      getFlashcardProgress: (flashcardId) => {
        return get().progress[flashcardId];
      },

      getDueFlashcards: (flashcards) => {
        const { progress } = get();
        const now = new Date();

        return flashcards.filter((card) => {
          const prog = progress[card.id];
          if (!prog) return true; // New cards are always due
          return new Date(prog.nextReview) <= now;
        });
      },

      resetProgress: (flashcardId) => {
        if (flashcardId) {
          const { progress } = get();
          const { [flashcardId]: _, ...rest } = progress;
          set({ progress: rest });
        } else {
          set({ progress: {}, sessions: [] });
        }
      },

      getStatistics: () => {
        const { progress } = get();
        const progressArray = Object.values(progress);
        const now = new Date();

        return {
          total: progressArray.length,
          new: progressArray.filter((p) => p.masteryLevel === 'new').length,
          learning: progressArray.filter((p) => p.masteryLevel === 'learning').length,
          review: progressArray.filter((p) => p.masteryLevel === 'review').length,
          mastered: progressArray.filter((p) => p.masteryLevel === 'mastered').length,
          dueToday: progressArray.filter((p) => new Date(p.nextReview) <= now).length,
        };
      },
    }),
    {
      name: 'flashcard-progress',
    }
  )
);
