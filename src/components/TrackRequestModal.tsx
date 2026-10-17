import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Search,
  Receipt,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const TrackRequestModal: React.FC = () => {
  const {
    lang,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    trackedRequest,
    handleTrackRequest,
    setReceiptRequest,
    settings
  } = useApp();

  const [inputVal, setInputVal] = useState(trackedRequest?.trackingId || '');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleTrackRequest(inputVal);
    setHasSearched(true);
  };

  const handleClose = () => {
    setIsTrackingModalOpen(false);
    setHasSearched(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {lang === 'bn' ? 'আবেদন লাইভ ট্র্যাকিং' : 'Live Request Tracker'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'bn' ? 'আপনার ইউনিক ট্র্যাকিং নম্বরটি প্রদান করে বর্তমান অগ্রগতি জানুন' : 'Enter your unique Tracking ID to see live progress'}
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="যেমন: SHB-2026-8941"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
          >
            {lang === 'bn' ? 'ট্র্যাক করুন' : 'Track Status'}
          </button>
        </form>

        {/* Sample ID Clickable */}
        <p className="text-[11px] text-slate-400 mb-6 text-center">
          {lang === 'bn' ? 'ডেমো আইডি ট্রাই করুন:' : 'Try Demo ID:'}{' '}
          <button
            type="button"
            onClick={() => {
              setInputVal('SHB-2026-8941');
              handleTrackRequest('SHB-2026-8941');
              setHasSearched(true);
            }}
            className="font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline"
          >
            SHB-2026-8941
          </button>
        </p>

        {/* Search Result */}
        {trackedRequest ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-850 space-y-6 animate-in zoom-in-95">
            
            {/* Header with Tracking ID & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  {lang === 'bn' ? 'ট্র্যাকিং নম্বর' : 'Tracking ID'}
                </span>
                <h3 className="font-mono text-xl font-black text-slate-900 dark:text-white">
                  {trackedRequest.trackingId}
                </h3>
                <span className="text-[10px] text-slate-400">{trackedRequest.createdAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                    trackedRequest.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : trackedRequest.status === 'processing'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {trackedRequest.status}
                </span>

                <button
                  onClick={() => {
                    setReceiptRequest(trackedRequest);
                    setIsTrackingModalOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-600 shadow-sm flex items-center gap-1.5 hover:border-sky-500 transition"
                >
                  <Receipt className="w-3.5 h-3.5 text-sky-500" />
                  <span>{lang === 'bn' ? 'রিসিট' : 'Receipt'}</span>
                </button>
              </div>
            </div>

            {/* 4-Stage Timeline */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-4">
                {lang === 'bn' ? 'লাইভ অগ্রগতি টাইমলাইন' : 'Live Timeline Progress'}
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-bold">
                {/* Stage 1 */}
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[11px]">
                    ✓
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400">{lang === 'bn' ? 'দাখিলকৃত' : 'Submitted'}</span>
                </div>

                {/* Stage 2 */}
                <div className="space-y-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[11px] ${
                      ['processing', 'completed'].includes(trackedRequest.status)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {['processing', 'completed'].includes(trackedRequest.status) ? '✓' : '2'}
                  </div>
                  <span
                    className={
                      ['processing', 'completed'].includes(trackedRequest.status)
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400'
                    }
                  >
                    {lang === 'bn' ? 'যাচাইকরণ' : 'Verified'}
                  </span>
                </div>

                {/* Stage 3 */}
                <div className="space-y-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[11px] ${
                      trackedRequest.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : trackedRequest.status === 'processing'
                        ? 'bg-sky-500 text-white animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {trackedRequest.status === 'completed' ? '✓' : '3'}
                  </div>
                  <span
                    className={
                      ['processing', 'completed'].includes(trackedRequest.status)
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-slate-400'
                    }
                  >
                    {lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing'}
                  </span>
                </div>

                {/* Stage 4 */}
                <div className="space-y-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[11px] ${
                      trackedRequest.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {trackedRequest.status === 'completed' ? '✓' : '4'}
                  </div>
                  <span
                    className={
                      trackedRequest.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400'
                    }
                  >
                    {lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Remarks Notice */}
            {trackedRequest.adminRemarks && (
              <div className="p-3.5 bg-sky-50/80 dark:bg-sky-950/40 border-l-4 border-sky-500 rounded-r-xl text-xs space-y-1">
                <span className="font-bold text-sky-900 dark:text-sky-200 block">
                  {lang === 'bn' ? 'অফিসিয়াল স্ট্যাটাস ও নোট:' : 'Official Note / Update:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{trackedRequest.adminRemarks}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'সেবা:' : 'Service:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'bn' ? trackedRequest.serviceNameBn : trackedRequest.serviceNameEn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'গ্রাহক:' : 'Customer:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{trackedRequest.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'মোবাইল:' : 'Phone:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{trackedRequest.customerPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'ফি:' : 'Fee:'}</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{trackedRequest.amount}</span>
              </div>
            </div>

            {/* Direct WhatsApp Assistance */}
            <div className="text-center pt-2">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  `Hello, I would like an update regarding my Tracking ID: ${trackedRequest.trackingId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'এই আবেদনের জন্য হোয়াটসঅ্যাপে কথা বলুন' : 'Chat with officer on WhatsApp'}</span>
              </a>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-red-500 text-xs rounded-2xl text-center">
            ❌ {lang === 'bn' ? 'এই ট্র্যাকিং নম্বরের কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'No request found for this tracking ID. Please verify and retry.'}
          </div>
        ) : null}

      </div>
    </div>
  );
};
