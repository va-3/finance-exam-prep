import Dashboard from '../components/layout/Dashboard';
import { calculateReadinessMetrics } from '../utils/metricsCalculator';
import { useExamStore } from '../store/examStore';

export default function DashboardPage() {
  // Calculate real metrics from actual user progress
  const metrics = calculateReadinessMetrics();
  const examHistory = useExamStore((state) =>
    state.attempts
      .filter(a => a.status === 'completed')
      .map(a => ({
        id: a.id,
        date: new Date(a.startTime),
        score: a.percentage || 0,
        timeSpent: a.duration,
        questionsCorrect: a.score || 0,
        questionsTotal: a.questions.length,
        weakAreas: [] as string[], // Can be enhanced later
      }))
  );

  return <Dashboard metrics={metrics} examHistory={examHistory} />;
}
