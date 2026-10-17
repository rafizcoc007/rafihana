import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileCheck2, Shield, Phone, Mail, MapPin, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, settings, setActiveTab, setIsTrackingModalOpen } = useApp();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-black shadow-md">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  {lang === 'bn' ? settings.brandNameBn : settings.brandName}
                </span>
                <span className="block text-[10px] text-sky-400 font-semibold">
                  Citizen Services Platform BD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ডিজিটাল সেবা ও অনলাইন পোর্টালসমূহে সাধারণ নাগরিকদের আবেদন প্রক্রিয়া সহজ ও ঝামেলামুক্ত করতে আমাদের এই বিশ্বস্ত ওয়ান-স্টপ পোর্টাল।'
                : 'Empowering citizens with rapid, verified assistance across national ID, passports, transport licensing, tax return submissions, and real estate mutations.'}
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>BDIX Superfast Cloud Optimized</span>
            </div>
          </div>

          {/* Col 2: Top Citizen Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'শীর্ষ নাগরিক সেবাসমূহ' : 'Featured Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  এনআইডি কার্ড সংশোধন ও রি-ইস্যু
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  ১৭ ডিজিট ডিজিটাল জন্ম নিবন্ধন
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  ই-পাসপোর্ট আবেদন ও বায়োমেট্রিক স্লট
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  বিআরটিএ ড্রাইভিং লাইসেন্স ও ট্যাক্স টোকেন
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  ই-নামজারি ও জমির খতিয়ান/পর্চা
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-sky-400 transition text-left">
                  ই-টিন সার্টিফিকেট ও অনলাইন আয়কর রিটার্ন
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsTrackingModalOpen(true)} className="hover:text-sky-400 transition flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{lang === 'bn' ? 'আবেদন লাইভ ট্র্যাক করুন' : 'Track Request Online'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cpanel-package')} className="hover:text-sky-400 transition text-left text-amber-400 font-semibold">
                  {lang === 'bn' ? 'BDIX cPanel প্যাকেজ ডাউনলোড' : 'Download cPanel Package'}
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModal('privacy')} className="hover:text-sky-400 transition text-left">
                  {lang === 'bn' ? 'প্রাইভেসি ও তথ্য সুরক্ষা নীতি' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModal('terms')} className="hover:text-sky-400 transition text-left">
                  {lang === 'bn' ? 'শর্তাবলী ও নিয়মাবলী' : 'Terms & Conditions'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-sky-400 transition flex items-center gap-1 text-left">
                  <Shield className="w-3 h-3 text-sky-400" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন পোর্টাল (/admin)' : 'Admin Portal (/admin)'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'অফিস ও যোগাযোগ' : 'Contact Support'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? settings.addressBn : settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{settings.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{settings.email}</span>
              </p>
              <div className="pt-2 text-[11px] text-slate-500">
                {lang === 'bn' ? 'সাপ্তাহিক কোনো বন্ধ নেই। সার্বক্ষণিক খোলা।' : 'Open 7 days a week (9:00 AM - 10:00 PM)'}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800/80 py-6 text-center text-[11px] text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; {new Date().getFullYear()} {settings.brandNameBn} ({settings.brandName}). All rights reserved.</p>
            <p className="text-slate-500">
              {lang === 'bn' ? 'BDIX cPanel হোস্টিং এর জন্য প্রস্তুতকৃত সংস্করণ' : 'BDIX Shared cPanel Optimized Framework'}
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy / Terms Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {legalModal === 'privacy'
                  ? (lang === 'bn' ? 'প্রাইভেসি ও তথ্য সুরক্ষা নীতিমালা' : 'Privacy Policy')
                  : (lang === 'bn' ? 'শর্তাবলী ও নিয়মাবলী' : 'Terms & Conditions')}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {legalModal === 'privacy' ? (
              <div className="space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                <p><strong>১. তথ্য সংগ্রহ:</strong> গ্রাহকের সেবা প্রদানের প্রয়োজনে নাম, মোবাইল নম্বর, এনআইডি এবং সংশ্লিষ্ট নথিপত্র সংগ্রহ করা হয়।</p>
                <p><strong>২. ডেটা নিরাপত্তা:</strong> সকল ডকুমেন্ট নিরাপদ এনক্রিপ্টেড ডাটাবেজে রাখা হয় এবং কোনো তৃতীয় পক্ষের নিকট বিপণন বা বিক্রির উদ্দেশ্যে হস্তান্তর করা হয় না।</p>
                <p><strong>৩. ব্যবহারের পরিধি:</strong> সংগৃহীত তথ্য শুধুমাত্র সরকারের নির্ধারিত পোর্টালে ফর্ম পূরণ ও যাচাইয়ের জন্য ব্যবহৃত হয়।</p>
              </div>
            ) : (
              <div className="space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                <p><strong>১. সেবা গ্রহণের শর্ত:</strong> গ্রাহককে সঠিক ও বৈধ তথ্য প্রদান করতে হবে। কোনো অসত্য বা ভুয়া তথ্য প্রদান করলে সেবা বাতিল হতে পারে।</p>
                <p><strong>২. সরকারি অনুমোদন:</strong> যেকোনো সরকারি সনদ বা সংশোধনের চূড়ান্ত অনুমোদন সংশ্লিষ্ট সরকারি কর্তৃপক্ষ দ্বারা নির্ধারিত হয়।</p>
                <p><strong>৩. ফি ও চালানের নীতি:</strong> সরকারি ফি পরিশোধের পর চালান কপি গ্রাহককে সরবরাহ করা হবে।</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
