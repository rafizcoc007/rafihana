import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from './ServiceCard';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { lang, services, selectedCategory, setSelectedCategory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'All', bn: 'সকল সেবা (২০+)', en: 'All Services (20+)' },
    { key: 'Identity & Civil', bn: 'পরিচয় ও নাগরিক সনদ', en: 'Identity & Civil' },
    { key: 'Transport & Travel', bn: 'পরিবহন ও ভ্রমণ সেবা', en: 'Transport & Travel' },
    { key: 'Tax & Business', bn: 'কর ও ব্যবসা সেবা', en: 'Tax & Business' },
    { key: 'Land & Legal', bn: 'ভূমি ও আইনি সেবা', en: 'Land & Legal' },
    { key: 'Career & Education', bn: 'ক্যারিয়ার ও শিক্ষা সেবা', en: 'Career & Education' },
    { key: 'Digital & Utilities', bn: 'ডিজিটাল ও ইউটিলিটি সেবা', en: 'Digital & Utilities' }
  ];

  const filteredServices = services.filter(s => {
    const matchesCategory =
      selectedCategory === 'All' ||
      s.category === selectedCategory ||
      s.categoryBn === selectedCategory;

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      s.titleBn.toLowerCase().includes(term) ||
      s.titleEn.toLowerCase().includes(term) ||
      s.shortDescBn.toLowerCase().includes(term) ||
      s.shortDescEn.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.categoryBn.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {lang === 'bn' ? 'অনলাইন সেবা ডিরেক্টরি' : 'Service Catalog Directory'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {lang === 'bn' ? 'সকল ডিজিটাল নাগরিক সেবা তালিকা' : 'Comprehensive Bangladesh Citizen Services'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lang === 'bn'
              ? 'আপনার প্রয়োজনীয় সেবা বাছাই করুন, দলিলের তালিকা দেখুন এবং ঘরে বসেই আবেদন ফর্ম পূরণ করুন।'
              : 'Explore government and digital solutions with transparent fee structures and tracking.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-sky-500">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={lang === 'bn' ? 'সেবার নাম দিয়ে ফিল্টার করুন (যেমন: এনআইডি, পাসপোর্ট, ড্রাইভিং...)' : 'Search services by name or keyword...'}
              className="w-full bg-transparent border-0 px-3 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-sm font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500'
                  }`}
                >
                  {lang === 'bn' ? cat.bn : cat.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>
            {lang === 'bn'
              ? `মোট ${filteredServices.length}টি সেবা প্রদর্শিত হচ্ছে`
              : `Showing ${filteredServices.length} citizen services`}
          </span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-sky-600 font-bold hover:underline"
            >
              {lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
            </button>
          )}
        </div>

        {/* Services Bento Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-400 text-sm">
              {lang === 'bn' ? 'কোনো সেবা খুঁজে পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে চেষ্টা করুন।' : 'No services found matching your query.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
            >
              {lang === 'bn' ? 'সকল সেবা প্রদর্শন করুন' : 'Show All Services'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
