<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_role'] = $user['role'];

        if ($user['role'] === 'admin') {
            header('Location: admin/index.php');
        } else {
            header('Location: dashboard.php');
        }
        exit;
    } else {
        $error = 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। দয়া করে আবার চেষ্টা করুন।';
    }
}
?>

<div class="py-16 bg-slate-50 dark:bg-slate-950 flex-1 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">গ্রাহক লগইন</h1>
            <p class="text-xs text-slate-400 mt-1">আপনার পূর্ববর্তী আবেদন ও অর্ডার হিস্ট্রি দেখতে লগইন করুন</p>
        </div>

        <?php if ($error): ?>
            <div class="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-xl mb-4">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" class="space-y-4 text-xs">
            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">ইমেইল ঠিকানা</label>
                <input type="email" name="email" required placeholder="user@gmail.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">পাসওয়ার্ড</label>
                <input type="password" name="password" required placeholder="••••••••" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <button type="submit" class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition text-xs">
                লগইন করুন &rarr;
            </button>
        </form>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            নতুন গ্রাহক? <a href="register.php" class="text-sky-600 font-bold hover:underline">নতুন অ্যাকাউন্ট তৈরি করুন</a>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
