import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flag, CheckCircle, XCircle, AlertTriangle, Trophy } from 'lucide-react';
import type { PracticeQuestion } from '../../types';
import { useExamStore } from '../../store/examStore';

interface PracticeExamProps {
  questions: PracticeQuestion[];
  timeLimit?: number; // seconds (default 3600 = 60 minutes)
  onComplete?: () => void;
}

export function PracticeExam({ questions, timeLimit = 3600, onComplete }: PracticeExamProps) {
  const {
    currentAttempt,
    startExam,
    submitExam,
    abandonExam,
    answerQuestion,
    flagQuestion,
    unflagQuestion,
  } = useExamStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  useEffect(() => {
    if (!currentAttempt) {
      startExam(questions, timeLimit);
    }
  }, [currentAttempt, questions, timeLimit, startExam]);

  // Timer
  useEffect(() => {
    if (!currentAttempt || isReviewMode) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttempt, isReviewMode]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentAttempt?.answers[currentQuestion?.id];
  const isFlagged = currentAnswer?.flagged ?? false;

  const answeredCount = currentAttempt
    ? Object.values(currentAttempt.answers).filter((a) => a.selectedOptionId !== null).length
    : 0;
  const flaggedCount = currentAttempt
    ? Object.values(currentAttempt.answers).filter((a) => a.flagged).length
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionId: string) => {
    if (!currentQuestion || isReviewMode) return;
    answerQuestion(currentQuestion.id, optionId);
  };

  const handleFlag = () => {
    if (!currentQuestion) return;
    if (isFlagged) {
      unflagQuestion(currentQuestion.id);
    } else {
      flagQuestion(currentQuestion.id);
    }
  };

  const handleSubmit = useCallback(() => {
    submitExam();
    setIsReviewMode(true);
    setShowSubmitConfirm(false);
    onComplete?.();
  }, [submitExam, onComplete]);

  const handleAbandon = () => {
    abandonExam();
    onComplete?.();
  };

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  if (!currentAttempt || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Loading exam...</p>
      </div>
    );
  }

  // Review Mode - Show Results
  if (isReviewMode && currentAttempt.status === 'completed') {
    const score = currentAttempt.score ?? 0;
    const percentage = currentAttempt.percentage ?? 0;
    const passed = percentage >= 70;

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-8 text-center ${
            passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-orange-600'
          } text-white`}
        >
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2">
            {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
          </h2>
          <p className="text-xl mb-4">
            Your Score: {score}/{questions.length} ({percentage.toFixed(1)}%)
          </p>
          <p className="text-sm opacity-90">
            Time Taken: {formatTime(currentAttempt.duration)}
          </p>
        </motion.div>

        {/* Detailed Review */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Detailed Review</h3>

          {questions.map((question, index) => {
            const answer = currentAttempt.answers[question.id];
            const selectedOption = question.options.find((opt) => opt.id === answer?.selectedOptionId);
            const isCorrect = selectedOption?.isCorrect ?? false;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-lg border-2 p-6 ${
                  isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Question {index + 1}</p>
                      <p className="text-lg font-medium text-gray-900">{question.question}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </div>

                <div className="space-y-2 ml-9">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-lg border ${
                        option.id === answer?.selectedOptionId && option.isCorrect
                          ? 'border-green-500 bg-green-100'
                          : option.id === answer?.selectedOptionId && !option.isCorrect
                          ? 'border-red-500 bg-red-100'
                          : option.isCorrect
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option.text}</span>
                        {option.id === answer?.selectedOptionId && (
                          <span className="text-xs font-semibold text-gray-600">Your Answer</span>
                        )}
                        {option.isCorrect && (
                          <span className="text-xs font-semibold text-green-600">Correct Answer</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {question.explanation && (
                  <div className="mt-4 ml-9 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                )}

                {question.solution && (
                  <div className="mt-3 ml-9 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-semibold text-purple-900 mb-2">Solution Steps:</p>
                    <ol className="text-sm text-purple-800 list-decimal list-inside space-y-1">
                      {question.solution.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Exam Mode
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Timer */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Practice Exam</h2>
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-600">Answered</p>
            <p className="text-lg font-bold text-gray-900">{answeredCount}/{questions.length}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600">Flagged</p>
            <p className="text-lg font-bold text-yellow-600">{flaggedCount}</p>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="w-5 h-5" />
            <span className="text-xl font-mono font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                {currentQuestion.calculatorRequired && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    Calculator Required
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-medium text-gray-900">{currentQuestion.question}</h3>
            </div>

            <button
              onClick={handleFlag}
              className={`p-2 rounded-lg transition-colors ${
                isFlagged ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:text-yellow-600'
              }`}
              title={isFlagged ? 'Unflag question' : 'Flag for review'}
            >
              <Flag className="w-6 h-6" fill={isFlagged ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  currentAnswer?.selectedOptionId === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    currentAnswer?.selectedOptionId === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {currentAnswer?.selectedOptionId === option.id && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Hints */}
          {currentQuestion.hints && currentQuestion.hints.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Hints:
              </p>
              <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                {currentQuestion.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Question Navigation</h4>
        <div className="grid grid-cols-10 gap-2">
          {questions.map((q, idx) => {
            const ans = currentAttempt.answers[q.id];
            const isAnswered = ans?.selectedOptionId !== null;
            const isFlagged = ans?.flagged ?? false;

            return (
              <button
                key={q.id}
                onClick={() => navigateToQuestion(idx)}
                className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                  idx === currentQuestionIndex
                    ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                    : isAnswered && isFlagged
                    ? 'bg-yellow-500 text-white'
                    : isAnswered
                    ? 'bg-green-500 text-white'
                    : isFlagged
                    ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleAbandon}
          className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors"
        >
          Abandon Exam
        </button>

        <button
          onClick={() => setShowSubmitConfirm(true)}
          className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
        >
          Submit Exam
        </button>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md mx-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Submit Exam?</h3>
            <p className="text-gray-600 mb-6">
              You have answered {answeredCount} out of {questions.length} questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-yellow-600 font-semibold">
                  Warning: {questions.length - answeredCount} question(s) unanswered!
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
