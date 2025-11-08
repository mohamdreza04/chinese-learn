import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LESSONS from '../data/lessons';
import Flashcard from '../components/Flashcard';

const allItems = LESSONS.flatMap(l => l.items);

export default function Practice({ lang }) {
  const [idx, setIdx] = useState(0);

  function play(text) {
    if (!window.speechSynthesis) return alert(lang === 'fa' ? 'تلفظ پشتیبانی نمی‌شود' : 'Speech not supported');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function next() {
    setIdx(i => (i + 1) % allItems.length);
  }
  
  function prev() {
    setIdx(i => (i - 1 + allItems.length) % allItems.length);
  }

  function shuffle() {
    setIdx(Math.floor(Math.random() * allItems.length));
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-4">
            {lang === 'fa' ? 'تمرین رایگان' : 'Free Practice'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {lang === 'fa' 
              ? 'تمام کلمات را مرور کنید و تمرین کنید'
              : 'Review and practice all words'
            }
          </p>
        </motion.div>

        {/* Flashcard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Flashcard item={allItems[idx]} lang={lang} onPlay={play} />
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {lang === 'fa' ? 'پیشرفت' : 'Progress'}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {idx + 1} / {allItems.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
              style={{ width: `${((idx + 1) / allItems.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <button 
            onClick={prev}
            disabled={idx === 0}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            {lang === 'fa' ? '← قبلی' : '← Previous'}
          </button>
          
          <button 
            onClick={shuffle}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {lang === 'fa' ? '🔀 تصادفی' : '🔀 Shuffle'}
          </button>
          
          <button 
            onClick={() => play(allItems[idx].cn)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {lang === 'fa' ? '🔊 تلفظ' : '🔊 Pronounce'}
          </button>
          
          <button 
            onClick={next}
            disabled={idx === allItems.length - 1}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            {lang === 'fa' ? 'بعدی →' : 'Next →'}
          </button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            📊 {lang === 'fa' ? 'آمار تمرین' : 'Practice Stats'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: { fa: 'کل کلمات', en: 'Total Words' }, 
                value: allItems.length,
                icon: '📚'
              },
              { 
                label: { fa: 'مرور شده', en: 'Reviewed' }, 
                value: idx + 1,
                icon: '✅'
              },
              { 
                label: { fa: 'باقیمانده', en: 'Remaining' }, 
                value: allItems.length - idx - 1,
                icon: '⏳'
              },
              { 
                label: { fa: 'درصد', en: 'Progress' }, 
                value: `${Math.round(((idx + 1) / allItems.length) * 100)}%`,
                icon: '📈'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            💡 {lang === 'fa' ? 'نکته تمرین' : 'Practice Tip'}
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            {lang === 'fa'
              ? 'برای یادگیری بهتر، هر کلمه را چند بار با صدای بلند تکرار کنید و سپس به کلمه بعدی بروید.'
              : 'For better learning, repeat each word out loud several times before moving to the next one.'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
}