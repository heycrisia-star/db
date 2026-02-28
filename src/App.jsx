import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Itinerary from './components/Itinerary';
import Dining from './components/Dining';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dining />} />
            <Route path="dining" element={<Navigate to="/" replace />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
