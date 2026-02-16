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
        <h1 className="text-3xl font-bold text-gray-900">Flashcard Study</h1>
        <p className="text-gray-600 mt-1">Master concepts with spaced repetition</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.dueToday}</span>
          </div>
          <p className="text-blue-100 font-medium">Due Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.mastered}</span>
          </div>
          <p className="text-green-100 font-medium">Mastered</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.learning}</span>
          </div>
          <p className="text-yellow-100 font-medium">Learning</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Brain className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.new}</span>
          </div>
          <p className="text-purple-100 font-medium">New Cards</p>
        </motion.div>
      </div>

      {/* Study Options */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Start Study Session</h2>

          {/* Study Mode */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Study Mode</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setStudyMode('due')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'due'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold text-gray-900">Due Today</p>
                <p className="text-sm text-gray-600">{stats.dueToday} cards</p>
              </button>

              <button
                onClick={() => setStudyMode('new')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'new'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Brain className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="font-semibold text-gray-900">New Cards</p>
                <p className="text-sm text-gray-600">{stats.new} cards</p>
              </button>

              <button
                onClick={() => setStudyMode('all')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyMode === 'all'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="font-semibold text-gray-900">All Cards</p>
                <p className="text-sm text-gray-600">{flashcards.length} cards</p>
              </button>
            </div>
          </div>

          {/* Topic Filter */}
          <div className="space-y-3 mt-6">
            <label className="block text-sm font-semibold text-gray-700">
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
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
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
              <p className="text-sm text-gray-600">
                Ready to study: <span className="font-bold text-gray-900">{studyFlashcards.length}</span> cards
              </p>
              {studyFlashcards.length === 0 && (
                <p className="text-sm text-yellow-600 mt-1">No cards available for this selection</p>
              )}
            </div>
            <button
              onClick={handleStartStudy}
              disabled={studyFlashcards.length === 0}
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              Start Studying
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Mastery Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {stats.mastered}/{stats.total} ({stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-400">{stats.new}</p>
              <p className="text-xs text-gray-600 mt-1">New</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.learning}</p>
              <p className="text-xs text-gray-600 mt-1">Learning</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.review}</p>
              <p className="text-xs text-gray-600 mt-1">Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.mastered}</p>
              <p className="text-xs text-gray-600 mt-1">Mastered</p>
            </div>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                  resetProgress();
                }
              }}
              className="text-sm text-red-600 hover:text-red-700 font-semibold"
            >
              Reset All Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
