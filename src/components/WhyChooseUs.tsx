import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Zap, Lock, DollarSign, Award, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { lang } = useApp();

  const features = [
    {
      icon: ShieldCheck,
      titleBn: '১০০% সরকারি নীতিমালা সম্মত',
      titleEn: '100% Legal & Govt Compliant',
      descBn: 'আমরা সরাসরি সরকারের সংশ্লিষ্ট পোর্টাল (EC, NBR, BRTA, Land Ministry) এর আনুষ্ঠানিক নিয়মানুযায়ী আবেদন সম্পন্ন করি।',
      descEn: 'We execute applications directly in accordance with authorized government ministerial portals.'
    },
    {
      icon: Zap,
      titleBn: 'দ্রুততম সুপারফাস্ট ডেলিভারি',
      titleEn: 'Superfast Turnaround Times',
      descBn: 'অভিজ্ঞ ডাটা এন্ট্রি টিম ও অটোমেটেড ট্র্যাকিং এর মাধ্যমে সর্বনিম্ন সময়ের মধ্যে কাজ সম্পন্ন করা হয়।',
      descEn: 'Experienced specialists and streamlined digital processing guarantee maximum speed.'
    },
    {
      icon: Lock,
      titleBn: '২৫৬-বিট ডেটা ও তথ্য নিরাপত্তা',
      titleEn: 'Bank-Grade Data Privacy',
      descBn: 'আপনার জাতীয় পরিচয়পত্র, ছবি এবং যাবতীয় সংবেদনশীল নথি সম্পূর্ণ এনক্রিপ্টেড এবং গোপনীয় থাকে।',
      descEn: 'All NID records, biometric files, and confidential documents remain fully encrypted.'
    },
    {
      icon: DollarSign,
      titleBn: 'স্বচ্ছ ও সাশ্রয়ী সরকারি ফি',
      titleEn: 'Transparent Fixed Pricing',
      descBn: 'সরকারি ট্রেজারি চালান এবং আমাদের নামমাত্র সার্ভিস চার্জের স্পষ্ট হিসাব, কোনো গোপন বা অতিরিক্ত চার্জ নেই।',
      descEn: 'Clear breakdown between official government treasury challans and transparent processing fees.'
    },
    {
      icon: Headphones,
      titleBn: '২৪/৭ হোয়াটসঅ্যাপ ও ফোন সহায়তা',
      titleEn: '24/7 Dedicated Support',
      descBn: 'আবেদন করার আগে ও পরে যেকোনো সমস্যায় তাৎক্ষণিক সমাধান পেতে আমাদের সার্বক্ষণিক হটলাইন সক্রিয়।',
      descEn: 'Instant resolution and status checks via direct WhatsApp and dedicated customer hotline.'
    },
    {
      icon: Award,
      titleBn: '২৫,০০০+ গ্রাহকের আস্থা',
      titleEn: '25,000+ Satisfied Citizens',
      descBn: 'সারাদেশের সকল জেলা এবং প্রবাসী ভাই-বোনদের বিশ্বস্ত নাগরিক সেবা প্রদানকারী ডিজিটাল প্ল্যাটফর্ম।',
      descEn: 'Trusted by citizens across all 64 districts of Bangladesh and expatriates living abroad.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {lang === 'bn' ? 'আমাদের বিশেষত্ব' : 'Why Choose ShebaPoint BD'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3">
            {lang === 'bn' ? 'কেন আমরাই আপনার সবচেয়ে বিশ্বস্ত পছন্দ?' : 'Why We Are Your Most Trusted Citizen Portal'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'bn'
              ? 'দালাল ও মধ্যস্বত্বভোগীদের হয়রানি থেকে মুক্ত হয়ে ঘরে বসেই পান নির্ভুল ডিজিটাল সমাধান।'
              : 'Freedom from offline hassles, middlemen, and confusion with verified digital processing.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-750 hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'bn' ? feat.titleBn : feat.titleEn}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lang === 'bn' ? feat.descBn : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
