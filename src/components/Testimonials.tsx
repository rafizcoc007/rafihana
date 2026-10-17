import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { lang, reviews } = useApp();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
            {lang === 'bn' ? 'গ্রাহকদের মতামত' : 'Real Customer Reviews'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3">
            {lang === 'bn' ? 'সারা দেশের নাগরিকদের আস্থার প্রতিক্রিয়া' : 'What Citizens Say Across Bangladesh'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'bn'
              ? 'আমাদের দ্রুত ও নির্ভরযোগ্য সেবা গ্রহণ করে যারা উপকৃত হয়েছেন তাদের কিছু মূল্যবান মতামত।'
              : 'Genuine feedback from verified citizens who used our digital assistance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Service */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300">
                    {rev.serviceName}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700 mb-2" />

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{lang === 'bn' ? rev.commentBn : rev.commentEn}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  </h4>
                  <span className="text-[11px] text-slate-400">{rev.district}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
