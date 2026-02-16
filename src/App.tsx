import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import { FlashcardDashboard } from './components/flashcards';
import { ExamDashboard } from './components/exam';
import { FormulaSheet } from './components/formulas';
import { flashcards, practiceQuestions, formulas } from './data';
import { chapters } from './data/chapters';

// Placeholder components - will be implemented by other agents
const Learn = () => <div>Learn</div>;
const Practice = () => <div>Practice</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:chapterId" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:chapterId" element={<Practice />} />
          <Route path="/flashcards" element={<FlashcardDashboard flashcards={flashcards} />} />
          <Route path="/flashcards/:chapterId" element={<FlashcardDashboard flashcards={flashcards} />} />
          <Route path="/exam" element={<ExamDashboard questions={practiceQuestions} />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/master" element={<FormulaSheet formulas={formulas} chapters={chapters} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
