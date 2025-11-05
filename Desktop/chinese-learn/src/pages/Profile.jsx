// pages/Profile.jsx - صفحه پروفایل کاربر
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Profile({ lang }) {
  const [user, setUser] = useState({
    name: 'کاربر مهمان',
    email: 'guest@example.com',
    level: 'مبتدی',
    joinDate: '1402/10/15',
    dailyGoal: 30
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* هدر */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-4">
            {lang === 'fa' ? 'پروفایل من' : 'My Profile'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {lang === 'fa' ? 'مدیریت حساب کاربری و تنظیمات شخصی' : 'Manage your account and personal settings'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* اطلاعات کاربر */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                {lang === 'fa' ? 'اطلاعات شخصی' : 'Personal Information'}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                {isEditing ? (lang === 'fa' ? 'ذخیره' : 'Save') : (lang === 'fa' ? 'ویرایش' : 'Edit')}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'fa' ? 'نام کاربری' : 'Username'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'fa' ? 'ایمیل' : 'Email'}
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white">
                    {user.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'fa' ? 'هدف روزانه' : 'Daily Goal'}
                </label>
                {isEditing ? (
                  <select
                    value={user.dailyGoal}
                    onChange={(e) => setUser({...user, dailyGoal: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value={15}>15 دقیقه</option>
                    <option value={30}>30 دقیقه</option>
                    <option value={45}>45 دقیقه</option>
                    <option value={60}>60 دقیقه</option>
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white">
                    {user.dailyGoal} {lang === 'fa' ? 'دقیقه' : 'minutes'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* کارت خلاصه */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* کارت سطح کاربر */}
            <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-2xl">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">中</div>
                <h3 className="text-xl font-black mb-2">{user.name}</h3>
                <div className="text-lg opacity-90">{user.level}</div>
                <div className="text-sm opacity-80 mt-2">
                  {lang === 'fa' ? `عضو از ${user.joinDate}` : `Member since ${user.joinDate}`}
                </div>
              </div>
            </div>

            {/* کارت هدف روزانه */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">
                {lang === 'fa' ? 'هدف روزانه' : 'Daily Goal'}
              </h3>
              
              <div className="text-center">
                <div className="text-3xl font-black text-red-500 mb-2">
                  {user.dailyGoal}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {lang === 'fa' ? 'دقیقه' : 'minutes'}
                </div>
              </div>

              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: '65%' }}
                ></div>
              </div>
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                65% {lang === 'fa' ? 'تکمیل شده' : 'completed'}
              </div>
            </div>

            {/* کارت آمار سریع */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">
                {lang === 'fa' ? 'آمار سریع' : 'Quick Stats'}
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: { fa: 'روز متوالی', en: 'Streak' }, value: '15', icon: '🔥' },
                  { label: { fa: 'درس‌ها', en: 'Lessons' }, value: '12/24', icon: '📚' },
                  { label: { fa: 'واژگان', en: 'Words' }, value: '78/156', icon: '💎' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {stat.label[lang]}
                      </span>
                    </div>
                    <span className="font-black text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}