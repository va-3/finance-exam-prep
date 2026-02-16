import { useMemo } from 'react';
import { useProgressStore } from '../../store/progressStore';
import { Topic } from '../../types/content';
import TopicCard from './TopicCard';

interface LearningDashboardProps {
  topics: Topic[];
}

export default function LearningDashboard({ topics }: LearningDashboardProps) {
  const { completedTopics, isTopicUnlocked } = useProgressStore();

  // Sort topics by dependency order (topological sort)
  const sortedTopics = useMemo(() => {
    const sorted: Topic[] = [];
    const visited = new Set<string>();

    const visit = (topic: Topic) => {
      if (visited.has(topic.id)) return;
      visited.add(topic.id);

      // Visit prerequisites first
      topic.prerequisites.forEach((prereqId) => {
        const prereq = topics.find((t) => t.id === prereqId);
        if (prereq) visit(prereq);
      });

      sorted.push(topic);
    };

    topics.forEach((topic) => visit(topic));
    return sorted;
  }, [topics]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const total = topics.length;
    const completed = Object.values(completedTopics).filter(
      (progress) => progress.learnCompleted
    ).length;
    return Math.round((completed / total) * 100);
  }, [topics, completedTopics]);

  // Group topics by difficulty
  const groupedTopics = useMemo(() => {
    return {
      beginner: sortedTopics.filter((t) => t.difficulty === 'beginner'),
      intermediate: sortedTopics.filter((t) => t.difficulty === 'intermediate'),
      advanced: sortedTopics.filter((t) => t.difficulty === 'advanced'),
    };
  }, [sortedTopics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Learning Path
          </h1>
          <p className="text-slate-400 text-lg">
            Master finance concepts through progressive learning
          </p>

          {/* Overall Progress */}
          <div className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300 font-medium">Overall Progress</span>
              <span className="text-2xl font-bold text-blue-400">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Beginner Topics */}
        {groupedTopics.beginner.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Foundation Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedTopics.beginner.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  progress={completedTopics[topic.id]}
                  isUnlocked={isTopicUnlocked(topic.id, topic.prerequisites)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Intermediate Topics */}
        {groupedTopics.intermediate.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Intermediate Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedTopics.intermediate.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  progress={completedTopics[topic.id]}
                  isUnlocked={isTopicUnlocked(topic.id, topic.prerequisites)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Advanced Topics */}
        {groupedTopics.advanced.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full" />
              Advanced Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedTopics.advanced.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  progress={completedTopics[topic.id]}
                  isUnlocked={isTopicUnlocked(topic.id, topic.prerequisites)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
