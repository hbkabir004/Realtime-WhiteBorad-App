import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AllDrawings from './pages/AllDrawings';
import SingleDrawing from './pages/SingleDrawing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllDrawings />} />
        <Route path="/drawing/:id" element={<SingleDrawing />} />
      </Routes>
    </Router>
  );
}

export default App;
