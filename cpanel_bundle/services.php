<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

$categoryFilter = isset($_GET['category']) ? trim($_GET['category']) : '';
$searchFilter = isset($_GET['search']) ? trim($_GET['search']) : '';

$sql = "SELECT * FROM services WHERE 1=1";
$params = [];

if ($categoryFilter && $categoryFilter !== 'All') {
    $sql .= " AND (category_en = ? OR category_bn = ?)";
    $params[] = $categoryFilter;
    $params[] = $categoryFilter;
}

if ($searchFilter) {
    $sql .= " AND (title_en LIKE ? OR title_bn LIKE ? OR short_desc_en LIKE ? OR short_desc_bn LIKE ?)";
    $term = "%" . $searchFilter . "%";
    $params[] = $term;
    $params[] = $term;
    $params[] = $term;
    $params[] = $term;
}

$sql .= " ORDER BY is_popular DESC, id ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$services = $stmt->fetchAll();

// Get unique categories
$categories = [
    'All' => ['en' => 'All Services', 'bn' => 'সকল সেবা'],
    'Identity & Civil' => ['en' => 'Identity & Civil', 'bn' => 'পরিচয় ও নাগরিক সনদ'],
    'Transport & Travel' => ['en' => 'Transport & Travel', 'bn' => 'পরিবহন ও ভ্রমণ সেবা'],
    'Tax & Business' => ['en' => 'Tax & Business', 'bn' => 'কর ও ব্যবসা সেবা'],
    'Land & Legal' => ['en' => 'Land & Legal', 'bn' => 'ভূমি ও আইনি সেবা'],
    'Career & Education' => ['en' => 'Career & Education', 'bn' => 'ক্যারিয়ার ও শিক্ষা সেবা'],
    'Digital & Utilities' => ['en' => 'Digital & Utilities', 'bn' => 'ডিজিটাল ও ইউটিলিটি সেবা']
];
?>

<div class="py-12 bg-slate-50 dark:bg-slate-950 flex-1">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">
                <?= $lang === 'bn' ? 'সকল ডিজিটাল নাগরিক সেবা' : 'All Digital Citizen Services' ?>
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                <?= $lang === 'bn' ? 'আপনার প্রয়োজনীয় সরকারি ফর্ম, আবেদন ও সনদপত্র বাছাই করুন।' : 'Find government and legal applications with instant transparent pricing.' ?>
            </p>
        </div>

        <!-- Filter Chips & Search Bar -->
        <div class="mb-10 space-y-4">
            <!-- Search Form -->
            <form method="GET" action="services.php" class="max-w-xl mx-auto flex gap-2">
                <input type="text" name="search" value="<?= htmlspecialchars($searchFilter) ?>" placeholder="<?= $lang === 'bn' ? 'সেবার নাম দিয়ে খুঁজুন...' : 'Search service name...' ?>" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                <button type="submit" class="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-md transition">
                    <?= $lang === 'bn' ? 'ফিল্টার' : 'Filter' ?>
                </button>
            </form>

            <!-- Category Chips -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
                <?php foreach ($categories as $catKey => $catLabel): ?>
                    <?php 
                        $isActive = ($categoryFilter === $catKey) || (!$categoryFilter && $catKey === 'All');
                        $url = $catKey === 'All' ? 'services.php' : 'services.php?category=' . urlencode($catKey);
                    ?>
                    <a href="<?= $url ?>" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition <?= $isActive ? 'bg-sky-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500' ?>">
                        <?= $lang === 'bn' ? $catLabel['bn'] : $catLabel['en'] ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Services Grid -->
        <?php if (empty($services)): ?>
            <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <p class="text-slate-400 text-sm">কোনো সেবা পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে আবার খুঁজুন।</p>
                <a href="services.php" class="inline-block mt-4 text-xs font-bold text-sky-600 hover:underline">সকল সেবা দেখুন</a>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($services as $svc): ?>
                    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
                                    <?= $lang === 'bn' ? htmlspecialchars($svc['category_bn']) : htmlspecialchars($svc['category_en']) ?>
                                </span>
                                <span class="text-xs text-slate-400 font-medium">⏱️ <?= htmlspecialchars($svc['delivery_time']) ?></span>
                            </div>

                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                                <?= $lang === 'bn' ? htmlspecialchars($svc['title_bn']) : htmlspecialchars($svc['title_en']) ?>
                            </h3>
                            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                <?= $lang === 'bn' ? htmlspecialchars($svc['short_desc_bn']) : htmlspecialchars($svc['short_desc_en']) ?>
                            </p>
                        </div>

                        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <span class="block text-[10px] text-slate-400 uppercase font-medium">ফি / চার্জ</span>
                                <span class="text-base font-extrabold text-sky-600 dark:text-sky-400"><?= htmlspecialchars($svc['price']) ?></span>
                            </div>
                            <a href="service-details.php?slug=<?= urlencode($svc['slug']) ?>" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition shadow-sm">
                                <?= $lang === 'bn' ? 'আবেদন ও বিস্তারিত' : 'View & Apply' ?>
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
