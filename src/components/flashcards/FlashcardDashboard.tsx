import { useState } from 'react';
import { Brain, TrendingUp, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Flashcard } from '../../types';
import { useFlashcardStore } from '../../store/flashcardStore';
import { FlashcardViewer } from './FlashcardViewer';

interface FlashcardDashboardProps {
  flashcards: Flashcard[];
}

export function FlashcardDashboard({ flashcards }: FlashcardDashboardProps) {
  const [isStudying, setIsStudying] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [studyMode, setStudyMode] = useState<'due' | 'all' | 'new'>('due');

  const { getDueFlashcards, getStatistics, resetProgress } = useFlashcardStore();
  const stats = getStatistics();

  const handleStartStudy = () => {
    setIsStudying(true);
  };

  const handleCompleteStudy = () => {
    setIsStudying(false);
    setSelectedTopics([]);
  };

  const getFlashcardsForStudy = (): Flashcard[] => {
    let filtered = flashcards;

    // Filter by topics if selected
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((f) => selectedTopics.includes(f.topicId));
    }

    // Filter by study mode
    if (studyMode === 'due') {
      filtered = getDueFlashcards(filtered);
    } else if (studyMode === 'new') {
      filtered = filtered.filter((f) => {
        const progress = useFlashcardStore.getState().getFlashcardProgress(f.id);
        return !progress;
      });
    }

    return filtered;
  };

  const studyFlashcards = getFlashcardsForStudy();
  const allTopics = [...new Set(flashcards.map((f) => f.topicId))];

  if (isStudying) {
    return <FlashcardViewer flashcards={studyFlashcards} onComplete={handleCompleteStudy} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-heading-2 text-text-primary">Flashcard Study</h1>
        <p className="text-text-secondary mt-1">Master concepts with spaced repetition</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card card-hover glow-on-hover bg-accent-blue/10 border-accent-blue/20"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-accent-blue" />
            <span className="text-3xl font-bold text-accent-blue">{stats.dueToday}</span>
          </div>
          <p className="text-text-secondary font-medium">Due Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card card-hover glow-on-hover bg-accent-green/10 border-accent-green/20"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-accent-green" />
            <span className="text-3xl font-bold text-accent-green">{stats.mastered}</span>
          </div>
          <p className="text-text-secondary font-medium">Mastered</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card card-hover glow-on-hover bg-accent-yellow/10 border-accent-yellow/20"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-accent-yellow" />
            <span className="text-3xl font-bold text-accent-yellow">{stats.learning}</span>
          </div>
          <p className="text-text-secondary font-medium">Learning</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card card-hover glow-on-hover bg-accent-purple/10 border-accent-purple/20"
        >
          <div className="flex items-center justify-between mb-2">
            <Brain className="w-8 h-8 text-accent-purple" />
            <span className="text-3xl font-bold text-accent-purple">{stats.new}</span>
          </div>
          <p className="text-text-secondary font-medium">New Cards</p>
        </motion.div>
      </div>

      {/* Study Options */}
      <div className="card space-y-6">
        <div>
          <h2 className="text-heading-4 text-text-primary mb-4">Start Study Session</h2>

          {/* Study Mode */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-text-secondary">Study Mode</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setStudyMode('due')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'due'
                    ? 'border-accent-blue bg-accent-blue/10'
                    : 'border-border-subtle hover:border-accent-blue/50'
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 text-accent-blue" />
                <p className="font-semibold text-text-primary">Due Today</p>
                <p className="text-sm text-text-muted">{stats.dueToday} cards</p>
              </button>

              <button
                onClick={() => setStudyMode('new')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'new'
                    ? 'border-accent-purple bg-accent-purple/10'
                    : 'border-border-subtle hover:border-accent-purple/50'
                }`}
              >
                <Brain className="w-6 h-6 mx-auto mb-2 text-accent-purple" />
                <p className="font-semibold text-text-primary">New Cards</p>
                <p className="text-sm text-text-muted">{stats.new} cards</p>
              </button>

              <button
                onClick={() => setStudyMode('all')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'all'
                    ? 'border-accent-green bg-accent-green/10'
                    : 'border-border-subtle hover:border-accent-green/50'
                }`}
              >
                <Award className="w-6 h-6 mx-auto mb-2 text-accent-green" />
                <p className="font-semibold text-text-primary">All Cards</p>
                <p className="text-sm text-text-muted">{flashcards.length} cards</p>
              </button>
            </div>
          </div>

          {/* Topic Filter */}
          <div className="space-y-3 mt-6">
            <label className="block text-sm font-semibold text-text-secondary">
              Filter by Topics (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topicId) => {
                const isSelected = selectedTopics.includes(topicId);
                return (
                  <button
                    key={topicId}
                    onClick={() => {
                      setSelectedTopics((prev) =>
                        isSelected
                          ? prev.filter((t) => t !== topicId)
                          : [...prev, topicId]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                        : 'border-border-subtle hover:border-accent-blue/50 text-text-secondary'
                    }`}
                  >
                    {topicId}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                Ready to study: <span className="font-bold text-text-primary">{studyFlashcards.length}</span> cards
              </p>
              {studyFlashcards.length === 0 && (
                <p className="text-sm text-accent-yellow mt-1">No cards available for this selection</p>
              )}
            </div>
            <button
              onClick={handleStartStudy}
              disabled={studyFlashcards.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Studying
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-heading-4 text-text-primary mb-4">Progress Overview</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Mastery Progress</span>
              <span className="text-sm font-semibold text-text-primary">
                {stats.mastered}/{stats.total} ({stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-bg-tertiary rounded-full h-3">
              <div
                className="bg-gradient-to-r from-accent-green to-accent-green-light h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border-subtle">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-muted">{stats.new}</p>
              <p className="text-xs text-text-tertiary mt-1">New</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-yellow">{stats.learning}</p>
              <p className="text-xs text-text-tertiary mt-1">Learning</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-blue">{stats.review}</p>
              <p className="text-xs text-text-tertiary mt-1">Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-green">{stats.mastered}</p>
              <p className="text-xs text-text-tertiary mt-1">Mastered</p>
            </div>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="mt-6 pt-6 border-t border-border-subtle">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                  resetProgress();
                }
              }}
              className="text-sm text-accent-red hover:text-accent-red-light font-semibold"
            >
              Reset All Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
