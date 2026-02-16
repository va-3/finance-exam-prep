import { useState } from 'react';
import { Clock, Trophy, TrendingUp, Calendar, PlayCircle, History } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PracticeQuestion } from '../../types';
import { useExamStore } from '../../store/examStore';
import { PracticeExam } from './PracticeExam';

interface ExamDashboardProps {
  questions: PracticeQuestion[];
}

export function ExamDashboard({ questions }: ExamDashboardProps) {
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<PracticeQuestion[]>([]);
  const [timeLimit, setTimeLimit] = useState(3600); // 60 minutes default

  const { attempts, currentAttempt, getStatistics, clearHistory } = useExamStore();
  const stats = getStatistics();

  const handleStartExam = (examQuestions: PracticeQuestion[], minutes: number) => {
    setSelectedQuestions(examQuestions);
    setTimeLimit(minutes * 60);
    setIsExamActive(true);
  };

  const handleCompleteExam = () => {
    setIsExamActive(false);
    setSelectedQuestions([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isExamActive && currentAttempt) {
    return <PracticeExam questions={selectedQuestions} timeLimit={timeLimit} onComplete={handleCompleteExam} />;
  }

  const completedAttempts = attempts.filter((a) => a.status === 'completed');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Practice Exams</h1>
        <p className="text-gray-600 mt-1">Test your knowledge with timed practice exams</p>
      </div>

      {/* Statistics Cards */}
      {stats.totalAttempts > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <History className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.totalAttempts}</span>
            </div>
            <p className="text-blue-100 font-medium">Total Attempts</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.bestScore.toFixed(0)}%</span>
            </div>
            <p className="text-green-100 font-medium">Best Score</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.averageScore.toFixed(0)}%</span>
            </div>
            <p className="text-purple-100 font-medium">Average Score</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{formatTime(Math.floor(stats.averageTime))}</span>
            </div>
            <p className="text-orange-100 font-medium">Avg Time</p>
          </motion.div>
        </div>
      )}

      {/* Quick Start Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Start Practice Exam</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStartExam(questions.slice(0, 25), 30)}
            className="p-6 rounded-lg border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors text-left"
          >
            <PlayCircle className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Quiz</h3>
            <p className="text-sm text-gray-600 mb-2">25 questions • 30 minutes</p>
            <p className="text-xs text-gray-500">Perfect for a quick review session</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStartExam(questions.slice(0, 50), 60)}
            className="p-6 rounded-lg border-2 border-green-300 bg-green-50 hover:bg-green-100 transition-colors text-left"
          >
            <Calendar className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Full Practice Exam</h3>
            <p className="text-sm text-gray-600 mb-2">50 questions • 60 minutes</p>
            <p className="text-xs text-gray-500">Simulates actual exam conditions</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStartExam(questions, 90)}
            className="p-6 rounded-lg border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 transition-colors text-left"
          >
            <Trophy className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Comprehensive Exam</h3>
            <p className="text-sm text-gray-600 mb-2">All questions • 90 minutes</p>
            <p className="text-xs text-gray-500">Complete coverage of all topics</p>
          </motion.button>
        </div>
      </div>

      {/* Attempt History */}
      {completedAttempts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Attempt History</h2>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all exam history?')) {
                  clearHistory();
                }
              }}
              className="text-sm text-red-600 hover:text-red-700 font-semibold"
            >
              Clear History
            </button>
          </div>

          <div className="space-y-3">
            {completedAttempts
              .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
              .slice(0, 10)
              .map((attempt) => {
                const passed = (attempt.percentage ?? 0) >= 70;
                return (
                  <div
                    key={attempt.id}
                    className={`p-4 rounded-lg border-2 ${
                      passed ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${
                            passed ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {attempt.percentage?.toFixed(1)}%
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {attempt.score}/{attempt.questions.length} correct
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(attempt.startTime).toLocaleDateString()} at{' '}
                              {new Date(attempt.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatTime(attempt.duration)}
                        </p>
                        <p className="text-xs text-gray-600">Time taken</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* First Time Message */}
      {stats.totalAttempts === 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Test Your Knowledge?</h3>
          <p className="text-gray-600 mb-6">
            Start your first practice exam to track your progress and identify areas for improvement.
          </p>
          <button
            onClick={() => handleStartExam(questions.slice(0, 50), 60)}
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Start First Exam
          </button>
        </div>
      )}
    </div>
  );
}
