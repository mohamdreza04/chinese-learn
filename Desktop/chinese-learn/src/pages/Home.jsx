// Home.jsx - صفحه اصلی کاملاً redesign شده
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home({ lang }) {
  const features = [
    {
      icon: '🎯',
      title: { fa: 'یادگیری هوشمند', en: 'Smart Learning' },
      desc: { fa: 'سیستم هوشمند تطبیقی که با سطح شما تنظیم می‌شود', en: 'Adaptive AI that adjusts to your level' }
    },
    {
      icon: '🗣️',
      title: { fa: 'تلفظ دقیق', en: 'Accurate Pronunciation' },
      desc: { fa: 'تمرین تلفظ با تشخیص صدا و فیدبک فوری', en: 'Voice recognition with instant feedback' }
    },
    {
      icon: '📊',
      title: { fa: 'پیگیری پیشرفت', en: 'Progress Tracking' },
      desc: { fa: 'داشبورد پیشرفت دقیق با آمار و نمودار', en: 'Detailed dashboard with stats & charts' }
    },
    {
      icon: '🎮',
      title: { fa: 'یادگیری بازی‌گونه', en: 'Gamified Learning' },
      desc: { fa: 'کسب امتیاز، نشان و رقابت با دوستان', en: 'Earn points, badges & compete with friends' }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 p-[40px]  overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 rounded-[30px] via-transparent to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full px-6 py-3 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-gray-700  dark:text-gray-300">
                  {lang === 'fa' ? '🎉 ۱۰۰٪ رایگان - همیشه رایگان' : '🎉 100% Free - Forever Free'}
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black text-center leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-red-600 to-pink-600 dark:from-white dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {lang === 'fa' ? 'چینی را' : 'Learn Chinese'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-600 text-center to-pink-600 bg-clip-text text-transparent">
                  {lang === 'fa' ? 'آسان بیاموزید' : 'the Easy Way'}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 text-center dark:text-gray-300 leading-relaxed max-w-lg">
                {lang === 'fa' 
                  ? 'با متدهای علمی و بازی‌گونه، زبان چینی را در کوتاه‌ترین زمان یاد بگیرید. سیستم هوشمند ما با شما رشد می‌کند.'
                  : 'Learn Chinese fast with scientific, gamified methods. Our AI adapts as you grow.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/lessons" 
                  className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {lang === 'fa' ? 'شروع یادگیری رایگان' : 'Start Free Learning'}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                  </span>
                </Link>
                
                <Link 
                  to="/practice" 
                  className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-bold text-lg hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    {lang === 'fa' ? 'دموی تعاملی' : 'Interactive Demo'}
                    <span className="group-hover:scale-110 transition-transform duration-300">🎮</span>
                  </span>
                </Link>
              </div>

              {/* آمار */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: '50K+', label: { fa: 'کاربر فعال', en: 'Active Users' } },
                  { number: '95%', label: { fa: 'رضایت', en: 'Satisfaction' } },
                  { number: '4.9', label: { fa: 'امتیاز', en: 'Rating' } }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label[lang]}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {lang === 'fa' ? 'پرطرفدار' : 'POPULAR'}
                </div>
                
                <div className="text-white text-center space-y-6">
                  <div className="text-8xl font-black mb-4 animate-pulse">中</div>
                  <div className="space-y-3">
                    <p className="text-2xl font-black">{lang === 'fa' ? 'کارت‌های یادگیری تعاملی' : 'Interactive Learning Cards'}</p>
                    <p className="opacity-90 text-lg leading-relaxed">
                      {lang === 'fa' 
                        ? 'یادگیری با تکنولوژی هوش مصنوعی و بازی‌سازی'
                        : 'AI-powered learning with gamification'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-green-400 rounded-full opacity-40 animate-ping"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-6">
              {lang === 'fa' ? 'چرا ما متفاوتیم؟' : 'Why We Stand Out?'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {lang === 'fa'
                ? 'با تکنولوژی پیشرفته و متدهای علمی اثبات شده'
                : 'Advanced technology with proven scientific methods'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                  {feature.title[lang]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-black text-white mb-6">
              {lang === 'fa' ? 'آماده‌اید شروع کنید؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {lang === 'fa'
                ? 'همین حالا به جامعه میلیونی یادگیرندگان زبان چینی بپیوندید'
                : 'Join millions of Chinese learners worldwide today'
              }
            </p>
            <Link 
              to="/lessons" 
              className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {lang === 'fa' ? 'شروع سفر یادگیری' : 'Start Learning Journey'}
              <span className="text-xl">🎯</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}