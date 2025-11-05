// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('fa');
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/lessons" element={<Lessons lang={lang} userProgress={userProgress} setUserProgress={setUserProgress} />} />
          <Route path="/practice" element={<Practice lang={lang} />} />
          <Route path="/progress" element={<Progress lang={lang} userProgress={userProgress} />} />
          <Route path="/profile" element={<Profile lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
