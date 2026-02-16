import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Trophy, BookOpen, CheckCircle } from 'lucide-react';
import type { ReadinessMetrics, ExamAttempt } from '../../types/progress';

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

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-text-secondary text-lg">Track your progress and stay on target</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/30">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-accent-blue" />
              <span className="text-3xl font-bold text-accent-blue">
                {Math.round(metrics.overallScore)}%
              </span>
            </div>
            <p className="text-text-secondary">Overall Readiness</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-green/20 to-accent-green/5 border border-accent-green/30">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-accent-green" />
              <span className="text-3xl font-bold text-accent-green">
                {Math.round(metrics.practiceAverage)}%
              </span>
            </div>
            <p className="text-text-secondary">Practice Average</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-purple-400">
                {Math.round(metrics.flashcardMastery)}%
              </span>
            </div>
            <p className="text-text-secondary">Flashcard Mastery</p>
          </div>

          <div className="card bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-yellow-400">
                {examHistory.length}
              </span>
            </div>
            <p className="text-text-secondary">Practice Exams</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exam Score Progression */}
          {examScoreData.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Exam Score Progression</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={examScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="attempt" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Study Plan Hours */}
          {studyPlanData.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">3-Day Study Plan</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studyPlanData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="hours" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Detailed Study Plan */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Your Personalized Study Plan</h2>
          <p className="text-text-secondary mb-6">
            Based on your current progress, here's a recommended schedule to maximize your exam readiness
          </p>

          <div className="space-y-6">
            {metrics.studyPlan.map((day) => (
              <div key={day.day} className="bg-bg-tertiary rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-accent-blue">Day {day.day}</h3>
                    <p className="text-sm text-text-tertiary">
                      {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent-green">{day.totalMinutes} min</p>
                    <p className="text-sm text-text-tertiary">Total Study Time</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {day.topics.map((topic) => {
                    const priorityColors = {
                      high: 'border-accent-red bg-accent-red/10',
                      medium: 'border-yellow-400 bg-yellow-400/10',
                      low: 'border-accent-green bg-accent-green/10',
                    };

                    return (
                      <div
                        key={topic.topicId}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 ${priorityColors[topic.priority]}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-accent-blue">
                              {topic.timeAllocation}
                            </span>
                            <span className="text-xs text-text-tertiary">min</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{topic.topicName}</h4>
                            <p className="text-sm text-text-tertiary capitalize">
                              {topic.priority} priority
                            </p>
                          </div>
                        </div>
                        <button className="btn-secondary text-sm py-2 px-4">
                          Start Learning
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="card bg-accent-blue/10 border border-accent-blue/30">
          <h2 className="text-xl font-bold mb-4 text-accent-blue">Study Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Effective Study Techniques:</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Use Pomodoro: 25 min study, 5 min break</li>
                <li>• Practice with calculator for every problem</li>
                <li>• Review flashcards during short breaks</li>
                <li>• Take full practice exams under timed conditions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Exam Day Preparation:</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Get 7-8 hours of sleep the night before</li>
                <li>• Bring fresh calculator batteries</li>
                <li>• Review formula sheet one last time</li>
                <li>• Arrive 15 minutes early to relax</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
