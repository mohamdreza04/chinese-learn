// Navbar.jsx - نوار ناوبری ریسپانسیو و حرفه‌ای
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ dark, setDark, lang, setLang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: { fa: "خانه", en: "Home" }, icon: "🏠" },
    { path: "/lessons", label: { fa: "درس‌ها", en: "Lessons" }, icon: "📚" },
    { path: "/practice", label: { fa: "تمرین", en: "Practice" }, icon: "🎮" },
    { path: "/progress", label: { fa: "پیشرفت", en: "Progress" }, icon: "📊" },
    { path: "/profile", label: { fa: "پروفایل", en: "Profile" }, icon: "👤" },
  ];

  return (
    <nav className="sticky top-0  w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg bg-black">
                <img
                  src={`${process.env.PUBLIC_URL}/chainese.png`}
                  alt="Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"
              ></motion.div>
            </motion.div>
            <div className="text-left">
              <div className="font-black text-xl sm:text-2xl bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent">
                ChineseMaster
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium -mt-1">
                {lang === "fa"
                  ? "یادگیری هوشمند چینی"
                  : "Smart Chinese Learning"}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative px-5 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label[lang]}
              </NavLink>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang((l) => (l === "fa" ? "en" : "fa"))}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center font-black shadow-lg hover:shadow-xl transition-all"
            >
              {lang === "fa" ? "EN" : "فا"}
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDark((d) => !d)}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg"
            >
              {dark ? "☀️" : "🌙"}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg"
            >
              <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl mt-2 p-4 shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[70vh] overflow-y-auto"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300
                      ${
                        isActive
                          ? "text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label[lang]}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
