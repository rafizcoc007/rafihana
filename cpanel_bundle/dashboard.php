<?php
require_once __DIR__ . '/header.php';
requireLogin();
$pdo = getDbConnection();

$userId = $_SESSION['user_id'];
$userEmail = $_SESSION['user_email'];

// Fetch customer requests
$stmt = $pdo->prepare("SELECT * FROM service_requests WHERE user_id = ? OR customer_email = ? ORDER BY id DESC");
$stmt->execute([$userId, $userEmail]);
$myRequests = $stmt->fetchAll();
?>

<div class="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-sky-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <span class="text-xs font-semibold text-sky-100 uppercase tracking-wider">গ্রাহক প্যানেল</span>
                <h1 class="text-2xl sm:text-3xl font-extrabold mt-1">স্বাগতম, <?= htmlspecialchars($_SESSION['user_name']) ?>!</h1>
                <p class="text-xs text-sky-100 mt-1">ইমেইল: <?= htmlspecialchars($userEmail) ?></p>
            </div>
            <div class="flex items-center gap-3">
                <a href="services.php" class="px-4 py-2.5 bg-white text-sky-700 font-bold text-xs rounded-xl shadow-md hover:bg-sky-50 transition">
                    + নতুন সেবা আবেদন
                </a>
                <a href="logout.php" class="px-4 py-2.5 bg-sky-900/40 text-white font-bold text-xs rounded-xl hover:bg-sky-900/60 transition">
                    লগআউট
                </a>
            </div>
        </div>

        <!-- Requests History Table -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">আমার আবেদন ও সেবাসমূহ (<?= count($myRequests) ?>)</h3>

            <?php if (empty($myRequests)): ?>
                <div class="text-center py-12 text-slate-400 text-xs">
                    আপনার কোনো পূর্ববর্তী আবেদন পাওয়া যায়নি।
                    <div class="mt-3">
                        <a href="services.php" class="text-sky-600 font-bold hover:underline">এখনই সেবা আবেদন করুন &rarr;</a>
                    </div>
                </div>
            <?php else: ?>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase">
                                <th class="pb-3">ট্র্যাকিং আইডি</th>
                                <th class="pb-3">সেবার নাম</th>
                                <th class="pb-3">তারিখ</th>
                                <th class="pb-3">ফি</th>
                                <th class="pb-3">স্ট্যাটাস</th>
                                <th class="pb-3 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            <?php foreach ($myRequests as $req): ?>
                                <tr>
                                    <td class="py-4 font-mono font-bold text-sky-600 dark:text-sky-400">
                                        <?= htmlspecialchars($req['tracking_id']) ?>
                                    </td>
                                    <td class="py-4 font-semibold text-slate-800 dark:text-slate-200">
                                        <?= htmlspecialchars($req['service_name']) ?>
                                    </td>
                                    <td class="py-4 text-slate-400">
                                        <?= date('d M Y', strtotime($req['created_at'])) ?>
                                    </td>
                                    <td class="py-4 font-bold text-slate-700 dark:text-slate-300">
                                        <?= htmlspecialchars($req['amount']) ?>
                                    </td>
                                    <td class="py-4">
                                        <?php
                                            $st = $req['status'];
                                            $badge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                                            if ($st === 'processing') $badge = 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
                                            if ($st === 'completed') $badge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                                        ?>
                                        <span class="px-2.5 py-1 rounded-md text-[10px] font-bold <?= $badge ?>">
                                            <?= strtoupper($st) ?>
                                        </span>
                                    </td>
                                    <td class="py-4 text-right space-x-2">
                                        <a href="track.php?id=<?= urlencode($req['tracking_id']) ?>" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 text-sky-600 rounded-md font-semibold text-[11px] transition">
                                            ট্র্যাক
                                        </a>
                                        <a href="invoice.php?id=<?= urlencode($req['tracking_id']) ?>" target="_blank" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-md font-semibold text-[11px] transition">
                                            রিসিট
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>

    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
