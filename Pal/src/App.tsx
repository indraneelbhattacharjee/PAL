import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import { PalAIProvider } from './context/PalAIContext';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });
  }, [navigate]);

  return (
    <PalAIProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </PalAIProvider>
  );
}

export default App;