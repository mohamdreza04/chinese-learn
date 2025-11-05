// pages/Lessons.jsx - صفحه درس‌ها (کامل‌شده)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LESSONS from '../data/lessons';
import LessonCard from '../components/LessonCard';
import Flashcard from '../components/Flashcard';

export default function Lessons({ lang, userProgress, setUserProgress }) {
  const [openedLesson, setOpenedLesson] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const playAudio = (text) => {
    if (!window.speechSynthesis) {
      alert(lang === 'fa' ? 'پخش صدا پشتیبانی نمی‌شود' : 'Audio playback not supported');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleOpenLesson = (lesson) => {
    setOpenedLesson(lesson);
    setCurrentCardIndex(0);
    setShowCompletion(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextCard = () => {
    if (currentCardIndex < openedLesson.items.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // پایان درس
      setShowCompletion(true);
      // به‌روزرسانی پیشرفت کاربر
      setUserProgress({
        ...userProgress,
        [openedLesson.id]: true
      });
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const closeLesson = () => {
    setOpenedLesson(null);
    setCurrentCardIndex(0);
    setShowCompletion(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* هدر */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-4">
            {lang === 'fa' ? 'درس‌های چینی' : 'Chinese Lessons'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {lang === 'fa' 
              ? 'از مبتدی تا پیشرفته، مسیر یادگیری خود را انتخاب کنید'
              : 'From beginner to advanced, choose your learning path'
            }
          </p>
        </motion.div>

        {!openedLesson ? (
          /* لیست درس‌ها */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {LESSONS.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LessonCard 
                  lesson={lesson} 
                  lang={lang} 
                  onOpen={handleOpenLesson}
                  isCompleted={userProgress[lesson.id]}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* نمایش درس باز شده */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatePresence>
              {showCompletion ? (
                /* پیام تکمیل درس */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-12 text-white shadow-2xl"
                >
                  <div className="text-6xl mb-6">🎉</div>
                  <h2 className="text-3xl font-black mb-4">
                    {lang === 'fa' ? 'تبریک!' : 'Congratulations!'}
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    {lang === 'fa' 
                      ? `شما درس "${openedLesson.title[lang]}" را با موفقیت به پایان رساندید!`
                      : `You successfully completed the "${openedLesson.title[lang]}" lesson!`
                    }
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={closeLesson}
                      className="px-6 py-3 bg-white text-green-600 rounded-2xl font-bold hover:scale-105 transition-transform duration-300"
                    >
                      {lang === 'fa' ? 'بازگشت به درس‌ها' : 'Back to Lessons'}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCardIndex(0);
                        setShowCompletion(false);
                      }}
                      className="px-6 py-3 bg-white/20 text-white rounded-2xl font-bold hover:scale-105 transition-transform duration-300"
                    >
                      {lang === 'fa' ? 'مرور مجدد' : 'Review Again'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* نمایش کارت‌های درس */
                <div className="space-y-8">
                  {/* هدرس درس */}
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        onClick={closeLesson}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 mb-4"
                      >
                        <span>←</span>
                        {lang === 'fa' ? 'بازگشت به درس‌ها' : 'Back to lessons'}
                      </button>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                        {openedLesson.title[lang]}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {currentCardIndex + 1} / {openedLesson.items.length} - 
                        {lang === 'fa' ? ' پیشرفت درس' : ' Lesson progress'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => playAudio(openedLesson.items[currentCardIndex].cn)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors duration-300"
                      >
                        🔊
                      </button>
                      <button
                        onClick={handleNextCard}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors duration-300"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* نوار پیشرفت */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                      style={{ 
                        width: `${((currentCardIndex + 1) / openedLesson.items.length) * 100}%` 
                      }}
                    ></div>
                  </div>

                  {/* کارت آموزشی */}
                  <Flashcard 
                    item={openedLesson.items[currentCardIndex]} 
                    lang={lang} 
                    onPlay={playAudio}
                  />

                  {/* نکات آموزشی */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
                  >
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                      💡 {lang === 'fa' ? 'نکته آموزشی' : 'Learning Tip'}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {lang === 'fa'
                        ? 'سعی کنید هر کلمه را با صدای بلند تکرار کنید و با تصویر مرتبط کنید.'
                        : 'Try to repeat each word out loud and associate it with a mental image.'
                      }
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}