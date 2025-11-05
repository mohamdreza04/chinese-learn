// components/LessonCard.jsx - نسخه کامل‌شده
import React from 'react';
import { motion } from 'framer-motion';

export default function LessonCard({ lesson, lang, onOpen, isCompleted }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={() => onOpen(lesson)}
    >
      {/* نشانه تکمیل شده */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
          ✓
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg ${
              isCompleted 
                ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                : 'bg-gradient-to-br from-red-500 to-pink-500'
            }`}>
              {lesson.id}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-300">
                {lesson.title[lang]}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {lesson.items.length} {lang === 'fa' ? 'مورد آموزشی' : 'learning items'}
              </p>
            </div>
          </div>
          
          {/* نمونه‌ای از محتوای درس */}
          <div className="flex gap-2 flex-wrap">
            {lesson.items.slice(0, 3).map((item, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600"
              >
                {item.cn}
              </span>
            ))}
            {lesson.items.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-3 py-1 rounded-full">
                +{lesson.items.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* دکمه اقدام */}
      <div className="mt-6">
        <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 group-hover:scale-105 ${
          isCompleted
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
        }`}>
          <span className="flex items-center justify-center gap-2">
            {isCompleted 
              ? (lang === 'fa' ? '✅ تکمیل شده' : '✅ Completed')
              : (lang === 'fa' ? 'شروع یادگیری' : 'Start Learning')
            }
            {!isCompleted && <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>}
          </span>
        </button>
      </div>
    </motion.div>
  );
}