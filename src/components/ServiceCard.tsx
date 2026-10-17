import React from 'react';
import { Service } from '../types';
import { useApp } from '../context/AppContext';
import { IconHelper } from './IconHelper';
import { Clock, ArrowUpRight, CheckCircle2, FileText } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { lang, setSelectedService, setIsServiceModalOpen, openRequestModal } = useApp();

  const handleOpenDetails = () => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleQuickApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    openRequestModal(service);
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-sky-500/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Meta: Category + Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
            {lang === 'bn' ? service.categoryBn : service.category}
          </span>
          {service.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wide">
              {lang === 'bn' ? service.badgeBn || service.badge : service.badge}
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500/10 to-cyan-500/10 dark:from-sky-500/20 dark:to-cyan-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 group-hover:scale-110 transition-transform">
            <IconHelper name={service.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
              {lang === 'bn' ? service.titleBn : service.titleEn}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mt-0.5">
              <Clock className="w-3 h-3 text-sky-500" />
              <span>{lang === 'bn' ? service.deliveryTimeBn : service.deliveryTimeEn}</span>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {lang === 'bn' ? service.shortDescBn : service.shortDescEn}
        </p>

        {/* Checklist Snippet */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            {lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের নমুনা:' : 'Required Docs Sample:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(lang === 'bn' ? service.requiredDocumentsBn : service.requiredDocumentsEn)
              .slice(0, 2)
              .map((doc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 truncate max-w-[200px]"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{doc}</span>
                </span>
              ))}
            {service.requiredDocumentsEn.length > 2 && (
              <span className="text-[10px] text-sky-600 font-bold self-center">
                +{service.requiredDocumentsEn.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">
            {lang === 'bn' ? 'ফি / সার্ভিস চার্জ' : 'Service Fee'}
          </span>
          <span className="text-base font-extrabold text-sky-600 dark:text-sky-400">
            {lang === 'bn' ? service.priceBn : service.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenDetails}
            className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={lang === 'bn' ? 'বিস্তারিত ও চেকলিস্ট দেখুন' : 'View checklist'}
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={handleQuickApply}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white dark:bg-slate-800 dark:hover:bg-sky-600 text-xs font-bold transition shadow-sm flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'আবেদন করুন' : 'Apply'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
