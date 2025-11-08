import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound({ lang }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        {/* 404 Illustration */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-9xl mb-8"
        >
          🤔
        </motion.div>

        {/* Error Code */}
        <h1 className="text-8xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {lang === 'fa' ? 'صفحه پیدا نشد!' : 'Page Not Found!'}
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {lang === 'fa' 
            ? 'متأسفانه صفحه‌ای که دنبالش هستید وجود ندارد یا حذف شده است.'
            : 'Sorry, the page you are looking for does not exist or has been removed.'
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <span>🏠</span>
            {lang === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
          </Link>
          
          <Link 
            to="/lessons" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-bold hover:border-red-400 dark:hover:border-red-400 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <span>📚</span>
            {lang === 'fa' ? 'رفتن به درس‌ها' : 'Go to Lessons'}
          </Link>
        </div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {lang === 'fa' ? 'شاید به دنبال این‌ها باشید:' : 'You might be looking for:'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { path: '/practice', label: { fa: 'تمرین', en: 'Practice' }, icon: '🎮' },
              { path: '/progress', label: { fa: 'پیشرفت', en: 'Progress' }, icon: '📊' },
              { path: '/profile', label: { fa: 'پروفایل', en: 'Profile' }, icon: '👤' }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300"
              >
                <span className="mr-2">{link.icon}</span>
                {link.label[lang]}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}