import { useState } from 'react';
import LearningDashboard from './LearningDashboard';
import LearnMode from './LearnMode';
import PracticeMode from './PracticeMode';
import MasterMode from './MasterMode';
import { mockTopics } from '../../data/mockTopics';
import type { Topic } from '../../types/content';

type ViewMode = 'dashboard' | 'learn' | 'practice' | 'master';

export default function LearningPathExample() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicSelect = (topic: Topic, mode: ViewMode) => {
    setSelectedTopic(topic);
    setCurrentView(mode);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen">
      {/* Dashboard View */}
      {currentView === 'dashboard' && (
        <LearningDashboard topics={mockTopics} />
      )}

      {/* Learn Mode */}
      {currentView === 'learn' && selectedTopic && (
        <LearnMode topic={selectedTopic} onComplete={handleBackToDashboard} />
      )}

      {/* Practice Mode */}
      {currentView === 'practice' && selectedTopic && (
        <PracticeMode topic={selectedTopic} onComplete={handleBackToDashboard} />
      )}

      {/* Master Mode */}
      {currentView === 'master' && selectedTopic && (
        <MasterMode topic={selectedTopic} onComplete={handleBackToDashboard} />
      )}

      {/* Development Helper - Remove in production */}
      <div className="fixed bottom-4 right-4 bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-lg">
        <p className="text-xs text-slate-400 mb-2">Dev Controls</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Dashboard
          </button>
          {mockTopics.length > 0 && (
            <>
              <button
                onClick={() => handleTopicSelect(mockTopics[0], 'learn')}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
              >
                Learn
              </button>
              <button
                onClick={() => handleTopicSelect(mockTopics[0], 'practice')}
                className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
              >
                Practice
              </button>
              <button
                onClick={() => handleTopicSelect(mockTopics[0], 'master')}
                className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
              >
                Master
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
