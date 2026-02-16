import { motion } from 'framer-motion';
import { Lock, CheckCircle, Circle, Trophy } from 'lucide-react';
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

  // Determine completion state
  const isMastered = progress?.masterScore && progress.masterScore >= 70;
  const isPracticed = progress?.practiceScore && progress.practiceScore >= 70;
  const isLearned = progress?.learnCompleted;

  const getChapterColor = (chapter: number) => {
    const colors = {
      2: 'bg-accent-blue',
      3: 'bg-accent-green',
      4: 'bg-accent-purple',
      5: 'bg-notion-orange',
      6: 'bg-accent-purple-light',
    };
    return colors[chapter as keyof typeof colors] || 'bg-notion-gray';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative card transition-all ${
        isUnlocked
          ? 'card-hover cursor-pointer'
          : 'opacity-50 cursor-not-allowed border-border-subtle'
      }`}
    >
      {/* Lock Overlay - Notion-inspired */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm rounded-card z-10">
          <div className="text-center p-4">
            <Lock className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-tertiary text-sm mb-3">Complete prerequisites first</p>
            <button
              onClick={() => setShowUnlockConfirm(true)}
              className="text-xs text-accent-blue hover:text-accent-blue-light underline"
            >
              Skip ahead anyway
            </button>
          </div>
        </div>
      )}

      {/* Unlock Confirmation - Clean modal */}
      {showUnlockConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-bg-primary/95 backdrop-blur-md rounded-card z-20 p-4"
        >
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-4">
              Skip prerequisites? Following the learning path is recommended.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleUnlock}
                className="btn-secondary text-sm"
              >
                Unlock
              </button>
              <button
                onClick={() => setShowUnlockConfirm(false)}
                className="btn-primary text-sm"
              >
                Follow Path
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chapter Badge - Soft pill */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white mb-3 ${getChapterColor(topic.chapter)}`}>
        <span className="w-1.5 h-1.5 bg-white rounded-full opacity-70" />
        Chapter {topic.chapter}
      </div>

      {/* Topic Name - Clean typography */}
      <h3 className="text-heading-4 text-text-primary mb-4 line-clamp-2">
        {topic.name}
      </h3>

      {/* Progress Pills - Notion-inspired */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Learn Pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isLearned
              ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
              : 'bg-bg-tertiary text-text-muted border border-border-subtle'
          }`}
        >
          {isLearned ? (
            <CheckCircle className="w-3.5 h-3.5" />
          ) : (
            <Circle className="w-3.5 h-3.5" />
          )}
          <span>Learn</span>
        </div>

        {/* Practice Pill */}
        {progress?.practiceScore !== undefined && progress.practiceScore > 0 && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isPracticed
                ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20'
            }`}
          >
            {isPracticed && <CheckCircle className="w-3.5 h-3.5" />}
            <span>Practice {progress.practiceScore}%</span>
          </div>
        )}

        {/* Master Pill */}
        {progress?.masterScore !== undefined && progress.masterScore > 0 && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isMastered
                ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
                : 'bg-notion-gray/10 text-notion-gray border border-notion-gray/20'
            }`}
          >
            {isMastered && <Trophy className="w-3.5 h-3.5" />}
            <span>Master {progress.masterScore}%</span>
          </div>
        )}
      </div>

      {/* Footer Info - Subtle */}
      {progress?.attempts !== undefined && progress.attempts > 0 && (
        <div className="text-xs text-text-muted pt-3 border-t border-border-subtle">
          {progress.attempts} attempt{progress.attempts > 1 ? 's' : ''}
        </div>
      )}
    </motion.div>
  );
}
