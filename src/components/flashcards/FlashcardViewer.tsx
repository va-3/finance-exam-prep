import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Brain } from 'lucide-react';
import type { Flashcard } from '../../types';
import { useFlashcardStore } from '../../store/flashcardStore';

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  onComplete?: () => void;
}

const difficultyButtons = [
  { quality: 0, label: 'Again', color: 'bg-red-600', icon: X },
  { quality: 3, label: 'Hard', color: 'bg-orange-500', icon: Brain },
  { quality: 4, label: 'Good', color: 'bg-blue-500', icon: Check },
  { quality: 5, label: 'Easy', color: 'bg-green-600', icon: Check },
] as const;

export function FlashcardViewer({ flashcards, onComplete }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  const { recordReview, getFlashcardProgress, startSession, endSession } = useFlashcardStore();

  const currentCard = flashcards[currentIndex];
  const progress = currentCard ? getFlashcardProgress(currentCard.id) : undefined;

  useEffect(() => {
    const topicIds = [...new Set(flashcards.map((f) => f.topicId))];
    startSession(topicIds);
    return () => endSession();
  }, [flashcards, startSession, endSession]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (quality: 0 | 3 | 4 | 5) => {
    if (!currentCard) return;

    recordReview(currentCard.id, quality);

    setSessionStats((prev) => ({
      correct: prev.correct + (quality >= 3 ? 1 : 0),
      total: prev.total + 1,
    }));

    if (currentIndex < flashcards.length - 1) {
      setDirection('right');
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection('right');
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ correct: 0, total: 0 });
  };

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No flashcards available</p>
      </div>
    );
  }

  const masteryColors = {
    new: 'border-gray-300 bg-gray-50',
    learning: 'border-yellow-300 bg-yellow-50',
    review: 'border-blue-300 bg-blue-50',
    mastered: 'border-green-300 bg-green-50',
  };

  const masteryLabels = {
    new: 'New',
    learning: 'Learning',
    review: 'Review',
    mastered: 'Mastered',
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Flashcard Review</h2>
          <p className="text-sm text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {progress && (
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                progress.masteryLevel === 'new' ? 'bg-gray-200 text-gray-800' :
                progress.masteryLevel === 'learning' ? 'bg-yellow-200 text-yellow-800' :
                progress.masteryLevel === 'review' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
              }`}>
                {masteryLabels[progress.masteryLevel]}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Streak: {progress.correctStreak} | Accuracy: {
                  progress.totalReviews > 0
                    ? Math.round((progress.correctReviews / progress.totalReviews) * 100)
                    : 0
                }%
              </p>
            </div>
          )}

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Reset to first card"
          >
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Session Stats */}
      {sessionStats.total > 0 && (
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-gray-600">Session Progress</p>
            <p className="text-2xl font-bold text-gray-900">
              {sessionStats.correct}/{sessionStats.total}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Accuracy</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((sessionStats.correct / sessionStats.total) * 100)}%
            </p>
          </div>
        </div>
      )}

      {/* Flashcard */}
      <div className="relative h-96 perspective-1000">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${currentCard.id}-${isFlipped}`}
            initial={{
              rotateY: direction === 'right' ? 90 : -90,
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              rotateY: direction === 'right' ? -90 : 90,
              opacity: 0,
              scale: 0.9
            }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full rounded-xl border-4 ${masteryColors[progress?.masteryLevel ?? 'new']} shadow-xl cursor-pointer`}
            onClick={handleFlip}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentCard.type === 'formula' ? 'bg-purple-100 text-purple-800' :
                  currentCard.type === 'concept' ? 'bg-blue-100 text-blue-800' :
                  currentCard.type === 'definition' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {currentCard.type}
                </span>
              </div>

              {!isFlipped ? (
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900">{currentCard.front}</h3>
                  <p className="text-sm text-gray-500">Click to reveal answer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xl text-gray-800 whitespace-pre-wrap">
                    {currentCard.back}
                  </div>
                  {currentCard.formulaId && (
                    <p className="text-xs text-gray-500">Formula ID: {currentCard.formulaId}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Difficulty Buttons (only show when flipped) */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {difficultyButtons.map(({ quality, label, color, icon: Icon }) => (
            <button
              key={quality}
              onClick={() => handleAnswer(quality)}
              className={`${color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Instructions */}
      {!isFlipped && (
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Click the card to flip and reveal the answer</p>
          <p className="text-xs">Use keyboard: Space to flip, ← → to navigate</p>
        </div>
      )}
    </div>
  );
}
