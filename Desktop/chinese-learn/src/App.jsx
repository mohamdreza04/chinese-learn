import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  // مدیریت نصب PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('🟢 beforeinstallprompt فعال شد');
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log('✅ اپ با موفقیت نصب شد');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    // بررسی اینکه آیا اپ قبلاً نصب شده
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('📱 اپ در حالت standalone اجرا می‌شود');
      setIsInstallable(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('🔄 شروع فرآیند نصب...');
      
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`نتیجه نصب: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('✅ کاربر نصب را پذیرفت');
        setShowInstallPrompt(false);
        setIsInstallable(false);
      } else {
        console.log('❌ کاربر نصب را رد کرد');
      }
      
      setDeferredPrompt(null);
    } else {
      console.log('❌ deferredPrompt موجود نیست');
      setShowInstallPrompt(false);
    }
  };

  const closeInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <Navbar 
        dark={dark} 
        setDark={setDark} 
        lang={lang} 
        setLang={setLang}
        isInstallable={isInstallable}
        onInstall={handleInstallClick}
      />
      
      {/* پیام نصب PWA - کاملاً ریسپانسیو */}
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 lg:bottom-4 lg:left-4 lg:right-4 bg-white dark:bg-gray-800 border-t lg:border-0 border-gray-200 dark:border-gray-700 shadow-2xl z-50"
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between p-4 lg:p-6 gap-4 lg:gap-6 rounded-2xl">
              {/* محتوا - در موبایل عمودی، در دسکتاپ افقی */}
              <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto justify-center lg:justify-start">
                {/* آیکون - در موبایل کوچکتر */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0">
                  <span className="text-lg lg:text-xl">中</span>
                </div>
                
                {/* متن */}
                <div className="text-center lg:text-right flex-1 lg:flex-none">
                  <div className="font-black text-gray-900 dark:text-white text-base lg:text-lg">
                    {lang === 'fa' ? 'نصب اپ ChineseMaster' : 'Install ChineseMaster'}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {lang === 'fa' 
                      ? 'دسترسی سریع، کار آفلاین، تجربه بهتر' 
                      : 'Quick access, offline work, better experience'
                    }
                  </div>
                </div>
              </div>

              {/* دکمه‌ها - در موبایل full-width، در دسکتاپ auto */}
              <div className="flex flex-col xs:flex-row gap-2 w-full lg:w-auto">
                <button
                  onClick={closeInstallPrompt}
                  className="px-4 py-3 lg:py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 order-2 xs:order-1 lg:order-1"
                >
                  {lang === 'fa' ? 'بعداً' : 'Later'}
                </button>
                <button
                  onClick={handleInstallClick}
                  className="px-6 py-3 lg:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2 order-1 xs:order-2 lg:order-2"
                >
                  <span className="text-lg">📱</span>
                  <span>{lang === 'fa' ? 'نصب کن' : 'Install'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24 lg:pb-8">
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