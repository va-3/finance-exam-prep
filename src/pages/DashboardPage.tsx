import Dashboard from '../components/layout/Dashboard';

// Mock data for demo
const mockExamHistory = [
  {
    id: '1',
    date: new Date('2024-02-10'),
    score: 65,
    timeSpent: 3600,
    questionsCorrect: 13,
    questionsTotal: 20,
    weakAreas: ['Time Value of Money', 'Bond Pricing'],
  },
  {
    id: '2',
    date: new Date('2024-02-12'),
    score: 72,
    timeSpent: 3400,
    questionsCorrect: 14,
    questionsTotal: 20,
    weakAreas: ['NPV', 'Stock Valuation'],
  },
  {
    id: '3',
    date: new Date('2024-02-14'),
    score: 78,
    timeSpent: 3200,
    questionsCorrect: 16,
    questionsTotal: 20,
    weakAreas: ['Ratios'],
  },
  {
    id: '4',
    date: new Date('2024-02-15'),
    score: 85,
    timeSpent: 3000,
    questionsCorrect: 17,
    questionsTotal: 20,
    weakAreas: [],
  },
];

const mockMetrics = {
  overallScore: 78,
  practiceAverage: 75,
  masterAverage: 80,
  flashcardMastery: 82,
  weakAreas: [
    { topicId: 'npv', topicName: 'Net Present Value', score: 65 },
    { topicId: 'bonds', topicName: 'Bond Pricing', score: 68 },
    { topicId: 'ratios', topicName: 'Financial Ratios', score: 70 },
  ],
  studyPlan: [
    {
      day: 1,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      topics: [
        { topicId: 'npv', topicName: 'Net Present Value', timeAllocation: 60, priority: 'high' as const },
        { topicId: 'bonds', topicName: 'Bond Pricing', timeAllocation: 60, priority: 'high' as const },
        { topicId: 'ratios', topicName: 'Financial Ratios', timeAllocation: 45, priority: 'medium' as const },
      ],
      totalMinutes: 240,
    },
    {
      day: 2,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      topics: [
        { topicId: 'stocks', topicName: 'Stock Valuation', timeAllocation: 60, priority: 'medium' as const },
        { topicId: 'tvm', topicName: 'Time Value of Money', timeAllocation: 60, priority: 'high' as const },
        { topicId: 'cashflow', topicName: 'Cash Flow Analysis', timeAllocation: 45, priority: 'low' as const },
      ],
      totalMinutes: 240,
    },
    {
      day: 3,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      topics: [
        { topicId: 'practice-exam', topicName: 'Full Practice Exam', timeAllocation: 120, priority: 'high' as const },
        { topicId: 'review', topicName: 'Formula Sheet Review', timeAllocation: 60, priority: 'medium' as const },
        { topicId: 'flashcards', topicName: 'Flashcard Review', timeAllocation: 30, priority: 'low' as const },
      ],
      totalMinutes: 240,
    },
  ],
};

export default function DashboardPage() {
  return <Dashboard metrics={mockMetrics} examHistory={mockExamHistory} />;
}
