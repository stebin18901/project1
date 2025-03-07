import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TableEditor from './components/TableEditor';
import TableView from './components/TableView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:tableId" element={<TableEditor />} />
        <Route path="/view/:tableId" element={<TableView />} />
      </Routes>
    </Router>
  );
}

export default App;