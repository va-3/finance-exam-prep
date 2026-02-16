import { useState, useEffect, useMemo } from 'react';
import { Trophy, Clock, ArrowRight } from 'lucide-react';
import type { Topic } from '../../types/content';
import { useProgressStore } from '../../store/progressStore';

interface MasterModeProps {
  topic: Topic;
  onComplete: () => void;
}

export default function MasterMode({ topic, onComplete }: MasterModeProps) {
  const { updateMasterScore } = useProgressStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(topic.masterQuestions.length * 60); // 1 min per question
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = topic.masterQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / topic.masterQuestions.length) * 100;

  // Timer
  useEffect(() => {
    if (isComplete || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete, showResults, currentQuestionIndex]);

  const handleTimeUp = () => {
    // Auto-submit remaining questions as incorrect
    const remainingQuestions = topic.masterQuestions.length - answers.length;
    const finalAnswers = [...answers, ...Array(remainingQuestions).fill(false)];
    const score = Math.round((finalAnswers.filter(Boolean).length / finalAnswers.length) * 100);
    updateMasterScore(topic.id, score);
    setAnswers(finalAnswers);
    setIsComplete(true);
    setShowResults(true);
  };

  const handleSubmit = () => {
    const isCorrect =
      currentQuestion.type === 'multiple-choice'
        ? selectedOption === currentQuestion.correctAnswer
        : parseFloat(userAnswer) === currentQuestion.correctAnswer;

    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestionIndex < topic.masterQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setUserAnswer('');
    } else {
      // Calculate final score
      const score = Math.round((newAnswers.filter(Boolean).length / newAnswers.length) * 100);
      updateMasterScore(topic.id, score);
      setIsComplete(true);
      setShowResults(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentScore = useMemo(() => {
    if (answers.length === 0) return 0;
    return Math.round((answers.filter(Boolean).length / answers.length) * 100);
  }, [answers]);

  // Results Screen
  if (showResults) {
    const finalScore = Math.round((answers.filter(Boolean).length / answers.length) * 100);
    const isPassing = finalScore >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Score Card */}
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center mb-6">
            <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
              isPassing ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-yellow-600 to-yellow-700'
            }`}>
              {isPassing ? (
                <Trophy className="w-16 h-16 text-white" />
              ) : (
                <span className="text-5xl font-bold text-white">{finalScore}%</span>
              )}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {isPassing ? 'Mastered!' : 'Keep Practicing!'}
            </h2>
            <p className="text-slate-300 text-xl mb-2">
              You scored <span className="font-bold text-white">{finalScore}%</span>
            </p>
            <p className="text-slate-400">
              {answers.filter(Boolean).length} out of {answers.length} correct
            </p>

            {timeRemaining === 0 && (
              <div className="mt-4 px-4 py-2 bg-red-900/30 border border-red-500/30 rounded-lg inline-block">
                <p className="text-red-300 text-sm">⏱️ Time ran out</p>
              </div>
            )}
          </div>

          {/* Performance Breakdown */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {answers.filter(Boolean).length}
                </div>
                <div className="text-sm text-slate-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">
                  {answers.filter((a) => !a).length}
                </div>
                <div className="text-sm text-slate-400">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {formatTime(topic.masterQuestions.length * 60 - timeRemaining)}
                </div>
                <div className="text-sm text-slate-400">Time Used</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isPassing && (
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setUserAnswer('');
                  setAnswers([]);
                  setIsComplete(false);
                  setShowResults(false);
                  setTimeRemaining(topic.masterQuestions.length * 60);
                }}
                className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onComplete}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h1 className="text-3xl font-bold text-white">Master Mode</h1>
              </div>
              <p className="text-slate-400">{topic.name}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold font-mono ${
                timeRemaining < 60 ? 'text-red-400' : 'text-blue-400'
              }`}>
                <Clock className="w-6 h-6 inline mr-2" />
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-slate-400">Time Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>Question {currentQuestionIndex + 1} of {topic.masterQuestions.length}</span>
            <span className="font-semibold">{currentScore}% Current Score</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-200 text-sm">
            ⚠️ No hints available in Master Mode. Answer all questions before time runs out!
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-6">
          <h2 className="text-2xl text-white mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Answer Input for Calculation */}
          {currentQuestion.type === 'calculation' && (
            <div className="mb-6">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white text-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          )}

          {/* Multiple Choice Options */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedOption === option
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-400'
                    }`}>
                      {selectedOption === option && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-slate-200 text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={
              (currentQuestion.type === 'calculation' && !userAnswer) ||
              (currentQuestion.type === 'multiple-choice' && !selectedOption)
            }
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-green-600 hover:from-yellow-700 hover:to-green-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
          >
            {currentQuestionIndex < topic.masterQuestions.length - 1 ? 'Next Question' : 'Finish'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Question Progress Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {topic.masterQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx < answers.length
                  ? answers[idx]
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : idx === currentQuestionIndex
                  ? 'bg-blue-500 ring-4 ring-blue-500/30'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
