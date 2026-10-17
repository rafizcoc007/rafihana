import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PrintableReceiptModal: React.FC = () => {
  const { lang, receiptRequest, setReceiptRequest, settings } = useApp();

  if (!receiptRequest) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl my-8">
        
        {/* Action Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {lang === 'bn' ? 'অফিসিয়াল ডিজিটাল মানি রিসিট' : 'Official Money Receipt'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রিন্ট / PDF সংরক্ষণ' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={() => setReceiptRequest(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Container */}
        <div id="printable-receipt" className="space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-black flex items-center justify-center text-xs">
                  SP
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {settings.brandNameBn}
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-semibold">{settings.brandName} - Citizen Portal</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">{settings.addressBn}</p>
              <p className="text-[11px] text-slate-500">📞 {settings.phone} | ✉️ {settings.email}</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded uppercase tracking-wider">
                MONEY RECEIPT
              </span>
              <p className="font-mono text-sm font-black text-sky-600 mt-2">
                {receiptRequest.trackingId}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{receiptRequest.createdAt}</p>
            </div>
          </div>

          {/* Customer & Request Meta */}
          <div className="grid grid-cols-2 gap-6 py-4 border-b border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">
                {lang === 'bn' ? 'গ্রাহকের বিবরণ' : 'Customer Details'}
              </span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">{receiptRequest.customerName}</p>
              <p className="text-slate-600 mt-0.5">মোবাইল: {receiptRequest.customerPhone}</p>
              <p className="text-slate-600">জেলা: {receiptRequest.district}</p>
              {receiptRequest.customerNid && (
                <p className="text-slate-600 font-mono text-[11px]">NID: {receiptRequest.customerNid}</p>
              )}
            </div>

            <div className="text-right">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">
                {lang === 'bn' ? 'আবেদনের অবস্থা' : 'Application Status'}
              </span>
              <span className="inline-block mt-1 px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase">
                {receiptRequest.status}
              </span>
              <p className="text-slate-500 text-[11px] mt-2">
                পেমেন্ট স্ট্যাটাস: <strong>{receiptRequest.paymentStatus === 'paid' ? 'পরিশোধিত (PAID)' : 'বকেয়া (UNPAID)'}</strong>
              </p>
            </div>
          </div>

          {/* Service Line Items */}
          <table className="w-full text-left text-xs my-4">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px]">
                <th className="py-2">{lang === 'bn' ? 'সেবার বিবরণ' : 'Service Description'}</th>
                <th className="py-2 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Qty'}</th>
                <th className="py-2 text-right">{lang === 'bn' ? 'মূল্য (টাকা)' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3">
                  <span className="font-bold text-slate-800 text-sm block">
                    {receiptRequest.serviceNameBn}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {receiptRequest.serviceNameEn} • অনলাইন আবেদন ও যাচাই ফি
                  </span>
                </td>
                <td className="py-3 text-center text-slate-600">১</td>
                <td className="py-3 text-right font-black text-slate-900 text-sm">
                  {receiptRequest.amount}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 font-black text-sm">
                <td colSpan={2} className="py-3 text-right">
                  {lang === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}
                </td>
                <td className="py-3 text-right text-sky-600 text-base">
                  {receiptRequest.amount}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Barcode Simulator & Terms */}
          <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
            <div className="space-y-1 text-[10px] text-slate-400 max-w-xs">
              <p>* এটি একটি স্বয়ংক্রিয় কম্পিউটার জেনারেটেড রিসিট।</p>
              <p>* আবেদনের অগ্রগতি ও সনদ ডাউনলোডের জন্য ট্র্যাকিং নম্বরটি প্রদর্শন করুন।</p>
              <div className="pt-2 font-mono text-[9px] text-slate-300 tracking-widest">
                ||| | ||||| || |||| ||| ||||||| | |||
              </div>
            </div>

            <div className="text-center">
              <div className="w-28 h-10 border-b border-dashed border-slate-400 mx-auto"></div>
              <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                অনুমোদিত স্বাক্ষর ও অফিসিয়াল সিল
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
