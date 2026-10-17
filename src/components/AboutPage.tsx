import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Users, HeartHandshake, MapPin, Phone, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, settings, setActiveTab } = useApp();

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {lang === 'bn' ? 'আমাদের পরিচিতি' : 'About ShebaPoint BD'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {lang === 'bn' ? 'ডিজিটাল বাংলাদেশ নাগরিক সেবা কেন্দ্র' : 'Pioneering Citizen Digital Services in Bangladesh'}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {lang === 'bn'
              ? 'আমরা একটি সম্পূর্ণ স্বাধীন, আধুনিক ও বিশ্বস্ত অনলাইন কনসালটেন্সি প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল সাধারণ নাগরিক ও প্রবাসী ভাই-বোনদেরকে দালাল ও অযথা দৌড়াদৌড়ির হাত থেকে রক্ষা করে স্বচ্ছতার সাথে সেবা পৌঁছে দেওয়া।'
              : 'Our mission is to eliminate confusion, middlemen, and bureaucratic bottlenecks by providing transparent online application and consulting services.'}
          </p>
        </div>

        {/* Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'নিরাপত্তা ও শতভাগ গোপনীয়তা' : 'Integrity & Security'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'নাগরিকদের যেকোনো সংবেদনশীল তথ্য ও ব্যক্তিগত কাগজপত্র সর্বাধুনিক এনক্রিপশনে সংরক্ষিত থাকে।'
                : 'Bank-grade encrypted systems safeguard citizen identity records and confidential applications.'}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'সরকারি বিধিবিধানের পূর্ণ অনুসরণ' : 'Regulatory Compliance'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'নির্বাচন কমিশন, বিআরটিএ, ই-পাসপোর্ট ও ভূমি মন্ত্রণালয়ের অনুমোদিত নিয়মে সেবা প্রক্রিয়া সম্পন্ন হয়।'
                : 'Every single filing adheres strictly to official ministerial guidelines and legal protocols.'}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'সাশ্রয়ী ও স্বচ্ছ মূল্য' : 'Transparent Pricing'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'কোনো প্রকার গোপন চার্জ ছাড়াই সরকার নির্ধারিত চালান ও সামান্য প্রসেসিং ফির স্পষ্ট তালিকা।'
                : 'No surprise charges or hidden markups. Complete breakdown provided prior to submission.'}
            </p>
          </div>
        </div>

        {/* Contact Information & Office Details */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch With Us'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'যেকোনো নাগরিক সেবা, ফি তথ্য বা সহযোগিতার জন্য আমাদের হটলাইনে কল করুন অথবা সরাসরি অফিসে আসুন।'
                : 'Have questions regarding documents, requirements, or turnaround times? Reach out directly.'}
            </p>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <p className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                <span>{lang === 'bn' ? settings.addressBn : settings.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                <span>{settings.phone}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                <span>{settings.email}</span>
              </p>
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/40 p-6 rounded-2xl border border-sky-100 dark:border-sky-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase">
                {lang === 'bn' ? 'সার্বক্ষণিক সহায়তা' : 'Direct Helpline'}
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {settings.phone}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {lang === 'bn' ? 'সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত আমাদের প্রতিনিধিরা কথা বলতে প্রস্তুত।' : 'Available 7 days a week for telephonic and WhatsApp consultations.'}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setActiveTab('services')}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                {lang === 'bn' ? 'সেবাসমূহ দেখুন' : 'Explore All Services'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
