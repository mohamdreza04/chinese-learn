import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App.jsx";
import './index.css';

// ثبت Service Worker برای PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // مسیر صحیح برای GitHub Pages یا هر زیردامنه
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('✅ Service Worker ثبت شد:', registration);
      })
      .catch((error) => {
        console.error('❌ ثبت Service Worker شکست خورد:', error);
      });
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/chinese-learn">
    <App />
  </BrowserRouter>
);
