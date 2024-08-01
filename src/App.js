import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './Catalog'; 
import './App.css';
import Form from './Form'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/add-business" element={<Form />} />
          <Route path="*" element={<Navigate to="/catalog" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;