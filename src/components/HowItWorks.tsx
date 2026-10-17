import React from 'react';
import { useApp } from '../context/AppContext';
import { MousePointerClick, UploadCloud, Ticket, CheckCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { lang, setActiveTab } = useApp();

  const steps = [
    {
      num: '01',
      icon: MousePointerClick,
      titleBn: 'সেবা নির্বাচন করুন',
      titleEn: 'Choose Your Service',
      descBn: 'আমাদের ২০+ ডিজিটাল সেবার তালিকা থেকে আপনার কাঙ্ক্ষিত সেবাটি বেছে নিন এবং প্রয়োজনীয় দলিলের তালিকা দেখে নিন।',
      descEn: 'Browse our catalog of 20+ citizen services and review the required documents checklist.'
    },
    {
      num: '02',
      icon: UploadCloud,
      titleBn: 'কাগজপত্র ও তথ্য জমা দিন',
      titleEn: 'Submit Details & Docs',
      descBn: 'সহজ অনলাইন ফর্মে আপনার নাম, মোবাইল এবং সংশ্লিষ্ট দলিলের ছবি বা স্ক্যান কপি নিরাপদে আপলোড করুন।',
      descEn: 'Fill in your details and securely upload clear photos or scanned copies of supporting papers.'
    },
    {
      num: '03',
      icon: Ticket,
      titleBn: 'ট্র্যাকিং আইডি ও রিসিট পান',
      titleEn: 'Instant Tracking ID',
      descBn: 'আবেদন দাখিলের সাথে সাথে ইউনিক ট্র্যাকিং নম্বর ও প্রিন্টযোগ্য অফিসিয়াল মানি রিসিট সংগ্রহ করুন।',
      descEn: 'Instantly receive a unique Tracking ID along with an official printable money receipt.'
    },
    {
      num: '04',
      icon: CheckCheck,
      titleBn: 'অনুমোদিত সনদ সংগ্রহ করুন',
      titleEn: 'Receive Verified Delivery',
      descBn: 'আমাদের এক্সপার্ট টিম সরকারি সিস্টেমে কাজ সম্পন্ন করে আপনার চূড়ান্ত সনদ বা ডিজিটাল কপি সরবরাহ করবে।',
      descEn: 'Our team completes the official processing and delivers your finalized certificate/slip.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {lang === 'bn' ? 'সহজ ও নিরাপদ প্রক্রিয়া' : 'Step-by-Step Flow'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3">
            {lang === 'bn' ? 'সহজ ৪ ধাপে ঘরে বসেই সেবা নিন' : 'How It Works in 4 Simple Steps'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'bn'
              ? 'সরকারি অফিসে দীর্ঘ লাইনে না দাঁড়িয়ে ঝামেলামুক্তভাবে সেবা গ্রহণের আধুনিক পদ্ধতি'
              : 'Skip the queues and tedious lines with our fully automated citizen assistance system.'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="relative bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-sky-500/25 group-hover:text-sky-500 transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {lang === 'bn' ? st.titleBn : st.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {lang === 'bn' ? st.descBn : st.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  <span>{lang === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left">
            <h4 className="text-lg font-bold">
              {lang === 'bn' ? 'কোনো সেবার ব্যাপারে পরামর্শ প্রয়োজন?' : 'Need guidance on your specific service?'}
            </h4>
            <p className="text-xs text-sky-100 mt-0.5">
              {lang === 'bn' ? 'আমাদের হেল্পলাইন এবং হোয়াটসঅ্যাপ প্রতিনিধিরা আপনাকে সাহায্য করতে প্রস্তুত।' : 'Our support agents are active 7 days a week on WhatsApp and phone.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="px-6 py-3 rounded-xl bg-white text-sky-800 hover:bg-sky-50 font-extrabold text-xs shadow-md transition shrink-0"
          >
            {lang === 'bn' ? 'সেবাসমূহ দেখুন' : 'Explore All Services'}
          </button>
        </div>

      </div>
    </section>
  );
};
