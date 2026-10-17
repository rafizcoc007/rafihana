import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle,
  Copy,
  Check,
  FileUp,
  Receipt,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const ServiceRequestModal: React.FC = () => {
  const {
    lang,
    isRequestModalOpen,
    setIsRequestModalOpen,
    targetServiceForRequest,
    createRequest,
    currentUser,
    handleTrackRequest,
    setReceiptRequest
  } = useApp();

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    customerPhone: currentUser?.phone || '',
    customerEmail: currentUser?.email || '',
    customerNid: '',
    district: currentUser?.district || 'ঢাকা',
    notes: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [createdRequestData, setCreatedRequestData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isRequestModalOpen || !targetServiceForRequest) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      return;
    }

    const newReq = createRequest({
      serviceId: targetServiceForRequest.id,
      serviceNameEn: targetServiceForRequest.titleEn,
      serviceNameBn: targetServiceForRequest.titleBn,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      customerNid: formData.customerNid,
      district: formData.district,
      notes: formData.notes,
      amount: lang === 'bn' ? targetServiceForRequest.priceBn : targetServiceForRequest.price,
      documentsUploaded: uploadedFiles.length > 0 ? uploadedFiles : ['nid_or_birth_cert.pdf']
    });

    setCreatedRequestData(newReq);
  };

  const handleCopyTrackingId = () => {
    if (createdRequestData?.trackingId) {
      navigator.clipboard.writeText(createdRequestData.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleClose = () => {
    setIsRequestModalOpen(false);
    setCreatedRequestData(null);
    setUploadedFiles([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {createdRequestData ? (
          /* SUCCESS SCREEN */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Request Submitted Successfully!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'bn'
                  ? 'আপনার আবেদনটির কাজ শুরু হয়েছে। লাইভ অগ্রগতি জানতে ট্র্যাকিং আইডিটি সংরক্ষণ করুন।'
                  : 'We have received your application. Save your Tracking ID to monitor live progress.'}
              </p>
            </div>

            {/* Tracking ID Badge */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border-2 border-dashed border-sky-400 dark:border-sky-500 max-w-sm mx-auto flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {lang === 'bn' ? 'ইউনিক ট্র্যাকিং আইডি' : 'Unique Tracking ID'}
                </span>
                <span className="font-mono text-xl font-black text-sky-600 dark:text-sky-400 tracking-wider">
                  {createdRequestData.trackingId}
                </span>
              </div>
              <button
                onClick={handleCopyTrackingId}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500 transition flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
              </button>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  handleTrackRequest(createdRequestData.trackingId);
                }}
                className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{lang === 'bn' ? 'লাইভ ট্র্যাকিং দেখুন' : 'View Live Tracking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setReceiptRequest(createdRequestData);
                  handleClose();
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center gap-2"
              >
                <Receipt className="w-4 h-4 text-sky-500" />
                <span>{lang === 'bn' ? 'মানি রিসিট / ইনভয়েস' : 'View Invoice'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* REQUEST FORM */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                {lang === 'bn' ? targetServiceForRequest.categoryBn : targetServiceForRequest.category}
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {lang === 'bn' ? targetServiceForRequest.titleBn : targetServiceForRequest.titleEn}
              </h2>
              <div className="flex items-center gap-3 text-slate-400 mt-1">
                <span>ফি: <strong className="text-sky-600 dark:text-sky-400">{lang === 'bn' ? targetServiceForRequest.priceBn : targetServiceForRequest.price}</strong></span>
                <span>•</span>
                <span>ডেলিভারি: <strong className="text-slate-700 dark:text-slate-300">{lang === 'bn' ? targetServiceForRequest.deliveryTimeBn : targetServiceForRequest.deliveryTimeEn}</strong></span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="যেমন: মোঃ তানভীর হাসান"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="user@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'এনআইডি বা ফর্ম নম্বর' : 'NID or Form Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.customerNid}
                    onChange={e => setFormData({ ...formData, customerNid: e.target.value })}
                    placeholder="১০ বা ১৭ ডিজিট"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'জেলা *' : 'District *'}
                  </label>
                  <select
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="ঢাকা">ঢাকা (Dhaka)</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম (Chattogram)</option>
                    <option value="রাজশাহী">রাজশাহী (Rajshahi)</option>
                    <option value="খুলনা">খুলনা (Khulna)</option>
                    <option value="বরিশাল">বরিশাল (Barishal)</option>
                    <option value="সিলেট">সিলেট (Sylhet)</option>
                    <option value="রংপুর">রংপুর (Rangpur)</option>
                    <option value="ময়মনসিংহ">ময়মনসিংহ (Mymensingh)</option>
                    <option value="কুমিল্লা">কুমিল্লা (Cumilla)</option>
                    <option value="বগুড়া">বগুড়া (Bogura)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'প্রয়োজনীয় তথ্য / বিশেষ নির্দেশনা' : 'Notes / Additional Instructions'}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={lang === 'bn' ? 'যেমন: নামের বানান ভুল, পিতা/মাতার নাম সংশোধন ইত্যাদি...' : 'Specific details or error notes...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              {/* Simulated Document Upload */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের ছবি বা স্ক্যান ফাইল আপলোড' : 'Upload Documents / Photos'}
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-sky-500 transition cursor-pointer relative bg-slate-50 dark:bg-slate-800/40">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileUp className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-xs">
                    {lang === 'bn' ? 'ফাইল সিলেক্ট করতে ক্লিক করুন' : 'Click or drop files here'}
                  </p>
                  <p className="text-[10px] text-slate-400">JPG, PNG, PDF (Max 10MB)</p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {uploadedFiles.map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono">
                        📎 {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/30 transition text-xs mt-2"
            >
              {lang === 'bn' ? 'আবেদন সম্পন্ন করুন 🚀' : 'Confirm & Submit Application 🚀'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
