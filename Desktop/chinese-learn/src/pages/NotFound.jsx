import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound({ lang }) {
  return (
    <div className="py-20 text-center">
      <h2 className="text-3xl font-bold">{lang === 'fa' ? 'صفحه پیدا نشد' : 'Page not found'}</h2>
      <p className="mt-4 opacity-70">{lang === 'fa' ? 'آدرس اشتباه است یا صفحه حذف شده.' : 'Wrong URL or page removed.'}</p>
      <Link to="/" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl">{lang === 'fa' ? 'بازگشت به خانه' : 'Back home'}</Link>
    </div>
  );
}
