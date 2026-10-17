import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { lang } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'সেবাপয়েন্ট বিডি কিভাবে সরকারি সেবা পেতে সাহায্য করে?',
      qEn: 'How does ShebaPoint BD assist with citizen services?',
      aBn: 'আমরা একটি অনুমোদিত ও পেশাদার ডিজিটাল কনসালটেন্সি প্ল্যাটফর্ম। সরকারের বিভিন্ন জটিল ও অনলাইন পোর্টাল যেমন- এনআইডি উইং, ই-পাসপোর্ট, বিআরটিএ, ভূমি মন্ত্রণালয়ের ফরম নির্ভুলভাবে পূরণ, ফি চালানের ব্যবস্থা এবং সময়মত কপি সরবরাহ করে নাগরিকের সময় ও শ্রম সাশ্রয় করি।',
      aEn: 'We provide structured end-to-end digital assistance. We accurately complete official portal applications, generate government treasury bank deposit slips, verify supporting document eligibility, and provide tracking updates.'
    },
    {
      qBn: 'আমার জাতীয় পরিচয়পত্র ও ব্যক্তিগত কাগজপত্র কি নিরাপদ?',
      qEn: 'Is my personal data and NID information secure?',
      aBn: 'হ্যাঁ, শতভাগ নিরাপদ। আমাদের প্ল্যাটফর্মে প্রেরিত সকল তথ্য ও ডকুমেন্ট ২৫৬-বিট এনক্রিপশনের মাধ্যমে সংরক্ষিত হয় এবং কাজ সম্পন্ন হওয়ার পর গ্রাহকের স্পষ্ট অনুমতি ছাড়া কোনো সংরক্ষিত কপি কোথাও শেয়ার করা হয় না।',
      aEn: 'Yes, 100% secure. All uploaded files and identity records are encrypted. We strictly observe data privacy standards and never sell or distribute citizen documentation.'
    },
    {
      qBn: 'আবেদনের বর্তমান অবস্থা আমি কিভাবে ট্র্যাক করব?',
      qEn: 'How can I track my submitted application?',
      aBn: 'যেকোনো সেবা আবেদন করার পর আপনি একটি ইউনিক ট্র্যাকিং আইডি পাবেন (যেমন: SHB-2026-8941)। ওয়েবসাইটের "আবেদন ট্র্যাকিং" মেন্যুতে এই নম্বরটি দিলেই বর্তমান অবস্থা (Pending, Processing, Completed) দেখতে পাবেন।',
      aEn: 'Every request receives an instant unique Tracking ID (e.g., SHB-2026-8941). Simply enter this code on our Live Tracker page to see the 4-stage timeline progress and admin updates.'
    },
    {
      qBn: 'সরকারি ফি ও সার্ভিস চার্জ কিভাবে পরিশোধ করা যায়?',
      qEn: 'What payment methods are supported for fees?',
      aBn: 'বিকাশ (bKash), নগদ (Nagad), রকেট (Rocket), সেলফিন, অথবা যেকোনো লোকাল ব্যাংকের অনলাইন গেটওয়ের মাধ্যমে খুব সহজেই ফি পরিশোধ করা যায়। পরিশোধের সাথে সাথে কম্পিউটার জেনারেটেড মানি রিসিট প্রদান করা হয়।',
      aEn: 'We support all major Bangladesh Mobile Financial Services including bKash, Nagad, Rocket, Cellfin, and bank transfers with instant printable invoice receipts.'
    },
    {
      qBn: 'প্রবাসীরা কি বিদেশ থেকে এই সেবাগুলো গ্রহণ করতে পারবেন?',
      qEn: 'Can expatriates (Probashi) apply from overseas?',
      aBn: 'হ্যাঁ, অবশ্যই। শত শত প্রবাসী ভাই-বোনেরা মধ্যপ্রাচ্য, ইউরোপ ও আমেরিকা থেকে অনলাইনে যোগাযোগ করে পাসপোর্ট রিনিউয়াল, ভোটার নিবন্ধন, জমি খারিজ ও জন্ম নিবন্ধনের কাজ করিয়ে নিচ্ছেন।',
      aEn: 'Yes! Non-resident Bangladeshis (NRBs) worldwide utilize our platform for e-Passport renewals, power of attorney filings, land mutation, and family birth registrations.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {lang === 'bn' ? 'সচরাচর জিজ্ঞাসা' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3">
            {lang === 'bn' ? 'সাধারণ প্রশ্ন ও উত্তর' : 'Common Inquiries & Clarifications'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'bn'
              ? 'আমাদের সেবা সংক্রান্ত যে কোনো প্রশ্নের স্পষ্ট এবং বিস্তারিত সমাধান।'
              : 'Clear answers to help you navigate our citizen services and procedures.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-3 animate-in fade-in">
                    {lang === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
