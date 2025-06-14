import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './pages/index.tsx';
import ConfigurationPage from './pages/configuration_page.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuration_page" element={<ConfigurationPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
