<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$stmt = $pdo->prepare("SELECT * FROM services WHERE slug = ? LIMIT 1");
$stmt->execute([$slug]);
$service = $stmt->fetch();

if (!$service) {
    echo "<div class='max-w-lg mx-auto py-20 text-center'><h2 class='text-xl font-bold text-red-500'>Service Not Found</h2><a href='services.php' class='mt-4 inline-block text-sky-600 underline'>Back to Services</a></div>";
    require_once __DIR__ . '/footer.php';
    exit;
}

$requestSuccess = false;
$newTrackingId = '';
$formError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_service_request'])) {
    $custName = sanitize($_POST['customer_name'] ?? '');
    $custPhone = sanitize($_POST['customer_phone'] ?? '');
    $custEmail = sanitize($_POST['customer_email'] ?? '');
    $custNid = sanitize($_POST['customer_nid'] ?? '');
    $district = sanitize($_POST['district'] ?? 'ঢাকা');
    $notes = sanitize($_POST['notes'] ?? '');

    if (empty($custName) || empty($custPhone)) {
        $formError = 'অনুগ্রহ করে আপনার নাম এবং মোবাইল নম্বর প্রদান করুন।';
    } else {
        $newTrackingId = 'SHB-' . date('Y') . '-' . mt_rand(1000, 9999);
        $userId = isLoggedIn() ? $_SESSION['user_id'] : null;

        $ins = $pdo->prepare("INSERT INTO service_requests (tracking_id, user_id, service_id, service_name, customer_name, customer_phone, customer_email, customer_nid, district, notes, admin_remarks, status, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'আবেদন গৃহীত হয়েছে। খুব দ্রুত আমাদের টিম আপনার সাথে যোগাযোগ করবে।', 'pending', ?, 'unpaid')");
        
        $serviceTitle = $lang === 'bn' ? $service['title_bn'] : $service['title_en'];
        $ins->execute([
            $newTrackingId,
            $userId,
            $service['id'],
            $serviceTitle,
            $custName,
            $custPhone,
            $custEmail,
            $custNid,
            $district,
            $notes,
            $service['price']
        ]);

        $requestSuccess = true;
    }
}
?>

<div class="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
            <a href="index.php" class="hover:text-sky-600">হোম</a>
            <span>/</span>
            <a href="services.php" class="hover:text-sky-600">সেবাসমূহ</a>
            <span>/</span>
            <span class="text-slate-700 dark:text-slate-300 font-semibold"><?= htmlspecialchars($service['title_bn']) ?></span>
        </div>

        <?php if ($requestSuccess): ?>
            <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center max-w-2xl mx-auto mb-10 shadow-xl">
                <div class="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">আপনার আবেদন সফলভাবে জমা হয়েছে!</h2>
                <p class="text-sm text-slate-600 dark:text-slate-300 mt-2">আপনার ইউনিক ট্র্যাকিং নম্বরটি সংরক্ষণ করুন:</p>
                
                <div class="my-6 inline-block bg-white dark:bg-slate-900 border-2 border-dashed border-emerald-500 px-6 py-3 rounded-xl">
                    <span class="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-wider"><?= $newTrackingId ?></span>
                </div>

                <div class="flex flex-wrap justify-center gap-4">
                    <a href="track.php?id=<?= $newTrackingId ?>" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition">
                        অনলাইন ট্র্যাকিং দেখুন &rarr;
                    </a>
                    <a href="services.php" class="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition">
                        অন্যান্য সেবা
                    </a>
                </div>
            </div>
        <?php endif; ?>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left 2 Cols: Service Information & Checklist -->
            <div class="lg:col-span-2 space-y-8">
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-3 py-1 rounded-md text-xs font-semibold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                            <?= htmlspecialchars($service['category_bn']) ?>
                        </span>
                        <span class="text-xs text-slate-400">⏱️ ডেলিভারি: <?= htmlspecialchars($service['delivery_time']) ?></span>
                    </div>

                    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        <?= $lang === 'bn' ? htmlspecialchars($service['title_bn']) : htmlspecialchars($service['title_en']) ?>
                    </h1>

                    <p class="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <?= $lang === 'bn' ? nl2br(htmlspecialchars($service['full_desc_bn'])) : nl2br(htmlspecialchars($service['full_desc_en'])) ?>
                    </p>

                    <!-- Document Checklist -->
                    <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>📋</span> প্রয়োজনীয় কাগজপত্র ও দলিলের তালিকা
                        </h3>
                        <p class="text-xs text-slate-400 mt-1">আবেদনের সময় নিম্নোক্ত ডকুমেন্টগুলোর ফটোকপি বা ছবি সাথে রাখুন:</p>
                        
                        <ul class="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                            <li class="flex items-center gap-2.5">
                                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                                মূল এনআইডি বা জন্ম নিবন্ধন সনদপত্রের কপি
                            </li>
                            <li class="flex items-center gap-2.5">
                                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                                পাসপোর্ট সাইজ রঙিন ছবি (স্পষ্ট ব্যাকগ্রাউন্ড)
                            </li>
                            <li class="flex items-center gap-2.5">
                                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                                শিক্ষাগত সনদ বা ডাক্তারের প্রত্যয়ন (সেবার ধরন অনুযায়ী)
                            </li>
                            <li class="flex items-center gap-2.5">
                                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                                সক্রিয় মোবাইল নম্বর (ওটিপি ভেরিফিকেশনের জন্য)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Right Col: Request Form -->
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md sticky top-24">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">সেবার জন্য আবেদন করুন</h3>
                    <p class="text-xs text-slate-400 mb-4">আপনার তথ্য দিন, আমাদের প্রতিনিধি দ্রুত কাজটি শুরু করবেন।</p>

                    <div class="mb-4 p-3 bg-sky-50 dark:bg-sky-950/60 rounded-xl border border-sky-100 dark:border-sky-900 flex justify-between items-center text-xs">
                        <span class="text-slate-600 dark:text-slate-300 font-medium">নির্ধারিত ফি:</span>
                        <span class="text-sm font-extrabold text-sky-600 dark:text-sky-400"><?= htmlspecialchars($service['price']) ?></span>
                    </div>

                    <?php if ($formError): ?>
                        <div class="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-lg mb-4">
                            <?= htmlspecialchars($formError) ?>
                        </div>
                    <?php endif; ?>

                    <form method="POST" action="" class="space-y-3.5 text-xs">
                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">আপনার পূর্ণ নাম *</label>
                            <input type="text" name="customer_name" required placeholder="মোঃ নাম..." class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">মোবাইল নম্বর *</label>
                            <input type="text" name="customer_phone" required placeholder="017xxxxxxxx" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">ইমেইল (যদি থাকে)</label>
                            <input type="email" name="customer_email" placeholder="email@gmail.com" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">এনআইডি নম্বর (ঐচ্ছিক)</label>
                            <input type="text" name="customer_nid" placeholder="১০ বা ১৭ ডিজিটের এনআইডি" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">জেলা *</label>
                            <input type="text" name="district" value="ঢাকা" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">কাজের বিবরণ / প্রয়োজনীয় তথ্য</label>
                            <textarea name="notes" rows="2" placeholder="আপনার আবেদনের কোনো বিশেষ নির্দেশনা..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
                        </div>

                        <button type="submit" name="submit_service_request" class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition text-center text-xs">
                            আবেদন দাখিল করুন 🚀
                        </button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
