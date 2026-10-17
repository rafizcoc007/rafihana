import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, Phone, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const {
    lang,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    showToast
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      if (!email.trim() || !password.trim()) return;
      loginUser(email, email.includes('admin') ? 'admin' : 'customer');
      setIsAuthModalOpen(false);
    } else if (authModalMode === 'register') {
      if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) return;
      loginUser(email, 'customer');
      showToast(lang === 'bn' ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Account registered successfully!');
      setIsAuthModalOpen(false);
    } else {
      showToast(lang === 'bn' ? 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!' : 'Password reset link sent to your email!');
      setAuthModalMode('login');
    }
  };

  const handleDemoCustomer = () => {
    loginUser('tanvir.bd@gmail.com', 'customer');
    setIsAuthModalOpen(false);
  };

  const handleDemoAdmin = () => {
    loginUser('admin@shebapointbd.com', 'admin');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {authModalMode === 'login'
              ? (lang === 'bn' ? 'গ্রাহক অ্যাকাউন্টে লগইন' : 'Customer Account Login')
              : authModalMode === 'register'
              ? (lang === 'bn' ? 'নতুন অ্যাকাউন্ট নিবন্ধন' : 'Create Free Account')
              : (lang === 'bn' ? 'পাসওয়ার্ড পুনরুদ্ধার' : 'Reset Password')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authModalMode === 'login'
              ? (lang === 'bn' ? 'আপনার পূর্ববর্তী আবেদন এবং মানি রিসিট দেখতে প্রবেশ করুন' : 'Access your request history and invoices')
              : (lang === 'bn' ? 'নাগরিক সেবা গ্রহণের আধুনিক ওয়ান-স্টপ প্ল্যাটফর্ম' : 'Join Bangladesh citizen digital services platform')}
          </p>
        </div>

        {/* Demo Fast Buttons */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
            {lang === 'bn' ? '⚡ দ্রুত পরীক্ষার জন্য ডেমো লগইন:' : '⚡ Quick Test Logins:'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="py-1.5 px-3 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold hover:bg-sky-200 transition text-[11px]"
            >
              👤 {lang === 'bn' ? 'গ্রাহক ডেমো' : 'Customer Demo'}
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-1.5 px-3 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-200 transition text-[11px]"
            >
              🛡️ {lang === 'bn' ? 'অ্যাডমিন ডেমো' : 'Admin Demo'}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authModalMode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="মোঃ নাম..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          {authModalMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'bn' ? 'পাসওয়ার্ড *' : 'Password *'}
                </label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('forgot')}
                    className="text-[11px] text-sky-600 hover:underline"
                  >
                    {lang === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-extrabold rounded-xl shadow-md transition text-xs mt-2"
          >
            {authModalMode === 'login'
              ? (lang === 'bn' ? 'লগইন করুন &rarr;' : 'Sign In &rarr;')
              : authModalMode === 'register'
              ? (lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন &rarr;' : 'Register Account &rarr;')
              : (lang === 'bn' ? 'রিসেট লিংক পাঠান &rarr;' : 'Send Reset Link &rarr;')}
          </button>
        </form>

        {/* Footer switch mode */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          {authModalMode === 'login' ? (
            <p>
              {lang === 'bn' ? 'নতুন গ্রাহক?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="text-sky-600 font-bold hover:underline"
              >
                {lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Sign Up'}
              </button>
            </p>
          ) : (
            <p>
              {lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-sky-600 font-bold hover:underline"
              >
                {lang === 'bn' ? 'লগইন করুন' : 'Sign In'}
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
