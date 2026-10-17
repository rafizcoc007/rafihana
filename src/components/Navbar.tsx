import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  Search,
  Bell,
  User,
  Shield,
  Menu,
  X,
  Phone,
  FileCheck2,
  FolderDown,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLang,
    isDark,
    toggleTheme,
    activeTab,
    setActiveTab,
    currentUser,
    isAdmin,
    logoutUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    settings,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    setIsTrackingModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notice Ticker */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 text-white text-xs py-1.5 px-4 overflow-hidden relative shadow-inner z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 animate-pulse">
              {lang === 'bn' ? 'জরুরি নোটিশ' : 'NOTICE'}
            </span>
            <p className="text-sky-50 text-[11px] sm:text-xs truncate font-medium">
              {lang === 'bn' ? settings.noticeTickerBn : settings.noticeTicker}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-sky-100 shrink-0 font-medium">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-sky-300" /> {settings.phone}
            </span>
            <span className="text-sky-300">|</span>
            <span>{lang === 'bn' ? 'সকাল ৯টা - রাত ১০টা' : '9 AM - 10 PM Everyday'}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform duration-200">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                  {lang === 'bn' ? settings.brandNameBn : settings.brandName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  BD
                </span>
              </div>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
                {lang === 'bn' ? settings.taglineBn : settings.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${activeTab === 'home' ? 'text-sky-600 dark:text-sky-400 font-bold' : ''}`}
            >
              {lang === 'bn' ? 'হোম' : 'Home'}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${activeTab === 'services' ? 'text-sky-600 dark:text-sky-400 font-bold' : ''}`}
            >
              {lang === 'bn' ? 'সকল সেবা' : 'All Services'}
            </button>

            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {lang === 'bn' ? 'আবেদন ট্র্যাকিং' : 'Track Request'}
            </button>

            <button
              onClick={() => handleNavClick('cpanel-package')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
                activeTab === 'cpanel-package'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500'
              }`}
            >
              <FolderDown className="w-4 h-4 text-amber-500" />
              <span>{lang === 'bn' ? 'BDIX cPanel প্যাকেজ' : 'cPanel Package'}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${activeTab === 'about' ? 'text-sky-600 dark:text-sky-400 font-bold' : ''}`}
            >
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-sky-500 transition-colors shadow-sm"
              title="Toggle Language"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Dark/Light Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {lang === 'bn' ? 'বিজ্ঞপ্তিসমূহ' : 'Notifications'}
                    </span>
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {lang === 'bn' ? 'সব মুছুন' : 'Clear all'}
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">
                        {lang === 'bn' ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No new notifications'}
                      </p>
                    ) : (
                      notifications.map(item => (
                        <div
                          key={item.id}
                          onClick={() => markNotificationAsRead(item.id)}
                          className={`p-3 text-xs transition cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl mt-1 ${
                            !item.read ? 'bg-sky-50/60 dark:bg-sky-950/40 font-semibold' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-sky-600 dark:text-sky-400 font-bold">
                              {lang === 'bn' ? item.titleBn : item.titleEn}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                          </div>
                          <p className="mt-1 text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
                            {lang === 'bn' ? item.messageBn : item.messageEn}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-sky-500 transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition mt-1"
                    >
                      {lang === 'bn' ? 'গ্রাহক ড্যাশবোর্ড' : 'Customer Dashboard'}
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/50 rounded-xl transition flex items-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      {lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
                    </button>

                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition flex items-center gap-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white dark:bg-slate-800 dark:hover:bg-sky-600 text-xs font-bold transition shadow-sm"
              >
                {lang === 'bn' ? 'লগইন' : 'Login'}
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left text-sm font-bold text-slate-800 dark:text-slate-200 py-1"
            >
              {lang === 'bn' ? 'হোম পেজ' : 'Home'}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="block w-full text-left text-sm font-bold text-slate-800 dark:text-slate-200 py-1"
            >
              {lang === 'bn' ? 'সকল সেবা তালিকা (২০+)' : 'All 20+ Services'}
            </button>
            <button
              onClick={() => {
                setIsTrackingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-emerald-600 dark:text-emerald-400 py-1 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {lang === 'bn' ? 'আবেদন লাইভ ট্র্যাকিং' : 'Live Request Tracker'}
            </button>
            <button
              onClick={() => handleNavClick('cpanel-package')}
              className="block w-full text-left text-sm font-bold text-amber-500 py-1 flex items-center gap-2"
            >
              <FolderDown className="w-4 h-4" />
              {lang === 'bn' ? 'BDIX cPanel পিএইচপি প্যাকেজ' : 'BDIX cPanel PHP Package'}
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="block w-full text-left text-sm font-bold text-slate-800 dark:text-slate-200 py-1"
            >
              {lang === 'bn' ? 'গ্রাহক ড্যাশবোর্ড' : 'Customer Dashboard'}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="block w-full text-left text-sm font-bold text-sky-600 dark:text-sky-400 py-1"
            >
              {lang === 'bn' ? 'অ্যাডমিন প্যানেল (/admin)' : 'Admin Panel (/admin)'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left text-sm font-bold text-slate-800 dark:text-slate-200 py-1"
            >
              {lang === 'bn' ? 'আমাদের সম্পর্কে ও নীতিমালা' : 'About & Policies'}
            </button>
          </div>
        )}
      </header>
    </>
  );
};
