import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CPANEL_FILES, CPanelFile } from '../utils/cpanelPackageFiles';
import { downloadCpanelZip } from '../utils/cpanelZipGenerator';
import {
  FolderDown,
  Download,
  FileCode,
  Copy,
  Check,
  Server,
  Database,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  Terminal,
  FileCheck
} from 'lucide-react';

export const CPanelPackageViewer: React.FC = () => {
  const { lang, showToast } = useApp();
  const [selectedFile, setSelectedFile] = useState<CPanelFile>(CPANEL_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    showToast(lang === 'bn' ? 'কোড ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await downloadCpanelZip();
      showToast(lang === 'bn' ? 'cPanel ZIP ফাইল সফলভাবে ডাউনলোড হয়েছে!' : 'cPanel deployment ZIP downloaded!');
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const cpanelSteps = [
    {
      step: '০১',
      titleBn: 'জিপ প্যাকেজটি ডাউনলোড করুন',
      titleEn: 'Download the Deployment ZIP',
      descBn: 'উপরের "Download cPanel ZIP" বাটনে ক্লিক করে প্রস্তুতকৃত `shebapoint_bd_cpanel.zip` ফাইলটি সংগ্রহ করুন।',
      descEn: 'Click the download button above to get the full zip containing PHP scripts, installer, and .htaccess.'
    },
    {
      step: '০২',
      titleBn: 'cPanel এ ডাটাবেজ ও ইউজার তৈরি করুন',
      titleEn: 'Create MySQL Database in cPanel',
      descBn: 'cPanel লগইন করে "MySQL® Database Wizard" এ যান। একটি ডাটাবেজ নাম দিন, ইউজার ও স্ট্রং পাসওয়ার্ড তৈরি করে "ALL PRIVILEGES" টিক দিন।',
      descEn: 'Log in to cPanel > MySQL Database Wizard. Create database, user, strong password and assign ALL PRIVILEGES.'
    },
    {
      step: '০৩',
      titleBn: 'File Manager এ আপলোড ও আনজিপ করুন',
      titleEn: 'Upload & Extract to public_html',
      descBn: 'cPanel > File Manager > `public_html` ফোল্ডারে যান। Upload এ ক্লিক করে জিপ ফাইলটি আপলোড করুন এবং Extract (আনজিপ) করুন।',
      descEn: 'Go to cPanel > File Manager > public_html. Upload the zip and extract all files directly inside.'
    },
    {
      step: '০৪',
      titleBn: 'config.php এ ডাটাবেজ তথ্য বসান',
      titleEn: 'Edit config.php Credentials',
      descBn: '`config.php` ফাইলটি Edit করুন। আপনার cPanel এর DB_NAME, DB_USER, DB_PASS ও SITE_URL সঠিক করে সেভ করুন।',
      descEn: 'Open config.php, fill in your exact DB_NAME, DB_USER, DB_PASS and SITE_URL, then save.'
    },
    {
      step: '০৫',
      titleBn: 'স্বয়ংক্রিয় ইনস্টলার চালান (install.php)',
      titleEn: 'Run Browser Installer (install.php)',
      descBn: 'ব্রাউজারে আপনার ওয়েবসাইটের লিংক ওপেন করুন: `yourdomain.com/install.php` এবং "Run Database Setup Now" বাটনে ক্লিক করুন।',
      descEn: 'Visit yourdomain.com/install.php in any browser and click the button to auto-seed all tables & 20 services.'
    },
    {
      step: '০৬',
      titleBn: 'নিরাপত্তা নিশ্চিত করতে install.php মুছুন',
      titleEn: 'SECURITY: Delete install.php',
      descBn: 'ইনস্টল সম্পন্ন হওয়ার সাথে সাথে cPanel File Manager থেকে `install.php` ফাইলটি ডিলিট করুন যাতে অন্য কেউ রান না করতে পারে।',
      descEn: 'CRITICAL SECURITY: Delete install.php immediately after installation from File Manager.'
    },
    {
      step: '০৭',
      titleBn: 'অ্যাডমিন প্যানেলে লগইন করুন',
      titleEn: 'Login to Admin Panel (/admin)',
      descBn: '`yourdomain.com/admin` এ যান। ডিফল্ট ইমেইল: `admin@shebapointbd.com` ও পাসওয়ার্ড: `Admin@123456` দিয়ে প্রবেশ করে পাসওয়ার্ড পরিবর্তন করুন।',
      descEn: 'Access /admin with default credentials: admin@shebapointbd.com / Admin@123456 and change your password.'
    },
    {
      step: '০৮',
      titleBn: 'ফ্রি SSL (AutoSSL) সক্রিয় করুন',
      titleEn: 'Enable Free SSL & HTTPS',
      descBn: 'cPanel > SSL/TLS Status এ গিয়ে "Run AutoSSL" দিন। আমাদের দেওয়া `.htaccess` ফাইল স্বয়ংক্রিয়ভাবে ভিজিটরদের HTTPS এ রিডাইরেক্ট করবে।',
      descEn: 'Run AutoSSL from cPanel. The included .htaccess automatically enforces secure HTTPS for all visitors.'
    }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>BDIX Shared Hosting & cPanel Ready (PHP 8.x + MySQL)</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {lang === 'bn' ? 'BDIX cPanel হোস্টিং ডেপ্লয়মেন্ট হাব' : 'BDIX cPanel Deployment Hub'}
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'এই প্ল্যাটফর্মটি সম্পূর্ণভাবে BDIX শেয়ার্ড হোস্টিং ও cPanel এর জন্য তৈরি। এতে কোনো Node.js বা টার্মিনাল কমান্ডের প্রয়োজন নেই। ১-ক্লিকে জিপ ডাউনলোড করুন, cPanel এ আপলোড করে install.php চালু করুন।'
                : 'Zero Node.js dependency, zero terminal access required. Pure PHP 8.x (PDO) + MySQL + Tailwind CSS. Download the ready-to-upload ZIP archive and extract directly into cPanel public_html.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/shebapoint_cpanel_bdix.zip"
                download="shebapoint_cpanel_bdix.zip"
                className="px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{lang === 'bn' ? 'সরাসরি জিপ ডাউনলোড করুন (১-ক্লিক)' : 'Download Ready cPanel ZIP (Direct)'}</span>
              </a>

              <button
                onClick={handleDownloadZip}
                disabled={downloading}
                className="px-6 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-600/30 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'জেনারেট হচ্ছে...' : (lang === 'bn' ? 'ব্রাউজার থেকে জেনারেট' : 'Re-Generate ZIP')}</span>
              </button>

              <a
                href="#steps-guide"
                className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition"
              >
                {lang === 'bn' ? 'ধাপগুলো দেখুন &darr;' : 'Step-by-Step Instructions &darr;'}
              </a>
            </div>
          </div>
        </div>

        {/* 8-Step Illustrated Instructions */}
        <div id="steps-guide" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400">cPanel Upload Guide</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {lang === 'bn' ? 'সহজ ৮ ধাপে ওয়েবসাইটে লাইভ করার গাইড' : '8 Easy Steps to Deploy on BDIX cPanel'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'bn' ? 'যেকোনো সাধারণ cPanel হোস্টিংয়ে মাত্র ৫ মিনিটে সম্পূর্ণ ওয়েবসাইট চালু করতে এই ধাপগুলো অনুসরণ করুন।' : 'Follow these numbered steps for quick 5-minute deployment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cpanelSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-amber-500">{s.step}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {lang === 'bn' ? s.titleBn : s.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'bn' ? s.descBn : s.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive File Explorer & Source Code Viewer */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-500" />
                <span>{lang === 'bn' ? 'সোর্স কোড ও ফাইল এক্সপ্লোরার' : 'Source Code & Package Files'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'প্যাকেজের প্রতিটি ফাইলের আসল সোর্স কোড সরাসরি দেখুন ও কপি করুন' : 'View and inspect production files included in the zip'}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কোড কপি করুন' : 'Copy Code')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* File List */}
            <div className="lg:col-span-1 border-r border-slate-200 dark:border-slate-800 p-4 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Package Root Files
              </span>
              {CPANEL_FILES.map(file => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{file.filename}</span>
                    <span className="text-[10px] uppercase opacity-75">{file.language}</span>
                  </button>
                );
              })}
            </div>

            {/* Code Content Display */}
            <div className="lg:col-span-3 p-6 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                <span>{selectedFile.filename}</span>
                <span>{selectedFile.description}</span>
              </div>
              <pre className="leading-relaxed">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Troubleshooting & FAQs */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-slate-300 text-xs space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>হোস্টিং সাধারণ সমস্যা ও সমাধান (Troubleshooting Guide)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1">
              <h4 className="font-bold text-sky-400">1. Database Connection Error</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                cPanel ইউজার তৈরি করে অবশ্যই "ALL PRIVILEGES" টিক দিতে হবে। cPanel অনেক সময় ডাটাবেজ নামের আগে ইউজারনেম প্রিফিক্স যোগ করে (যেমন: <code>cpaneluser_sheba</code>)। সেটি <code>config.php</code> এ সঠিকভাবে লিখুন।
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sky-400">2. 500 Internal Server Error</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                cPanel &rarr; "Select PHP Version" এ গিয়ে PHP 8.1 বা 8.2 সিলেক্ট করুন এবং <code>pdo_mysql</code> এক্সটেনশন চালু আছে কিনা নিশ্চিত করুন।
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sky-400">3. ফাইল পারমিশন (Permissions)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                ফোল্ডারগুলোর পারমিশন রাখুন <strong>755</strong> এবং ফাইলগুলোর পারমিশন রাখুন <strong>644</strong>। কোনো ফাইল বা ফোল্ডার কখনোই 777 করবেন না।
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
