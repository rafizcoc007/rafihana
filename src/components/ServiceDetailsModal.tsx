import React from 'react';
import { useApp } from '../context/AppContext';
import { IconHelper } from './IconHelper';
import { X, Clock, CheckCircle2, FileCheck, ArrowRight, MessageCircle } from 'lucide-react';

export const ServiceDetailsModal: React.FC = () => {
  const {
    lang,
    selectedService,
    isServiceModalOpen,
    setIsServiceModalOpen,
    openRequestModal,
    settings
  } = useApp();

  if (!isServiceModalOpen || !selectedService) return null;

  const docs = lang === 'bn' ? selectedService.requiredDocumentsBn : selectedService.requiredDocumentsEn;
  const steps = lang === 'bn' ? selectedService.stepsBn : selectedService.stepsEn;

  const handleApply = () => {
    setIsServiceModalOpen(false);
    openRequestModal(selectedService);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ShebaPoint BD, I would like to know more about: ${selectedService.titleEn} (${selectedService.titleBn}).`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsServiceModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
            <IconHelper name={selectedService.icon} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                {lang === 'bn' ? selectedService.categoryBn : selectedService.category}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                {lang === 'bn' ? selectedService.deliveryTimeBn : selectedService.deliveryTimeEn}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {lang === 'bn' ? selectedService.titleBn : selectedService.titleEn}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? selectedService.titleEn : selectedService.titleBn}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 text-xs text-slate-600 dark:text-slate-300">
          
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'সেবার বিস্তারিত বিবরণ' : 'Service Overview'}
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {lang === 'bn' ? selectedService.fullDescBn : selectedService.fullDescEn}
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-sky-900 dark:text-sky-200">
                {lang === 'bn' ? 'নির্ধারিত সার্ভিস ফি:' : 'Total Service Fee:'}
              </span>
              <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 mt-0.5">
                {lang === 'bn' ? selectedService.priceBn : selectedService.price}
              </div>
            </div>
            {selectedService.officialFee && (
              <div className="text-left sm:text-right text-[11px] text-slate-500 dark:text-slate-400">
                <p>সরকারি চালান / চালানের ফি: <strong className="text-slate-800 dark:text-slate-200">{selectedService.officialFee}</strong></p>
                <p>আমাদের প্রসেসিং চার্জ: <strong className="text-slate-800 dark:text-slate-200">{selectedService.serviceCharge}</strong></p>
              </div>
            )}
          </div>

          {/* Document Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের চেকলিস্ট (যা সঙ্গে রাখবেন)' : 'Required Document Checklist'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step process */}
          {steps && steps.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {lang === 'bn' ? 'আবেদন ও ডেলিভারি প্রক্রিয়া' : 'Step-by-Step Procedure'}
              </h4>
              <div className="space-y-2">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition text-xs font-bold flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে পরামর্শ নিন' : 'WhatsApp Inquiry'}</span>
          </a>

          <button
            onClick={handleApply}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-sky-600/30 transition flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'এই সেবার জন্য আবেদন করুন' : 'Apply For This Service'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
