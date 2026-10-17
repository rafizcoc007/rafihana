<?php
require_once __DIR__ . '/config.php';

$lang = isset($_GET['lang']) && $_GET['lang'] === 'en' ? 'en' : 'bn';
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $lang === 'bn' ? SITE_NAME_BN . ' - ডিজিটাল নাগরিক সেবা পোর্টাল' : SITE_NAME . ' - Citizen Services Portal' ?></title>
    <meta name="description" content="Online Citizen Services for Bangladesh - NID, Passport, BRTA, Land Mutation, Tax & Legal Services.">
    <!-- Google Fonts Hind Siliguri + Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Tailwind CSS via CDN for Zero-Build cPanel -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Hind Siliguri"', 'Inter', 'system-ui', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f0f9ff',
                            500: '#0284c7',
                            600: '#0369a1',
                            700: '#075985',
                        }
                    }
                }
            }
        }
    </script>
    <script>
        // Check dark mode
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors duration-200 min-h-screen flex flex-col">

    <!-- Top Notice Ticker -->
    <div class="bg-sky-600 text-white text-xs py-1.5 px-4 overflow-hidden relative font-medium">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                <span class="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase animate-pulse">
                    <?= $lang === 'bn' ? 'জরুরি নোটিশ' : 'NOTICE' ?>
                </span>
                <span class="text-sky-50">
                    <?= $lang === 'bn' ? 'ভোটার তালিকা হালনাগাদ ও ই-পাসপোর্ট দ্রুত স্লটের আবেদন চলছে। ঘরে বসেই সকল সরকারি ফরম পূরণে সাহায্য নিন।' : 'NID correction & e-Passport fast appointments open. Get expert assistance from home.' ?>
                </span>
            </div>
            <div class="hidden md:flex items-center gap-4 text-[11px] text-sky-100 shrink-0">
                <span>📞 <?= CONTACT_PHONE ?></span>
                <span>⏱️ <?= $lang === 'bn' ? 'সকাল ৯টা - রাত ১০টা' : '9 AM - 10 PM' ?></span>
            </div>
        </div>
    </div>

    <!-- Navigation Header -->
    <header class="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <!-- Brand Logo -->
            <a href="index.php" class="flex items-center gap-3 group">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div>
                    <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                        <?= $lang === 'bn' ? SITE_NAME_BN : SITE_NAME ?>
                    </span>
                    <span class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <?= $lang === 'bn' ? 'অনলাইন নাগরিক সেবা কেন্দ্র' : 'Citizen Digital Services BD' ?>
                    </span>
                </div>
            </a>

            <!-- Nav Links -->
            <nav class="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <a href="index.php" class="hover:text-sky-600 dark:hover:text-sky-400 transition"><?= $lang === 'bn' ? 'হোম' : 'Home' ?></a>
                <a href="services.php" class="hover:text-sky-600 dark:hover:text-sky-400 transition"><?= $lang === 'bn' ? 'সকল সেবা' : 'All Services' ?></a>
                <a href="track.php" class="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <?= $lang === 'bn' ? 'আবেদন ট্র্যাকিং' : 'Track Request' ?>
                </a>
                <a href="about.php" class="hover:text-sky-600 dark:hover:text-sky-400 transition"><?= $lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' ?></a>
                <a href="contact.php" class="hover:text-sky-600 dark:hover:text-sky-400 transition"><?= $lang === 'bn' ? 'যোগাযোগ' : 'Contact' ?></a>
            </nav>

            <!-- Right Controls -->
            <div class="flex items-center gap-2 sm:gap-3">
                <!-- Lang Toggle -->
                <a href="?lang=<?= $lang === 'bn' ? 'en' : 'bn' ?>" class="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-sky-500 transition">
                    <?= $lang === 'bn' ? 'English' : 'বাংলা' ?>
                </a>

                <!-- Dark Mode Toggle Button -->
                <button id="theme-toggle" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 transition">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>

                <?php if (isLoggedIn()): ?>
                    <a href="dashboard.php" class="px-3.5 py-2 text-xs font-semibold rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                        <?= $lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard' ?>
                    </a>
                <?php else: ?>
                    <a href="login.php" class="hidden sm:inline-flex px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:border-sky-500 transition">
                        <?= $lang === 'bn' ? 'লগইন' : 'Login' ?>
                    </a>
                    <a href="track.php" class="px-3.5 py-2 text-xs font-semibold rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition">
                        <?= $lang === 'bn' ? 'ট্র্যাকিং' : 'Track ID' ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </header>
