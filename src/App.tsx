import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Placeholder components - will be implemented by other agents
const Dashboard = () => <div>Dashboard</div>;
const Learn = () => <div>Learn</div>;
const Practice = () => <div>Practice</div>;
const Flashcards = () => <div>Flashcards</div>;
const Exam = () => <div>Exam</div>;
const Calculator = () => <div>Calculator</div>;
const Master = () => <div>Master</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:chapterId" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:chapterId" element={<Practice />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/flashcards/:chapterId" element={<Flashcards />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/master" element={<Master />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
