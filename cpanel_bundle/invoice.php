<?php
require_once __DIR__ . '/config.php';
$pdo = getDbConnection();

$trackingId = isset($_GET['id']) ? trim($_GET['id']) : '';
$stmt = $pdo->prepare("SELECT * FROM service_requests WHERE tracking_id = ? LIMIT 1");
$stmt->execute([$trackingId]);
$req = $stmt->fetch();

if (!$req) {
    die("Invoice not found.");
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>মানি রিসিট - <?= htmlspecialchars($req['tracking_id']) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Hind Siliguri', 'Inter', sans-serif; }
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; padding: 0 !important; }
        }
    </style>
</head>
<body class="bg-slate-100 p-4 sm:p-8">
    <div class="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200">
        <!-- Print Action Bar -->
        <div class="no-print flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
            <a href="track.php?id=<?= urlencode($req['tracking_id']) ?>" class="text-xs font-semibold text-slate-500 hover:text-slate-800">&larr; ট্র্যাকিং পেজে ফিরুন</a>
            <button onclick="window.print()" class="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                প্রিন্ট / PDF ডাউনলোড করুন
            </button>
        </div>

        <!-- Receipt Header -->
        <div class="flex items-start justify-between pb-8 border-b-2 border-slate-900">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <div class="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">SP</div>
                    <h1 class="text-2xl font-black text-slate-900 tracking-tight"><?= SITE_NAME_BN ?></h1>
                </div>
                <p class="text-xs text-slate-500 font-medium">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত অনলাইন নাগরিক সেবা কেন্দ্র</p>
                <p class="text-xs text-slate-500 mt-1">হটলাইন: <?= CONTACT_PHONE ?> | ইমেইল: <?= CONTACT_EMAIL ?></p>
            </div>
            <div class="text-right">
                <span class="inline-block px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded uppercase tracking-wider">মানি রিসিট / INVOICE</span>
                <p class="font-mono text-sm font-black text-sky-600 mt-2"><?= htmlspecialchars($req['tracking_id']) ?></p>
                <p class="text-xs text-slate-400 mt-0.5"><?= date('d M Y, h:i A', strtotime($req['created_at'])) ?></p>
            </div>
        </div>

        <!-- Customer & Order Details -->
        <div class="grid grid-cols-2 gap-6 py-6 border-b border-slate-100 text-xs">
            <div>
                <span class="text-slate-400 font-semibold block uppercase">গ্রাহকের তথ্য:</span>
                <p class="text-sm font-bold text-slate-800 mt-1"><?= htmlspecialchars($req['customer_name']) ?></p>
                <p class="text-slate-600 mt-0.5">মোবাইল: <?= htmlspecialchars($req['customer_phone']) ?></p>
                <p class="text-slate-600">জেলা: <?= htmlspecialchars($req['district']) ?></p>
                <?php if (!empty($req['customer_nid'])): ?>
                    <p class="text-slate-600 font-mono">NID: <?= htmlspecialchars($req['customer_nid']) ?></p>
                <?php endif; ?>
            </div>
            <div class="text-right">
                <span class="text-slate-400 font-semibold block uppercase">আবেদনের স্ট্যাটাস:</span>
                <span class="inline-block mt-1 px-3 py-1 bg-sky-100 text-sky-800 rounded font-bold text-xs">
                    <?= strtoupper($req['status']) ?>
                </span>
                <p class="text-slate-500 mt-2">পেমেন্ট অবস্থা: <strong><?= $req['payment_status'] === 'paid' ? 'পরিশোধিত (Paid)' : 'বকেয়া (Unpaid)' ?></strong></p>
            </div>
        </div>

        <!-- Service Table -->
        <table class="w-full text-left my-6 text-xs">
            <thead>
                <tr class="border-b border-slate-200 text-slate-500 uppercase">
                    <th class="py-2.5">সেবার বিবরণ</th>
                    <th class="py-2.5 text-center">পরিমাণ</th>
                    <th class="py-2.5 text-right">মূল্য</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="py-3 font-semibold text-slate-800">
                        <?= htmlspecialchars($req['service_name']) ?>
                        <span class="block text-[11px] text-slate-400 font-normal">অনলাইন আবেদন, কাগজপত্র যাচাই ও সরকারি পোর্টাল প্রসেসিং</span>
                    </td>
                    <td class="py-3 text-center text-slate-600">১</td>
                    <td class="py-3 text-right font-bold text-slate-800"><?= htmlspecialchars($req['amount']) ?></td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="border-t-2 border-slate-900 font-bold text-sm">
                    <td colspan="2" class="py-3 text-right">সর্বমোট প্রদেয়:</td>
                    <td class="py-3 text-right text-sky-600"><?= htmlspecialchars($req['amount']) ?></td>
                </tr>
            </tfoot>
        </table>

        <!-- Footer Notice & Signature -->
        <div class="pt-8 border-t border-slate-200 flex items-end justify-between text-xs">
            <div class="max-w-xs text-slate-400 space-y-1 text-[11px]">
                <p>* এটি একটি স্বয়ংক্রিয় কম্পিউটার জেনারেটেড রিসিট।</p>
                <p>* যেকোনো তদন্ত বা অনুসন্ধানের জন্য আপনার ট্র্যাকিং নম্বরটি প্রদর্শন করুন।</p>
            </div>
            <div class="text-center">
                <div class="w-24 h-12 border-b border-dashed border-slate-400 mx-auto"></div>
                <span class="text-[11px] text-slate-500 font-medium block mt-1">অনুমোদিত স্বাক্ষর ও সিল</span>
            </div>
        </div>
    </div>
</body>
</html>
