import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TopicProgress {
  learnCompleted: boolean;
  practiceScore: number; // 0-100
  masterScore: number; // 0-100
  attempts: number;
  lastAttemptDate?: string;
}

interface ProgressState {
  completedTopics: Record<string, TopicProgress>;
  unlockOverride: string[]; // Topics user chose to skip ahead

  // Actions
  markLearnComplete: (topicId: string) => void;
  updatePracticeScore: (topicId: string, score: number) => void;
  updateMasterScore: (topicId: string, score: number) => void;
  addUnlockOverride: (topicId: string) => void;
  removeUnlockOverride: (topicId: string) => void;
  resetProgress: () => void;
  isTopicUnlocked: (topicId: string, prerequisites: string[]) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      unlockOverride: [],

      markLearnComplete: (topicId: string) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: {
              ...(state.completedTopics[topicId] || {
                practiceScore: 0,
                masterScore: 0,
                attempts: 0,
              }),
              learnCompleted: true,
              lastAttemptDate: new Date().toISOString(),
            },
          },
        })),

      updatePracticeScore: (topicId: string, score: number) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: {
              ...(state.completedTopics[topicId] || {
                learnCompleted: false,
                masterScore: 0,
                attempts: 0,
              }),
              practiceScore: score,
              attempts: (state.completedTopics[topicId]?.attempts || 0) + 1,
              lastAttemptDate: new Date().toISOString(),
            },
          },
        })),

      updateMasterScore: (topicId: string, score: number) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: {
              ...(state.completedTopics[topicId] || {
                learnCompleted: false,
                practiceScore: 0,
                attempts: 0,
              }),
              masterScore: score,
              attempts: (state.completedTopics[topicId]?.attempts || 0) + 1,
              lastAttemptDate: new Date().toISOString(),
            },
          },
        })),

      addUnlockOverride: (topicId: string) =>
        set((state) => ({
          unlockOverride: [...state.unlockOverride, topicId],
        })),

      removeUnlockOverride: (topicId: string) =>
        set((state) => ({
          unlockOverride: state.unlockOverride.filter((id) => id !== topicId),
        })),

      resetProgress: () =>
        set({
          completedTopics: {},
          unlockOverride: [],
        }),

      isTopicUnlocked: (topicId: string, prerequisites: string[]) => {
        const state = get();

        // Check if manually unlocked
        if (state.unlockOverride.includes(topicId)) {
          return true;
        }

        // Check if all prerequisites are completed (learn mode done)
        if (prerequisites.length === 0) {
          return true;
        }

        return prerequisites.every(
          (prereqId) => state.completedTopics[prereqId]?.learnCompleted === true
        );
      },
    }),
    {
      name: 'finance-exam-progress',
    }
  )
);
