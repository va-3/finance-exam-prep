import { useMemo } from 'react';
import Dashboard from '../components/layout/Dashboard';
import { calculateReadinessMetrics } from '../utils/metricsCalculator';
import { useExamStore } from '../store/examStore';

export default function DashboardPage() {
  // Calculate real metrics from actual user progress (memoized to prevent infinite loops)
  const metrics = useMemo(() => calculateReadinessMetrics(), []);

  const examHistory = useMemo(() => {
    const attempts = useExamStore.getState().attempts;
    return attempts
      .filter(a => a.status === 'completed')
      .map(a => ({
        id: a.id,
        date: new Date(a.startTime),
        score: a.percentage || 0,
        timeSpent: a.duration,
        questionsCorrect: a.score || 0,
        questionsTotal: a.questions.length,
        weakAreas: [] as string[],
      }));
  }, []);

  return <Dashboard metrics={metrics} examHistory={examHistory} />;
}
