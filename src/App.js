import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './Catalog'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          {}
          <Route path="*" element={<Navigate to="/catalog" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;