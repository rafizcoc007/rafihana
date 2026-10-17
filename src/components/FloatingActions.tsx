import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowUp, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { settings, lang } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    lang === 'bn'
      ? 'আসসালামু আলাইকুম সেবাপয়েন্ট বিডি, আমার নাগরিক সেবার ব্যাপারে পরামর্শ প্রয়োজন।'
      : 'Hello ShebaPoint BD, I would like to inquire regarding citizen services.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition transform hover:-translate-y-1"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Call Hotline */}
      <a
        href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
        className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-600/30 flex items-center justify-center transition transform hover:-translate-y-1 hover:scale-105"
        title="হটলাইনে কল করুন"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition transform hover:-translate-y-1 hover:scale-105 group"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-xl pointer-events-none">
          {lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}
        </span>
      </a>
    </div>
  );
};
