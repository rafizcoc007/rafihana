<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

$trackingId = isset($_GET['id']) ? trim($_GET['id']) : '';
$request = null;
$searched = false;

if ($trackingId) {
    $searched = true;
    $stmt = $pdo->prepare("SELECT * FROM service_requests WHERE tracking_id = ? LIMIT 1");
    $stmt->execute([$trackingId]);
    $request = $stmt->fetch();
}
?>

<div class="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-xl mx-auto mb-10">
            <div class="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">
                <?= $lang === 'bn' ? 'আবেদন লাইভ ট্র্যাকিং' : 'Live Request Tracker' ?>
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                <?= $lang === 'bn' ? 'আপনার আবেদনের বর্তমান অবস্থা জানতে ট্র্যাকিং আইডি প্রবেশ করান।' : 'Enter your unique Tracking ID to see live progress and download receipt.' ?>
            </p>

            <!-- Search Form -->
            <form method="GET" action="track.php" class="mt-6 flex gap-2">
                <input type="text" name="id" value="<?= htmlspecialchars($trackingId) ?>" placeholder="যেমন: SHB-2026-8941" required class="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-sky-500 uppercase">
                <button type="submit" class="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition">
                    <?= $lang === 'bn' ? 'ট্র্যাক করুন' : 'Track Status' ?>
                </button>
            </form>
            <p class="text-[11px] text-slate-400 mt-2">ডেমো ট্র্যাকিং আইডি ট্রাই করুন: <span class="font-mono font-bold text-sky-600 dark:text-sky-400 cursor-pointer" onclick="document.getElementsByName('id')[0].value='SHB-2026-8941'">SHB-2026-8941</span></p>
        </div>

        <?php if ($searched && !$request): ?>
            <div class="bg-red-50 dark:bg-red-950/30 border border-red-500/30 rounded-2xl p-8 text-center text-red-500 text-sm">
                ❌ এই ট্র্যাকিং আইডির কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আইডি যাচাই করে আবার চেষ্টা করুন।
            </div>
        <?php elseif ($request): ?>
            <!-- Request Found Card -->
            <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
                
                <!-- Status Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                    <div>
                        <span class="text-xs text-slate-400 uppercase font-semibold">ট্র্যাকিং নম্বর</span>
                        <h2 class="text-2xl font-black font-mono text-slate-900 dark:text-white tracking-wider mt-0.5">
                            <?= htmlspecialchars($request['tracking_id']) ?>
                        </h2>
                        <p class="text-xs text-slate-500 mt-1">আবেদনের তারিখ: <?= htmlspecialchars($request['created_at']) ?></p>
                    </div>

                    <div class="flex items-center gap-3">
                        <?php
                            $status = $request['status'];
                            $badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                            $statusLabel = 'অপেক্ষমান (Pending)';
                            if ($status === 'processing') {
                                $badgeClass = 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
                                $statusLabel = 'প্রক্রিয়াধীন (Processing)';
                            } elseif ($status === 'completed') {
                                $badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                                $statusLabel = 'সম্পন্ন (Completed)';
                            } elseif ($status === 'cancelled') {
                                $badgeClass = 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
                                $statusLabel = 'বাতিল (Cancelled)';
                            }
                        ?>
                        <span class="px-4 py-2 rounded-xl text-xs font-bold <?= $badgeClass ?>">
                            <?= $statusLabel ?>
                        </span>

                        <a href="invoice.php?id=<?= urlencode($request['tracking_id']) ?>" target="_blank" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                            মানি রিসিট
                        </a>
                    </div>
                </div>

                <!-- 4 Stage Progress Bar -->
                <div>
                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">অগ্রগতি টাইমলাইন</h4>
                    <div class="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                        <!-- Step 1 -->
                        <div class="space-y-2">
                            <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs font-bold">✓</div>
                            <span class="text-emerald-600 dark:text-emerald-400">দাখিলকৃত</span>
                        </div>
                        <!-- Step 2 -->
                        <div class="space-y-2">
                            <div class="w-8 h-8 rounded-full <?= in_array($status, ['processing', 'completed']) ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400' ?> flex items-center justify-center mx-auto text-xs font-bold">
                                <?= in_array($status, ['processing', 'completed']) ? '✓' : '2' ?>
                            </div>
                            <span class="<?= in_array($status, ['processing', 'completed']) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400' ?>">যাচাইকরণ</span>
                        </div>
                        <!-- Step 3 -->
                        <div class="space-y-2">
                            <div class="w-8 h-8 rounded-full <?= in_array($status, ['processing', 'completed']) ? 'bg-sky-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-400' ?> flex items-center justify-center mx-auto text-xs font-bold">
                                <?= $status === 'completed' ? '✓' : '3' ?>
                            </div>
                            <span class="<?= in_array($status, ['processing', 'completed']) ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400' ?>">প্রক্রিয়াধীন</span>
                        </div>
                        <!-- Step 4 -->
                        <div class="space-y-2">
                            <div class="w-8 h-8 rounded-full <?= $status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400' ?> flex items-center justify-center mx-auto text-xs font-bold">
                                <?= $status === 'completed' ? '✓' : '4' ?>
                            </div>
                            <span class="<?= $status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400' ?>">ডেলিভারি সম্পন্ন</span>
                        </div>
                    </div>
                </div>

                <!-- Admin Remarks -->
                <?php if (!empty($request['admin_remarks'])): ?>
                    <div class="p-4 bg-sky-50 dark:bg-sky-950/50 border-l-4 border-sky-500 rounded-r-xl text-xs space-y-1">
                        <span class="font-bold text-sky-800 dark:text-sky-300">অফিসিয়াল মন্তব্য / আপডেট:</span>
                        <p class="text-slate-600 dark:text-slate-300"><?= htmlspecialchars($request['admin_remarks']) ?></p>
                    </div>
                <?php endif; ?>

                <!-- Details Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                        <span class="text-slate-400 block">সেবার নাম:</span>
                        <span class="font-bold text-slate-800 dark:text-slate-200"><?= htmlspecialchars($request['service_name']) ?></span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">গ্রাহকের নাম:</span>
                        <span class="font-bold text-slate-800 dark:text-slate-200"><?= htmlspecialchars($request['customer_name']) ?></span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">মোবাইল:</span>
                        <span class="font-bold text-slate-800 dark:text-slate-200"><?= htmlspecialchars($request['customer_phone']) ?></span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">জেলা:</span>
                        <span class="font-bold text-slate-800 dark:text-slate-200"><?= htmlspecialchars($request['district']) ?></span>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
