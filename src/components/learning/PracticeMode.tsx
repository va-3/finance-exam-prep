import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import type { Topic } from '../../types/content';
import { useProgressStore } from '../../store/progressStore';

interface PracticeModeProps {
  topic: Topic;
  onComplete: () => void;
}

export default function PracticeMode({ topic, onComplete }: PracticeModeProps) {
  const { updatePracticeScore } = useProgressStore();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentProblem = topic.practiceProblems[currentProblemIndex];
  const progress = ((currentProblemIndex + 1) / topic.practiceProblems.length) * 100;

  const handleSubmit = () => {
    const isCorrect =
      currentProblem.type === 'multiple-choice'
        ? selectedOption === currentProblem.correctAnswer
        : parseFloat(userAnswer) === currentProblem.correctAnswer;

    setAnswers([...answers, isCorrect]);
    setShowSolution(true);
  };

  const handleNext = () => {
    if (currentProblemIndex < topic.practiceProblems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowHint(false);
      setShowSolution(false);
    } else {
      // Calculate score
      const score = Math.round((answers.filter(Boolean).length / answers.length) * 100);
      updatePracticeScore(topic.id, score);
      setIsComplete(true);
    }
  };

  const currentScore = useMemo(() => {
    if (answers.length === 0) return 0;
    return Math.round((answers.filter(Boolean).length / answers.length) * 100);
  }, [answers]);

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            currentScore >= 70 ? 'bg-green-600' : 'bg-yellow-600'
          }`}>
            <span className="text-4xl font-bold text-white">{currentScore}%</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {currentScore >= 70 ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            You got {answers.filter(Boolean).length} out of {answers.length} correct.
            {currentScore >= 70
              ? ' You\'re ready to move on to Master mode!'
              : ' Try reviewing the Learn section again.'}
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            Continue
          </button>
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
              <h1 className="text-3xl font-bold text-white mb-2">Practice Mode</h1>
              <p className="text-slate-400">{topic.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{currentScore}%</div>
              <div className="text-sm text-slate-400">Current Score</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>Question {currentProblemIndex + 1} of {topic.practiceProblems.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-6">
          {/* Difficulty Badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 ${
            currentProblem.difficulty === 'easy' ? 'bg-green-600' :
            currentProblem.difficulty === 'medium' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {currentProblem.difficulty.toUpperCase()}
          </div>

          {/* Question */}
          <h2 className="text-xl text-white mb-6 leading-relaxed">
            {currentProblem.question}
          </h2>

          {/* Answer Input */}
          {currentProblem.type === 'calculation' && (
            <div className="mb-6">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showSolution}
                placeholder="Enter your answer"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white text-lg focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          )}

          {/* Multiple Choice Options */}
          {currentProblem.type === 'multiple-choice' && currentProblem.options && (
            <div className="space-y-3 mb-6">
              {currentProblem.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !showSolution && setSelectedOption(option)}
                  disabled={showSolution}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    showSolution
                      ? option === currentProblem.correctAnswer
                        ? 'border-green-500 bg-green-900/20'
                        : option === selectedOption
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-slate-600 bg-slate-800/50 opacity-50'
                      : selectedOption === option
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showSolution && option === currentProblem.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : showSolution && option === selectedOption
                        ? 'border-red-500 bg-red-500'
                        : selectedOption === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-400'
                    }`}>
                      {showSolution && option === currentProblem.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showSolution && option === selectedOption && option !== currentProblem.correctAnswer && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-slate-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Hint Button */}
          {!showSolution && currentProblem.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}

          {/* Hint */}
          {showHint && currentProblem.hint && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <p className="text-yellow-200">{currentProblem.hint}</p>
            </div>
          )}

          {/* Solution */}
          {showSolution && (
            <div className={`border-2 rounded-lg p-6 ${
              (currentProblem.type === 'calculation' && parseFloat(userAnswer) === currentProblem.correctAnswer) ||
              (currentProblem.type === 'multiple-choice' && selectedOption === currentProblem.correctAnswer)
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <h3 className={`font-semibold mb-3 ${
                (currentProblem.type === 'calculation' && parseFloat(userAnswer) === currentProblem.correctAnswer) ||
                (currentProblem.type === 'multiple-choice' && selectedOption === currentProblem.correctAnswer)
                  ? 'text-green-300'
                  : 'text-red-300'
              }`}>
                {(currentProblem.type === 'calculation' && parseFloat(userAnswer) === currentProblem.correctAnswer) ||
                (currentProblem.type === 'multiple-choice' && selectedOption === currentProblem.correctAnswer)
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </h3>
              <div className="bg-slate-900/50 rounded p-4 mb-3">
                <p className="text-slate-300 whitespace-pre-wrap">{currentProblem.solution}</p>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold">Correct Answer:</span>
                <span className="text-green-400 font-mono">{currentProblem.correctAnswer}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {!showSolution && (
            <button
              onClick={handleSubmit}
              disabled={
                (currentProblem.type === 'calculation' && !userAnswer) ||
                (currentProblem.type === 'multiple-choice' && !selectedOption)
              }
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:scale-105 disabled:hover:scale-100"
            >
              Submit Answer
            </button>
          )}
          {showSolution && (
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              {currentProblemIndex < topic.practiceProblems.length - 1 ? 'Next Problem' : 'Finish'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
