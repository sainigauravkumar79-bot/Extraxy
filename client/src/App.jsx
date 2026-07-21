import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ThreeDBackground from './components/ThreeDBackground';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen">
          {/* 3D Background (always behind) */}
          <div className="fixed inset-0 -z-10">
            <ThreeDBackground />
          </div>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="documents" element={<Documents />} />
              <Route path="templates" element={<Templates />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
