import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Trophy, BookOpen, CheckCircle, TrendingUp, Target, Zap } from 'lucide-react';
import type { ReadinessMetrics, ExamAttempt } from '../../types/progress';
import ProgressRing from '../ui/ProgressRing';
import { getReadinessStatus } from '../../utils/metricsCalculator';

interface DashboardProps {
  metrics: ReadinessMetrics;
  examHistory: ExamAttempt[];
}

export default function Dashboard({ metrics, examHistory }: DashboardProps) {
  // Prepare chart data
  const examScoreData = examHistory.slice(-5).map((attempt, idx) => ({
    attempt: `Attempt ${idx + 1}`,
    score: attempt.score,
  }));

  const studyPlanData = metrics.studyPlan.map(day => ({
    day: `Day ${day.day}`,
    hours: day.totalMinutes / 60,
  }));

  const readinessStatus = getReadinessStatus(metrics.overallScore);

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as any,
      },
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-heading-1 font-bold mb-3 text-gradient-blue">
            Exam Readiness
          </h1>
          <p className="text-body-lg text-text-secondary">
            Track your progress and optimize your study plan
          </p>
        </motion.div>

        {/* Hero Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="card-glass card-hover inline-block p-12">
            <ProgressRing
              progress={metrics.overallScore}
              size={280}
              strokeWidth={16}
              label={readinessStatus}
              color="auto"
            />
          </div>
        </motion.div>

        {/* Quick Stats Grid - Stripe-inspired cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={cardVariants} className="card card-hover glow-on-hover">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-accent-green bg-opacity-10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent-green" />
              </div>
              <div>
                <p className="text-sm text-text-tertiary font-medium">Practice Average</p>
                <p className="text-heading-3 font-bold text-accent-green">
                  {Math.round(metrics.practiceAverage)}%
                </p>
              </div>
            </div>
            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-green"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.practiceAverage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="card card-hover glow-on-hover">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-accent-purple bg-opacity-10 rounded-lg">
                <BookOpen className="w-6 h-6 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-text-tertiary font-medium">Flashcard Mastery</p>
                <p className="text-heading-3 font-bold text-accent-purple">
                  {Math.round(metrics.flashcardMastery)}%
                </p>
              </div>
            </div>
            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-purple"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.flashcardMastery}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="card card-hover glow-on-hover">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-accent-blue bg-opacity-10 rounded-lg">
                <Target className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <p className="text-sm text-text-tertiary font-medium">Practice Exams</p>
                <p className="text-heading-3 font-bold text-accent-blue">
                  {examHistory.length}
                </p>
              </div>
            </div>
            <p className="text-body-sm text-text-muted">
              {examHistory.length > 0 ? `Best: ${Math.max(...examHistory.map(e => e.score))}%` : 'Take your first exam'}
            </p>
          </motion.div>
        </motion.div>

        {/* Charts Row - Notion-inspired calm layout */}
        {(examScoreData.length > 0 || studyPlanData.length > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
          >
            {examScoreData.length > 0 && (
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-accent-blue" />
                  <h2 className="text-heading-4">Score Progression</h2>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={examScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis
                      dataKey="attempt"
                      stroke="#cbd5e1"
                      style={{ fontSize: '0.875rem' }}
                    />
                    <YAxis
                      stroke="#cbd5e1"
                      domain={[0, 100]}
                      style={{ fontSize: '0.875rem' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a2332',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#5B8DEF"
                      strokeWidth={3}
                      dot={{ fill: '#5B8DEF', r: 5, strokeWidth: 2, stroke: '#1a2332' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {studyPlanData.length > 0 && (
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-5 h-5 text-accent-green" />
                  <h2 className="text-heading-4">3-Day Study Plan</h2>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={studyPlanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis
                      dataKey="day"
                      stroke="#cbd5e1"
                      style={{ fontSize: '0.875rem' }}
                    />
                    <YAxis
                      stroke="#cbd5e1"
                      style={{ fontSize: '0.875rem' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a2332',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar
                      dataKey="hours"
                      fill="#2FC98C"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        )}

        {/* Personalized Study Plan */}
        {metrics.studyPlan.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-accent-yellow" />
              <h2 className="text-heading-3">Your Study Roadmap</h2>
            </div>
            <p className="text-text-secondary mb-8 text-body">
              Personalized schedule based on your progress and weak areas
            </p>

            <div className="space-y-6">
              {metrics.studyPlan.map((day, dayIdx) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + dayIdx * 0.1 }}
                  className="bg-bg-tertiary rounded-lg p-6 border border-border-subtle hover:border-border-medium transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-heading-4 text-accent-blue mb-1">Day {day.day}</h3>
                      <p className="text-body-sm text-text-tertiary">
                        {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="badge badge-green">
                      {day.totalMinutes} minutes
                    </div>
                  </div>

                  <div className="space-y-3">
                    {day.topics.map((topic) => {
                      const priorityStyles = {
                        high: 'border-accent-red bg-accent-red/5 hover:bg-accent-red/10',
                        medium: 'border-accent-yellow bg-accent-yellow/5 hover:bg-accent-yellow/10',
                        low: 'border-accent-green bg-accent-green/5 hover:bg-accent-green/10',
                      };

                      const priorityBadges = {
                        high: 'badge-yellow',
                        medium: 'badge-blue',
                        low: 'badge-green',
                      };

                      return (
                        <div
                          key={topic.topicId}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${priorityStyles[topic.priority]}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center bg-bg-secondary rounded-lg p-3 min-w-[60px]">
                              <span className="text-2xl font-bold text-accent-blue">
                                {topic.timeAllocation}
                              </span>
                              <span className="text-xs text-text-muted">min</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-text-primary mb-1">{topic.topicName}</h4>
                              <span className={`badge ${priorityBadges[topic.priority]} text-xs`}>
                                {topic.priority} priority
                              </span>
                            </div>
                          </div>
                          <button className="btn-secondary text-sm py-2 px-4 hover:scale-105 transition-transform">
                            Start
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Study Tips - Notion-inspired info box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="card bg-accent-blue/5 border-accent-blue/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-accent-blue" />
            <h2 className="text-heading-4 text-accent-blue">Study Tips for Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Effective Techniques</h3>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent-green mt-1">✓</span>
                  <span>Use Pomodoro: 25 min study, 5 min break</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green mt-1">✓</span>
                  <span>Practice with calculator for every problem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green mt-1">✓</span>
                  <span>Review flashcards during short breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green mt-1">✓</span>
                  <span>Take full practice exams under timed conditions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Exam Day Prep</h3>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">→</span>
                  <span>Get 7-8 hours of sleep the night before</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">→</span>
                  <span>Bring fresh calculator batteries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">→</span>
                  <span>Review formula sheet one last time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">→</span>
                  <span>Arrive 15 minutes early to stay calm</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
