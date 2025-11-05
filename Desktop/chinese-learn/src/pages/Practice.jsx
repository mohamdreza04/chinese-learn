import React, { useState } from 'react';
import LESSONS from '../data/lessons';
import Flashcard from '../components/Flashcard';

const allItems = LESSONS.flatMap(l => l.items);

export default function Practice({ lang }) {
  const [idx, setIdx] = useState(0);

  function play(text) {
    if (!window.speechSynthesis) return alert(lang === 'fa' ? 'تلفظ پشتیبانی نمی‌شود' : 'Speech not supported');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function next() {
    setIdx(i => (i + 1) % allItems.length);
  }
  function prev() {
    setIdx(i => (i - 1 + allItems.length) % allItems.length);
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{lang === 'fa' ? 'تمرین' : 'Practice'}</h2>
      <div className="max-w-xl mx-auto">
        <Flashcard item={allItems[idx]} lang={lang} onPlay={play} />
        <div className="mt-4 flex gap-3 justify-center">
          <button onClick={prev} className="px-4 py-2 rounded border">Prev</button>
          <button onClick={next} className="px-4 py-2 rounded border">Next</button>
        </div>
      </div>
    </section>
  );
}
