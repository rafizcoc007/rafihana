<?php
require_once __DIR__ . '/header.php';
$submitted = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted = true;
}
?>
<div class="py-16 bg-slate-50 dark:bg-slate-950 flex-1">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center space-y-2">
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">জরুরি যোগাযোগ ও হেল্পডেস্ক</h1>
            <p class="text-xs text-slate-400">যে কোনো পরামর্শ বা তথ্যের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
        </div>

        <?php if ($submitted): ?>
            <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl text-center text-xs">
                আপনার বার্তাটি গৃহীত হয়েছে। আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করবেন।
            </div>
        <?php endif; ?>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">অফিসিয়াল ঠিকানা</h3>
                <p>📍 লেভেল ৪, ডিজিটাল সেন্টার টাওয়ার, শাহবাগ, ঢাকা-১০০০, বাংলাদেশ</p>
                <p>📞 হটলাইন: <strong class="text-sky-600"><?= CONTACT_PHONE ?></strong></p>
                <p>💬 হোয়াটসঅ্যাপ: <strong class="text-emerald-500"><?= CONTACT_WHATSAPP ?></strong></p>
                <p>✉️ ইমেইল: support@shebapointbd.com</p>
                <p class="text-slate-400 text-[11px] pt-2">সপ্তাহে ৭ দিন (সকাল ৯:০০ টা - রাত ১০:০০ টা)</p>
            </div>

            <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <form method="POST" action="" class="space-y-3 text-xs">
                    <div>
                        <label class="block font-medium mb-1">নাম</label>
                        <input type="text" required placeholder="আপনার নাম..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    </div>
                    <div>
                        <label class="block font-medium mb-1">মোবাইল</label>
                        <input type="tel" required placeholder="017xxxxxxxx" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    </div>
                    <div>
                        <label class="block font-medium mb-1">মেসেজ</label>
                        <textarea rows="3" required placeholder="আপনার জিজ্ঞাসা লিখুন..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"></textarea>
                    </div>
                    <button type="submit" class="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition">বার্তা পাঠান</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/footer.php'; ?>
