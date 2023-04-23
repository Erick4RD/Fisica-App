import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Authenticate from './components/Authenticate';
import Layout from './components/Layout';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Estudiar from './components/Estudiar';
import ResultEstudiar from './components/ResultEstudiar';
import QuizTematicas from './components/QuizTematicas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz-tematica" element={<QuizTematicas />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
        <Route path="/Estudiar" element={<Estudiar />} />
        <Route path="/Estudiar/:Page" element={<ResultEstudiar />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
