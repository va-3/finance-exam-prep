import { Clock, AlertCircle, TrendingUp, Target, BookOpen } from 'lucide-react';
import type { ReadinessMetrics } from '../../types/progress';

interface SidebarProps {
  metrics: ReadinessMetrics;
  examDate: Date;
  isCollapsed?: boolean;
}

export default function Sidebar({ metrics, examDate, isCollapsed = false }: SidebarProps) {
  // Calculate time until exam
  const now = new Date();
  const timeUntilExam = examDate.getTime() - now.getTime();
  const daysLeft = Math.floor(timeUntilExam / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeUntilExam % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeUntilExam % (1000 * 60 * 60)) / (1000 * 60));

  // Get readiness color
  const getReadinessColor = (score: number) => {
    if (score >= 85) return 'text-accent-green';
    if (score >= 70) return 'text-yellow-400';
    return 'text-accent-red';
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 85) return 'Exam Ready!';
    if (score >= 70) return 'Almost There';
    if (score >= 50) return 'Keep Studying';
    return 'Need More Work';
  };

  if (isCollapsed) {
    return (
      <div className="w-20 bg-bg-secondary border-r border-bg-tertiary p-4 flex flex-col items-center gap-6">
        <Target className="w-8 h-8 text-accent-blue" />
        <Clock className="w-8 h-8 text-accent-green" />
        <AlertCircle className="w-8 h-8 text-accent-red" />
      </div>
    );
  }

  return (
    <div className="w-80 bg-bg-secondary border-r border-bg-tertiary p-6 space-y-6 overflow-y-auto">
      {/* Exam Countdown */}
      <div className="card bg-accent-blue/10 border border-accent-blue/30">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-6 h-6 text-accent-blue" />
          <h3 className="font-bold text-accent-blue">Exam Countdown</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-3xl font-bold text-accent-blue-light">{daysLeft}</div>
            <div className="text-xs text-text-tertiary">Days</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-blue-light">{hoursLeft}</div>
            <div className="text-xs text-text-tertiary">Hours</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-blue-light">{minutesLeft}</div>
            <div className="text-xs text-text-tertiary">Minutes</div>
          </div>
        </div>
      </div>

      {/* Readiness Score */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-accent-green" />
          <h3 className="font-bold">Readiness Score</h3>
        </div>

        {/* Circular Progress */}
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-bg-tertiary"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - metrics.overallScore / 100)}`}
              className={getReadinessColor(metrics.overallScore)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${getReadinessColor(metrics.overallScore)}`}>
              {Math.round(metrics.overallScore)}%
            </div>
            <div className="text-sm text-text-tertiary">{getReadinessLabel(metrics.overallScore)}</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Practice Average</span>
            <span className="font-semibold">{Math.round(metrics.practiceAverage)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Master Average</span>
            <span className="font-semibold">{Math.round(metrics.masterAverage)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Flashcard Mastery</span>
            <span className="font-semibold">{Math.round(metrics.flashcardMastery)}%</span>
          </div>
        </div>
      </div>

      {/* Weak Areas */}
      {metrics.weakAreas.length > 0 && (
        <div className="card bg-accent-red/10 border border-accent-red/30">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-accent-red" />
            <h3 className="font-bold text-accent-red">Focus Areas</h3>
          </div>
          <p className="text-sm text-text-tertiary mb-3">Topics scoring below 70%</p>
          <div className="space-y-2">
            {metrics.weakAreas.slice(0, 5).map((area) => (
              <div key={area.topicId} className="bg-bg-primary rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{area.topicName}</span>
                  <span className="text-sm text-accent-red font-bold">{Math.round(area.score)}%</span>
                </div>
                <div className="progress-bar h-2">
                  <div
                    className="h-full bg-accent-red rounded-full transition-all"
                    style={{ width: `${area.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Suggestions */}
      <div className="card bg-accent-green/10 border border-accent-green/30">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-accent-green" />
          <h3 className="font-bold text-accent-green">Smart Suggestions</h3>
        </div>
        <ul className="space-y-2 text-sm">
          {metrics.overallScore < 70 && (
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">•</span>
              <span>Focus on weak areas first before moving to new topics</span>
            </li>
          )}
          {metrics.flashcardMastery < 80 && (
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">•</span>
              <span>Spend 15 minutes daily on flashcards for better retention</span>
            </li>
          )}
          {metrics.practiceAverage < metrics.masterAverage && (
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">•</span>
              <span>Get more practice before attempting master mode</span>
            </li>
          )}
          {daysLeft <= 1 && metrics.overallScore < 80 && (
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">•</span>
              <span>Take a full practice exam to identify last-minute gaps</span>
            </li>
          )}
          {metrics.overallScore >= 85 && (
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">•</span>
              <span>Great job! Review the formula sheet and relax before the exam</span>
            </li>
          )}
        </ul>
      </div>

      {/* Study Plan Preview */}
      {metrics.studyPlan.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-accent-blue" />
            <h3 className="font-bold">Today's Plan</h3>
          </div>
          <div className="space-y-2">
            {metrics.studyPlan[0].topics.slice(0, 3).map((topic) => (
              <div key={topic.topicId} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{topic.topicName}</span>
                <span className="font-semibold text-accent-blue">{topic.timeAllocation} min</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 btn-secondary text-sm py-2">
            View Full Plan
          </button>
        </div>
      )}
    </div>
  );
}
