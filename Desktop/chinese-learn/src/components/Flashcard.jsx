// Flashcard.jsx - کامپوننت کارت‌های تعاملی
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Flashcard({ item, lang, onPlay }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="w-full h-80 perspective-1000 cursor-pointer" onClick={handleFlip}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col justify-between h-full text-white">
            <div className="text-center space-y-6">
              <motion.div 
                className="text-6xl font-black mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.cn}
              </motion.div>
              <div className="text-xl font-medium opacity-90">{item.pinyin}</div>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(item.cn);
                }}
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 backdrop-blur"
              >
                <span className="text-2xl">🔊</span>
              </motion.button>
            </div>
            
            <div className="text-center text-sm opacity-70">
              {lang === 'fa' ? '👆 کلیک کنید برای دیدن معنی' : '👆 Click to see meaning'}
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col justify-center items-center h-full text-white text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black"
            >
              {lang === 'fa' ? item.fa : item.en}
            </motion.div>
            <div className="text-lg opacity-90">{item.pinyin}</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm opacity-70"
            >
              {lang === 'fa' ? '👆 کلیک برای بازگشت' : '👆 Click to return'}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}