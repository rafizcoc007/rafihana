<?php
require_once __DIR__ . '/../config.php';
requireAdmin();
$pdo = getDbConnection();

// Update status action
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_status') {
    $reqId = intval($_POST['request_id']);
    $newStatus = sanitize($_POST['status']);
    $remarks = sanitize($_POST['admin_remarks']);

    $upd = $pdo->prepare("UPDATE service_requests SET status = ?, admin_remarks = ? WHERE id = ?");
    $upd->execute([$newStatus, $remarks, $reqId]);
    header('Location: index.php?msg=updated');
    exit;
}

// Stats
$totalServices = $pdo->query("SELECT COUNT(*) FROM services")->fetchColumn();
$totalRequests = $pdo->query("SELECT COUNT(*) FROM service_requests")->fetchColumn();
$pendingRequests = $pdo->query("SELECT COUNT(*) FROM service_requests WHERE status = 'pending'")->fetchColumn();
$completedRequests = $pdo->query("SELECT COUNT(*) FROM service_requests WHERE status = 'completed'")->fetchColumn();

// Requests List
$requests = $pdo->query("SELECT * FROM service_requests ORDER BY id DESC LIMIT 50")->fetchAll();
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - <?= SITE_NAME ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Hind Siliguri', 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen">
    <!-- Top Bar -->
    <header class="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-black text-xs">SP</div>
            <h1 class="text-base font-bold text-white"><?= SITE_NAME ?> Admin</h1>
        </div>
        <div class="flex items-center gap-4 text-xs">
            <a href="../index.php" target="_blank" class="text-slate-300 hover:text-white flex items-center gap-1">
                <span>🌐</span> লাইভ ওয়েবসাইট
            </a>
            <a href="logout.php" class="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition font-semibold">
                লগআউট
            </a>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span class="text-xs text-slate-400">সর্বমোট সেবা</span>
                <div class="text-2xl font-black text-sky-400 mt-1"><?= $totalServices ?></div>
            </div>
            <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span class="text-xs text-slate-400">সর্বমোট আবেদন</span>
                <div class="text-2xl font-black text-white mt-1"><?= $totalRequests ?></div>
            </div>
            <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span class="text-xs text-amber-400">নতুন অপেক্ষমান (Pending)</span>
                <div class="text-2xl font-black text-amber-400 mt-1"><?= $pendingRequests ?></div>
            </div>
            <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span class="text-xs text-emerald-400">সম্পন্ন আবেদন</span>
                <div class="text-2xl font-black text-emerald-400 mt-1"><?= $completedRequests ?></div>
            </div>
        </div>

        <!-- Requests Management -->
        <div class="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-white">গ্রাহক আবেদনসমূহ ও স্ট্যাটাস আপডেট</h2>
                <span class="text-xs text-slate-400">সর্বশেষ ৫০টি আবেদন প্রদর্শিত হচ্ছে</span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead>
                        <tr class="border-b border-slate-700 text-slate-400 uppercase">
                            <th class="pb-3">ট্র্যাকিং আইডি</th>
                            <th class="pb-3">গ্রাহক তথ্য</th>
                            <th class="pb-3">সেবার নাম</th>
                            <th class="pb-3">স্ট্যাটাস</th>
                            <th class="pb-3">মন্তব্য / Remarks</th>
                            <th class="pb-3 text-right">আপডেট অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-750">
                        <?php foreach ($requests as $r): ?>
                            <tr>
                                <td class="py-4 font-mono font-bold text-sky-400">
                                    <?= htmlspecialchars($r['tracking_id']) ?>
                                    <span class="block text-[10px] text-slate-500 font-normal"><?= date('d M, h:i A', strtotime($r['created_at'])) ?></span>
                                </td>
                                <td class="py-4">
                                    <span class="font-bold text-white block"><?= htmlspecialchars($r['customer_name']) ?></span>
                                    <span class="text-slate-400 block"><?= htmlspecialchars($r['customer_phone']) ?></span>
                                    <span class="text-slate-500 text-[10px]"><?= htmlspecialchars($r['district']) ?></span>
                                </td>
                                <td class="py-4 font-medium text-slate-300">
                                    <?= htmlspecialchars($r['service_name']) ?>
                                    <span class="block text-slate-500 text-[11px]"><?= htmlspecialchars($r['amount']) ?></span>
                                </td>
                                <td class="py-4">
                                    <?php
                                        $s = $r['status'];
                                        $bg = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                                        if ($s === 'processing') $bg = 'bg-sky-500/20 text-sky-300 border-sky-500/30';
                                        if ($s === 'completed') $bg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                                        if ($s === 'cancelled') $bg = 'bg-red-500/20 text-red-300 border-red-500/30';
                                    ?>
                                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold border <?= $bg ?>">
                                        <?= strtoupper($s) ?>
                                    </span>
                                </td>
                                <td class="py-4 max-w-xs text-slate-400 text-[11px]">
                                    <?= htmlspecialchars($r['admin_remarks'] ?? 'কোনো মন্তব্য নেই') ?>
                                </td>
                                <td class="py-4 text-right">
                                    <form method="POST" action="" class="inline-flex items-center gap-1.5">
                                        <input type="hidden" name="action" value="update_status">
                                        <input type="hidden" name="request_id" value="<?= $r['id'] ?>">
                                        <select name="status" class="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-[11px]">
                                            <option value="pending" <?= $r['status'] === 'pending' ? 'selected' : '' ?>>Pending</option>
                                            <option value="processing" <?= $r['status'] === 'processing' ? 'selected' : '' ?>>Processing</option>
                                            <option value="completed" <?= $r['status'] === 'completed' ? 'selected' : '' ?>>Completed</option>
                                            <option value="cancelled" <?= $r['status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                                        </select>
                                        <input type="text" name="admin_remarks" placeholder="মন্তব্য লিখুন..." value="<?= htmlspecialchars($r['admin_remarks'] ?? '') ?>" class="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-[11px] w-36">
                                        <button type="submit" class="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded font-bold text-[11px] transition">
                                            সেভ
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</body>
</html>
