import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, ShieldCheck, Zap, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { IconHelper } from './IconHelper';

export const Hero: React.FC = () => {
  const {
    lang,
    settings,
    services,
    setSelectedService,
    setIsServiceModalOpen,
    setActiveTab,
    setIsTrackingModalOpen
  } = useApp();

  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = query.trim()
    ? services.filter(s =>
        s.titleBn.toLowerCase().includes(query.toLowerCase()) ||
        s.titleEn.toLowerCase().includes(query.toLowerCase()) ||
        s.categoryBn.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
    setShowDropdown(false);
    setQuery('');
  };

  const popularChips = [
    { bn: 'এনআইডি কার্ড', en: 'NID Card' },
    { bn: 'ই-পাসপোর্ট', en: 'e-Passport' },
    { bn: 'ড্রাইভিং লাইসেন্স', en: 'Driving License' },
    { bn: 'ই-নামজারি', en: 'e-Namjari' },
    { bn: 'আয়কর রিটার্ন', en: 'Tax Return' },
    { bn: 'পুলিশ ক্লিয়ারেন্স', en: 'Police Clearance' }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative ambient glowing mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/15 dark:bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Trust Pill / Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{lang === 'bn' ? 'বাংলাদেশ ডিজিটাল নাগরিক সেবা ও সহায়তা পোর্টাল' : 'Govt & Digital Citizen Services BD'}</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.18]">
          {lang === 'bn' ? (
            <>
              সকল অনলাইন সরকারি ও নাগরিক সেবা{' '}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                এক ঠিকানায়
              </span>
            </>
          ) : (
            <>
              All Citizen & Govt Services at{' '}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                One Single Point
              </span>
            </>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {lang === 'bn' ? settings.heroSubheadlineBn : settings.heroSubheadline}
        </p>

        {/* AI-Style Smart Search Bar with Live Suggestions */}
        <div className="mt-8 max-w-2xl mx-auto relative" ref={dropdownRef}>
          <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-sky-500/5 p-2 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10 transition">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder={
                lang === 'bn'
                  ? 'কোন সেবাটি খুঁজছেন? টাইপ করুন যেমন: এনআইডি, পাসপোর্ট, নামজারি, ট্যাক্স...'
                  : 'Search any service e.g. NID, Passport, Tax Return, Driving License...'
              }
              className="w-full bg-transparent border-0 px-3 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-sm font-medium"
            />
            <button
              onClick={() => {
                setActiveTab('services');
              }}
              className="px-5 py-3 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
            >
              {lang === 'bn' ? 'খুঁজুন' : 'Search'}
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 text-left max-h-80 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                {lang === 'bn' ? 'স্মার্ট সেবা সাজেশন' : 'Suggested Services'}
              </div>
              {filteredSuggestions.map(service => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <IconHelper name={service.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition">
                        {lang === 'bn' ? service.titleBn : service.titleEn}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {lang === 'bn' ? service.categoryBn : service.category} • {lang === 'bn' ? service.deliveryTimeBn : service.deliveryTimeEn}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                      {lang === 'bn' ? service.priceBn : service.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular Quick Filter Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">
            {lang === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Trending:'}
          </span>
          {popularChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(lang === 'bn' ? chip.bn : chip.en);
                setShowDropdown(true);
              }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 transition shadow-2xs"
            >
              {lang === 'bn' ? chip.bn : chip.en}
            </button>
          ))}
        </div>

        {/* Dual Primary Call-To-Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('services')}
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-sky-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'সকল সেবা ব্রাউজ করুন' : 'Browse All Services'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsTrackingModalOpen(true)}
            className="px-7 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-800 font-extrabold text-sm shadow-sm transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{lang === 'bn' ? 'আবেদন ট্র্যাক করুন' : 'Track Existing Request'}</span>
          </button>
        </div>

        {/* Trust Stats Counters */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              ২৫,০০০+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              {lang === 'bn' ? 'সফল নাগরিক সেবা' : 'Happy Citizens'}
            </div>
          </div>

          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              ২০+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              {lang === 'bn' ? 'ডিজিটাল সরকারি সেবা' : 'Essential Services'}
            </div>
          </div>

          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              ৯৯.৮%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              {lang === 'bn' ? 'অনুমোদন ও সফলতার হার' : 'Success Rate'}
            </div>
          </div>

          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              ২৪/৭
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              {lang === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'Support Assistance'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
