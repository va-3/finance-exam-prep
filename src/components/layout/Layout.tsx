import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar will be implemented by ux-agent */}
        <aside className="w-64 border-r border-border bg-card">
          <div className="p-4">
            <h1 className="text-xl font-bold text-foreground">Finance Exam Prep</h1>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
