import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Receipt,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    lang,
    currentUser,
    requests,
    setActiveTab,
    openRequestModal,
    handleTrackRequest,
    setReceiptRequest,
    showToast
  } = useApp();

  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubject, setSupportSubject] = useState('');

  if (!currentUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? 'লগইন আবশ্যক' : 'Login Required'}
          </h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            {lang === 'bn' ? 'গ্রাহক ড্যাশবোর্ড ও অর্ডার হিস্ট্রি দেখতে অনুগ্রহ করে লগইন করুন।' : 'Please sign in to view your dashboard and orders.'}
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition shadow-md"
          >
            {lang === 'bn' ? 'হোম পেজে ফিরুন' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // Filter requests belonging to this customer (or match by email/phone/all in demo)
  const myRequests = requests.filter(
    r =>
      r.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      r.customerPhone === currentUser.phone ||
      currentUser.role === 'customer' // in demo mode show all sample customer orders
  );

  const pendingCount = myRequests.filter(r => r.status === 'pending').length;
  const processingCount = myRequests.filter(r => r.status === 'processing').length;
  const completedCount = myRequests.filter(r => r.status === 'completed').length;

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSubject.trim() || !supportMessage.trim()) return;
    showToast(lang === 'bn' ? 'আপনার মেসেজ সাপোর্ট টিমের কাছে সফলভাবে পাঠানো হয়েছে!' : 'Support message sent successfully!');
    setSupportSubject('');
    setSupportMessage('');
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header Card */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                {lang === 'bn' ? 'গ্রাহক অ্যাকাউন্ট' : 'Customer Account'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-0.5">{currentUser.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-sky-100 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentUser.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {currentUser.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {currentUser.district || 'ঢাকা'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openRequestModal()}
            className="px-5 py-3 rounded-xl bg-white text-sky-900 font-extrabold text-xs shadow-lg hover:bg-sky-50 transition flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-sky-600" />
            <span>{lang === 'bn' ? 'নতুন সেবা আবেদন' : 'Apply New Service'}</span>
          </button>
        </div>

        {/* Stats Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              {lang === 'bn' ? 'সর্বমোট আবেদন' : 'Total Requests'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {myRequests.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-semibold text-amber-500 uppercase">
              {lang === 'bn' ? 'নতুন / অপেক্ষমান' : 'Pending'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
              {pendingCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-semibold text-sky-500 uppercase">
              {lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-sky-500 mt-1">
              {processingCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-semibold text-emerald-500 uppercase">
              {lang === 'bn' ? 'সম্পন্ন / ডেলিভারি' : 'Completed'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 mt-1">
              {completedCount}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'bn' ? 'আমার আবেদন ও সেবাসমূহ' : 'My Requests & Services'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'প্রতিটি আবেদনের বর্তমান অবস্থা ও মানি রিসিট ডাউনলোড করুন' : 'Track live status and download printable invoices'}
              </p>
            </div>
          </div>

          {myRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {lang === 'bn' ? 'আপনার কোনো আবেদন পাওয়া যায়নি।' : 'No service requests found.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3">{lang === 'bn' ? 'ট্র্যাকিং আইডি' : 'Tracking ID'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'সেবার নাম' : 'Service Name'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'দাখিলের তারিখ' : 'Date'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'ফি' : 'Fee'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                    <th className="pb-3 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {myRequests.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="py-4 font-mono font-bold text-sky-600 dark:text-sky-400">
                        {r.trackingId}
                      </td>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">
                        {lang === 'bn' ? r.serviceNameBn : r.serviceNameEn}
                      </td>
                      <td className="py-4 text-slate-400">{r.createdAt}</td>
                      <td className="py-4 font-bold text-slate-900 dark:text-white">{r.amount}</td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                            r.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : r.status === 'processing'
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => handleTrackRequest(r.trackingId)}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 font-bold text-[11px] transition"
                        >
                          {lang === 'bn' ? 'ট্র্যাক' : 'Track'}
                        </button>
                        <button
                          onClick={() => setReceiptRequest(r)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'ইনভয়েস' : 'Receipt'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer Support Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'bn' ? 'সাপোর্ট মেসেজ পাঠান' : 'Submit Support Inquiry'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {lang === 'bn' ? 'আপনার আবেদনের কোনো আপডেট বা অতিরিক্ত তথ্যের প্রয়োজন হলে জানান।' : 'Message our customer desk regarding your requests.'}
            </p>

            <form onSubmit={handleSendSupport} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'বিষয় / Subject' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={supportSubject}
                  onChange={e => setSupportSubject(e.target.value)}
                  placeholder="যেমন: এনআইডি আবেদনের জরুরি ডেলিভারি..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'মেসেজ বিবরণ' : 'Message Details'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                  placeholder="আপনার বক্তব্য বিস্তারিত লিখুন..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Quick Notice / Tips */}
          <div className="bg-sky-50 dark:bg-sky-950/30 rounded-3xl p-6 sm:p-8 border border-sky-100 dark:border-sky-900/40 text-xs text-slate-600 dark:text-slate-300 space-y-4">
            <h3 className="text-base font-bold text-sky-900 dark:text-sky-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <span>{lang === 'bn' ? 'গ্রাহক সহায়তা নির্দেশিকা' : 'Customer Guidelines'}</span>
            </h3>
            <p className="leading-relaxed">
              {lang === 'bn'
                ? 'আপনার আবেদনের প্রতিটি ধাপে আমাদের অফিসাররা নথি যাচাই করেন। আবেদন দাখিলের পর ২ ঘণ্টার মধ্যে আমাদের হটলাইন টিম থেকে নিশ্চিতকরণ কল বা এসএমএস পাবেন।'
                : 'Our verified officers validate documents at each step. Expect a confirmation call or SMS within 2 hours of submission.'}
            </p>
            <div className="pt-2 border-t border-sky-200 dark:border-sky-900 space-y-1 font-medium">
              <p>📞 হেল্পলাইন: <strong>+880 1712-345678</strong></p>
              <p>💬 হোয়াটসঅ্যাপ: <strong>+880 1712-345678</strong></p>
              <p>⏱️ কার্যকাল: সকাল ৯:০০ টা থেকে রাত ১০:০০ টা (প্রতিদিন)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
