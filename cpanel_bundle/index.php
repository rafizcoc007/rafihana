<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

// Fetch services
$stmt = $pdo->query("SELECT * FROM services ORDER BY is_popular DESC, id ASC LIMIT 20");
$services = $stmt->fetchAll();
?>

<!-- HERO SECTION -->
<section class="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
    <!-- Decorative background glow mesh -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/15 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-6">
            <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <?= $lang === 'bn' ? 'বাংলাদেশ বিশ্বস্ত অনলাইন নাগরিক সেবা প্ল্যাটফর্ম' : 'Trusted Bangladesh Online Citizen Services Portal' ?>
        </div>

        <!-- Headline -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            <?= $lang === 'bn' ? 'সকল অনলাইন সরকারি ও নাগরিক সেবা <span class="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">এক ঠিকানায়</span>' : 'All Bangladesh Citizen Services at <span class="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">One Single Point</span>' ?>
        </h1>

        <p class="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <?= $lang === 'bn' ? 'এনআইডি সংশোধন, ই-পাসপোর্ট, ড্রাইভিং লাইসেন্স, ই-নামজারি, আয়কর রিটার্নসহ ২০+ জরুরি সরকারি সেবা ঘরে বসেই গ্রহণ করুন বিশ্বস্ততার সাথে।' : 'Fast, reliable assistance for NID correction, e-Passport, driving license, land mutation, TIN, and 20+ government services.' ?>
        </p>

        <!-- Search Bar with instant suggest -->
        <div class="mt-8 max-w-2xl mx-auto">
            <div class="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-sky-500/5 p-2 focus-within:ring-2 focus-within:ring-sky-500 transition">
                <svg class="w-6 h-6 text-slate-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" id="serviceSearchInput" placeholder="<?= $lang === 'bn' ? 'কোন সেবাটি খুঁজছেন? যেমন: এনআইডি, পাসপোর্ট, নামজারি...' : 'Search any service e.g., NID, Passport, Namjari...' ?>" class="w-full bg-transparent border-0 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-sm font-medium">
                <a href="services.php" class="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-md transition shrink-0">
                    <?= $lang === 'bn' ? 'খুঁজুন' : 'Search' ?>
                </a>
            </div>
        </div>

        <!-- Quick CTA Buttons -->
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a href="services.php" class="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition hover:-translate-y-0.5">
                <?= $lang === 'bn' ? 'সকল সেবা ব্রাউজ করুন' : 'Browse Services' ?>
            </a>
            <a href="track.php" class="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm shadow-sm transition hover:-translate-y-0.5">
                <?= $lang === 'bn' ? 'আবেদন ট্র্যাক করুন' : 'Track Existing Request' ?>
            </a>
        </div>

        <!-- Trust Stats Counters -->
        <div class="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div class="p-3">
                <div class="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">২৫,০০০+</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1"><?= $lang === 'bn' ? 'সন্তুষ্ট গ্রাহক' : 'Happy Citizens' ?></div>
            </div>
            <div class="p-3">
                <div class="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">২০+</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1"><?= $lang === 'bn' ? 'ডিজিটাল সেবা' : 'Citizen Services' ?></div>
            </div>
            <div class="p-3">
                <div class="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">৯৯.৮%</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1"><?= $lang === 'bn' ? 'সফলতার হার' : 'Success Rate' ?></div>
            </div>
            <div class="p-3">
                <div class="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">২৪/৭</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1"><?= $lang === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'Support Assistance' ?></div>
            </div>
        </div>
    </div>
</section>

<!-- SERVICES BENTO GRID -->
<section class="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    <?= $lang === 'bn' ? 'আমাদের জনপ্রিয় সেবাসমূহ' : 'Featured Digital Services' ?>
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <?= $lang === 'bn' ? 'আপনার প্রয়োজনীয় সেবা নির্বাচন করুন এবং অনলাইনে আবেদন ফর্ম জমা দিন।' : 'Choose your desired service and submit with proper document verification.' ?>
                </p>
            </div>
            <a href="services.php" class="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                <?= $lang === 'bn' ? 'সকল ২০টি সেবা দেখুন &rarr;' : 'View all 20 services &rarr;' ?>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach (array_slice($services, 0, 9) as $svc): ?>
                <div class="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 hover:border-sky-500/50 hover:shadow-xl transition flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                                <?= $lang === 'bn' ? htmlspecialchars($svc['category_bn']) : htmlspecialchars($svc['category_en']) ?>
                            </span>
                            <?php if (!empty($svc['badge'])): ?>
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    <?= htmlspecialchars($svc['badge']) ?>
                                </span>
                            <?php endif; ?>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                            <?= $lang === 'bn' ? htmlspecialchars($svc['title_bn']) : htmlspecialchars($svc['title_en']) ?>
                        </h3>
                        <p class="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            <?= $lang === 'bn' ? htmlspecialchars($svc['short_desc_bn']) : htmlspecialchars($svc['short_desc_en']) ?>
                        </p>
                    </div>

                    <div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                        <div>
                            <span class="block text-[11px] text-slate-400">ফি / চার্জ</span>
                            <span class="text-sm font-bold text-sky-600 dark:text-sky-400"><?= htmlspecialchars($svc['price']) ?></span>
                        </div>
                        <a href="service-details.php?slug=<?= urlencode($svc['slug']) ?>" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white dark:bg-slate-700 dark:hover:bg-sky-500 text-xs font-semibold transition">
                            <?= $lang === 'bn' ? 'আবেদন করুন' : 'Apply Now' ?>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- HOW IT WORKS 4 STEPS -->
<section class="py-16 bg-slate-50 dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            <?= $lang === 'bn' ? 'সহজ ৪ ধাপে সেবা গ্রহণ করুন' : 'How It Works in 4 Simple Steps' ?>
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            <?= $lang === 'bn' ? 'ঘরে বসেই আপনার সেবা অর্ডার করুন এবং যেকোনো সময় রিয়েল-টাইমে অগ্রগতি দেখুন।' : 'Order from anywhere and monitor step-by-step progress with your tracking ID.' ?>
        </p>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-3xl font-black text-sky-500/20">01</span>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mt-2"><?= $lang === 'bn' ? 'সেবা নির্বাচন করুন' : 'Select Service' ?></h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2"><?= $lang === 'bn' ? 'আপনার প্রয়োজনীয় নাগরিক সেবাটি বেছে নিন এবং প্রয়োজনীয় দলিলের তালিকা দেখে নিন।' : 'Browse our 20+ services and review the required documents checklist.' ?></p>
            </div>
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-3xl font-black text-sky-500/20">02</span>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mt-2"><?= $lang === 'bn' ? 'তথ্য ও ফাইল আপলোড' : 'Submit Details' ?></h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2"><?= $lang === 'bn' ? 'সহজ ফর্মটিতে আপনার নাম, ফোন এবং সংশ্লিষ্ট দলিলের ছবি বা স্ক্যান কপি আপলোড করুন।' : 'Fill in basic details and upload clear photo or scanned copies of supporting docs.' ?></p>
            </div>
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-3xl font-black text-sky-500/20">03</span>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mt-2"><?= $lang === 'bn' ? 'ট্র্যাকিং আইডি সংগ্রহ' : 'Get Tracking ID' ?></h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2"><?= $lang === 'bn' ? 'আবেদন করার সাথে সাথে ইউনিক ট্র্যাকিং আইডি পান এবং মানি রিসিট ডাউনলোড করুন।' : 'Receive your unique Tracking ID instantly and download your PDF-ready invoice.' ?></p>
            </div>
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-3xl font-black text-sky-500/20">04</span>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mt-2"><?= $lang === 'bn' ? 'দ্রুত ডেলিভারি পান' : 'Receive Delivery' ?></h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2"><?= $lang === 'bn' ? 'আমাদের বিশেষজ্ঞ টিম সরকারি পোর্টালের কাজ সম্পন্ন করে আপনার কপি সরবরাহ করবে।' : 'Our team completes the official process and delivers your final documents.' ?></p>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
