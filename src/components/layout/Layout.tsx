import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Target, Zap, Calculator, FileText, Trophy, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { calculateReadinessMetrics } from '../../utils/metricsCalculator';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Learn', path: '/learn', icon: BookOpen },
  { name: 'Practice', path: '/practice', icon: Target },
  { name: 'Master', path: '/master', icon: Zap },
  { name: 'Flashcards', path: '/flashcards', icon: FileText },
  { name: 'Calculator', path: '/calculator', icon: Calculator },
  { name: 'Practice Exam', path: '/exam', icon: Trophy },
];

// Mock exam date (3 days from now for demo)
const examDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Calculate real metrics from actual user progress (memoized to prevent infinite loops)
  const metrics = useMemo(() => calculateReadinessMetrics(), []);

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Navigation Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-bg-tertiary flex flex-col">
        <div className="p-6 border-b border-bg-tertiary">
          <h1 className="text-2xl font-bold text-accent-blue">Finance Exam Prep</h1>
          <p className="text-sm text-text-tertiary mt-1">Master your finance exam</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-accent-blue text-white shadow-lg'
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-bg-tertiary">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary hover:bg-accent-blue/20 transition-all"
          >
            {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span className="text-sm">Toggle Progress</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Progress Sidebar */}
      {!sidebarCollapsed && (
        <Sidebar metrics={metrics} examDate={examDate} isCollapsed={false} />
      )}
    </div>
  );
}
