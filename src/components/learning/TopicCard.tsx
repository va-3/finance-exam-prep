import { Lock, CheckCircle, Play, Trophy } from 'lucide-react';
import type { Topic, TopicProgress } from '../../types/content';
import { useProgressStore } from '../../store/progressStore';
import { useState } from 'react';

interface TopicCardProps {
  topic: Topic;
  progress?: TopicProgress;
  isUnlocked: boolean;
}

export default function TopicCard({ topic, progress, isUnlocked }: TopicCardProps) {
  const { addUnlockOverride } = useProgressStore();
  const [showUnlockConfirm, setShowUnlockConfirm] = useState(false);

  const handleUnlock = () => {
    addUnlockOverride(topic.id);
    setShowUnlockConfirm(false);
  };

  const getStatusColor = () => {
    if (!isUnlocked) return 'border-slate-700 bg-slate-800/30';
    if (progress?.masterScore && progress.masterScore >= 70) return 'border-green-500/50 bg-green-900/20';
    if (progress?.practiceScore && progress.practiceScore >= 70) return 'border-blue-500/50 bg-blue-900/20';
    if (progress?.learnCompleted) return 'border-yellow-500/50 bg-yellow-900/20';
    return 'border-slate-600 bg-slate-800/50';
  };

  const getChapterColor = (chapter: number) => {
    const colors = {
      2: 'bg-blue-500',
      3: 'bg-green-500',
      4: 'bg-purple-500',
      5: 'bg-orange-500',
      6: 'bg-pink-500',
    };
    return colors[chapter as keyof typeof colors] || 'bg-slate-500';
  };

  return (
    <div
      className={`relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${getStatusColor()} ${
        isUnlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-xl backdrop-blur-sm z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-300 text-sm mb-3">Complete prerequisites first</p>
            <button
              onClick={() => setShowUnlockConfirm(true)}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              Skip Ahead
            </button>
          </div>
        </div>
      )}

      {/* Unlock Confirmation */}
      {showUnlockConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/95 rounded-xl z-20 p-4">
          <div className="text-center">
            <p className="text-slate-200 text-sm mb-4">
              Are you sure? It's better to follow the learning path.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleUnlock}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Unlock Anyway
              </button>
              <button
                onClick={() => setShowUnlockConfirm(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Badge */}
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 ${getChapterColor(topic.chapter)}`}>
        Chapter {topic.chapter}
      </div>

      {/* Topic Name */}
      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
        {topic.name}
      </h3>

      {/* Progress Indicators */}
      <div className="space-y-2 mb-4">
        {/* Learn Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {progress?.learnCompleted ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Play className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-slate-300">Learn</span>
          </div>
          {progress?.learnCompleted && (
            <span className="text-green-400 text-xs font-medium">✓ Done</span>
          )}
        </div>

        {/* Practice Score */}
        {progress?.practiceScore !== undefined && progress.practiceScore > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Practice</span>
            <span className={`text-xs font-medium ${progress.practiceScore >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
              {progress.practiceScore}%
            </span>
          </div>
        )}

        {/* Master Score */}
        {progress?.masterScore !== undefined && progress.masterScore > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Master</span>
            </div>
            <span className={`text-xs font-medium ${progress.masterScore >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
              {progress.masterScore}%
            </span>
          </div>
        )}
      </div>

      {/* Attempts */}
      {progress?.attempts !== undefined && progress.attempts > 0 && (
        <div className="text-xs text-slate-500">
          {progress.attempts} attempt{progress.attempts > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
