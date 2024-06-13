import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoScreen from './pages/TodoScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
