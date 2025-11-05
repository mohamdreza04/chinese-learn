// pages/Progress.jsx - صفحه پیگیری پیشرفت
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Progress({ lang, userProgress }) {
  const stats = {
    totalLessons: 24,
    completedLessons: 12,
    totalWords: 156,
    learnedWords: 78,
    streak: 15,
    level: 'مبتدی'
  };

  const achievements = [
    { icon: '🏆', name: { fa: 'شروع کننده', en: 'Starter' }, progress: 100 },
    { icon: '📚', name: { fa: 'کتاب خوان', en: 'Bookworm' }, progress: 65 },
    { icon: '🔥', name: { fa: 'مشتاق یادگیری', en: 'Eager Learner' }, progress: 45 },
    { icon: '💎', name: { fa: 'الماس درخشان', en: 'Shining Diamond' }, progress: 20 }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* هدر */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-4">
            {lang === 'fa' ? 'داشبورد پیشرفت' : 'Progress Dashboard'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {lang === 'fa' ? 'پیگیری موفقیت‌های خود در یادگیری زبان چینی' : 'Track your Chinese learning success'}
          </p>
        </motion.div>

        {/* آمار کلی */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: { fa: 'درس‌های تکمیل شده', en: 'Completed Lessons' },
              value: `${stats.completedLessons}/${stats.totalLessons}`,
              progress: (stats.completedLessons / stats.totalLessons) * 100,
              color: 'from-green-500 to-emerald-500'
            },
            {
              label: { fa: 'واژگان یادگرفته', en: 'Words Learned' },
              value: `${stats.learnedWords}/${stats.totalWords}`,
              progress: (stats.learnedWords / stats.totalWords) * 100,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              label: { fa: 'روز متوالی', en: 'Streak Days' },
              value: `${stats.streak} روز`,
              progress: Math.min((stats.streak / 30) * 100, 100),
              color: 'from-orange-500 to-red-500'
            },
            {
              label: { fa: 'سطح فعلی', en: 'Current Level' },
              value: stats.level,
              progress: 50,
              color: 'from-purple-500 to-pink-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">
                  {stat.label[lang]}
                </h3>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              
              <div className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                {stat.value}
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
              
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                {Math.round(stat.progress)}%
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* دستاوردها */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {lang === 'fa' ? 'دستاوردها' : 'Achievements'}
            </h2>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {achievement.name[lang]}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.progress}% {lang === 'fa' ? 'تکمیل' : 'complete'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* فعالیت‌های اخیر */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {lang === 'fa' ? 'فعالیت‌های اخیر' : 'Recent Activity'}
            </h2>
            
            <div className="space-y-4">
              {[
                { action: 'درس مقدماتی', time: '2 ساعت پیش', score: '95%' },
                { action: 'تمرین واژگان', time: '5 ساعت پیش', score: '88%' },
                { action: 'کارت‌های آموزشی', time: '1 روز پیش', score: '92%' },
                { action: 'امتحان هفتگی', time: '2 روز پیش', score: '85%' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-black text-green-500 text-lg">
                      {activity.score}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lang === 'fa' ? 'امتیاز' : 'Score'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link 
            to="/lessons" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            {lang === 'fa' ? 'ادامه یادگیری' : 'Continue Learning'}
            <span className="text-xl">🚀</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}