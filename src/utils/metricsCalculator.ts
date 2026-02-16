import type { ReadinessMetrics, StudyPlanDay } from '../types/progress';
import { topics } from '../data/topics';
import { useProgressStore } from '../store/progressStore';
import { useFlashcardStore } from '../store/flashcardStore';

/**
 * Calculate comprehensive readiness metrics from actual user progress
 * Returns 0% for fresh install, increases as user completes content
 */
export function calculateReadinessMetrics(): ReadinessMetrics {
  const progressState = useProgressStore.getState();
  const flashcardState = useFlashcardStore.getState();

  const completedTopics = progressState.completedTopics;

  // Calculate practice average
  const practiceScores = Object.values(completedTopics)
    .map(t => t.practiceScore)
    .filter(score => score > 0);

  const practiceAverage = practiceScores.length > 0
    ? practiceScores.reduce((sum, score) => sum + score, 0) / practiceScores.length
    : 0;

  // Calculate master average
  const masterScores = Object.values(completedTopics)
    .map(t => t.masterScore)
    .filter(score => score > 0);

  const masterAverage = masterScores.length > 0
    ? masterScores.reduce((sum, score) => sum + score, 0) / masterScores.length
    : 0;

  // Calculate flashcard mastery
  const flashcardProgress = Object.values(flashcardState.progress || {});
  const flashcardMastery = flashcardProgress.length > 0
    ? flashcardProgress.reduce((sum, card) => {
        // Mastery based on ease factor (1.3-2.5) and mastery level
        const levelBonus = {
          'new': 0,
          'learning': 25,
          'review': 50,
          'mastered': 100
        }[card.masteryLevel];
        const accuracyScore = card.totalReviews > 0
          ? (card.correctReviews / card.totalReviews) * 100
          : 0;
        return sum + (levelBonus * 0.6 + accuracyScore * 0.4);
      }, 0) / flashcardProgress.length
    : 0;

  // Calculate overall score (weighted average)
  const topicsCompleted = Object.keys(completedTopics).length;
  const totalTopics = topics.length;
  const completionRate = (topicsCompleted / totalTopics) * 100;

  // Weighted: 40% completion, 30% practice, 20% master, 10% flashcards
  const overallScore =
    (completionRate * 0.4) +
    (practiceAverage * 0.3) +
    (masterAverage * 0.2) +
    (flashcardMastery * 0.1);

  // Find weak areas (topics with low scores)
  const weakAreas = Object.entries(completedTopics)
    .filter(([_, progress]) => progress.practiceScore > 0 && progress.practiceScore < 70)
    .map(([topicId, progress]) => {
      const topic = topics.find(t => t.id === topicId);
      return {
        topicId,
        topicName: topic?.name || topicId,
        score: progress.practiceScore,
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  // Generate study plan based on weak areas and incomplete topics
  const studyPlan = generateStudyPlan(completedTopics, weakAreas);

  return {
    overallScore: Math.round(overallScore),
    practiceAverage: Math.round(practiceAverage),
    masterAverage: Math.round(masterAverage),
    flashcardMastery: Math.round(flashcardMastery),
    weakAreas,
    studyPlan,
  };
}

/**
 * Generate 3-day study plan prioritizing weak areas and incomplete topics
 */
function generateStudyPlan(
  completedTopics: Record<string, any>,
  weakAreas: Array<{ topicId: string; topicName: string; score: number }>
): StudyPlanDay[] {
  const now = new Date();

  // Get incomplete topics (not in completedTopics or low scores)
  const incompleteTopics = topics.filter(topic => {
    const progress = completedTopics[topic.id];
    return !progress || !progress.learnCompleted || progress.practiceScore < 80;
  });

  // Prioritize: weak areas first, then incomplete topics
  const prioritizedTopics = [
    ...weakAreas
      .map(wa => {
        const topic = topics.find(t => t.id === wa.topicId);
        return topic ? { topic, priority: 'high' } : null;
      })
      .filter((item): item is { topic: any; priority: string } => item !== null),
    ...incompleteTopics
      .filter(t => !weakAreas.some(wa => wa.topicId === t.id))
      .slice(0, 6)
      .map(topic => ({
        topic,
        priority: (topic.difficulty === 'advanced' ? 'medium' : 'low'),
      })),
  ];

  // Distribute across 3 days
  const studyPlan: StudyPlanDay[] = [];
  const topicsPerDay = Math.ceil(prioritizedTopics.length / 3);

  for (let day = 1; day <= 3; day++) {
    const startIdx = (day - 1) * topicsPerDay;
    const endIdx = startIdx + topicsPerDay;
    const dayTopics = prioritizedTopics.slice(startIdx, endIdx);

    const planTopics = dayTopics.map(({ topic, priority }) => ({
      topicId: topic.id,
      topicName: topic.name,
      timeAllocation: topic.estimatedTime || 60,
      priority: priority as 'high' | 'medium' | 'low',
    }));

    const totalMinutes = planTopics.reduce((sum, t) => sum + t.timeAllocation, 0);

    studyPlan.push({
      day,
      date: new Date(now.getTime() + day * 24 * 60 * 60 * 1000),
      topics: planTopics,
      totalMinutes,
    });
  }

  return studyPlan;
}

/**
 * Get readiness status message based on score
 */
export function getReadinessStatus(score: number): string {
  if (score === 0) return 'Just Getting Started';
  if (score < 30) return 'Building Foundation';
  if (score < 50) return 'Making Progress';
  if (score < 70) return 'Getting There';
  if (score < 85) return 'Almost Ready';
  if (score < 95) return 'Exam Ready';
  return 'Fully Prepared';
}
