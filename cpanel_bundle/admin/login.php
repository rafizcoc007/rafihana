<?php
require_once __DIR__ . '/../config.php';
$pdo = getDbConnection();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND role = 'admin' LIMIT 1");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['user_id'] = $admin['id'];
        $_SESSION['user_name'] = $admin['name'];
        $_SESSION['user_email'] = $admin['email'];
        $_SESSION['user_role'] = 'admin';
        header('Location: index.php');
        exit;
    } else {
        $error = 'অ্যাডমিন ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।';
    }
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal - <?= SITE_NAME ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Hind Siliguri', 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
        <div class="text-center mb-8">
            <div class="w-14 h-14 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-sky-500/20">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h1 class="text-xl font-bold text-white"><?= SITE_NAME ?> Admin Portal</h1>
            <p class="text-xs text-slate-400 mt-1">সুরক্ষিত অ্যাডমিন কন্ট্রোল প্যানেল</p>
        </div>

        <?php if ($error): ?>
            <div class="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl mb-4">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" class="space-y-4 text-xs">
            <div>
                <label class="block font-medium text-slate-300 mb-1">অ্যাডমিন ইমেইল</label>
                <input type="email" name="email" value="admin@shebapointbd.com" required class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
            </div>

            <div>
                <label class="block font-medium text-slate-300 mb-1">পাসওয়ার্ড</label>
                <input type="password" name="password" placeholder="••••••••" required class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                <p class="text-[10px] text-slate-500 mt-1">ডিফল্ট পাসওয়ার্ড: <code>Admin@123456</code></p>
            </div>

            <button type="submit" class="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-sky-500/20 transition text-xs">
                প্রবেশ করুন &rarr;
            </button>
        </form>

        <div class="mt-6 pt-4 border-t border-slate-700 text-center">
            <a href="../index.php" class="text-xs text-slate-400 hover:text-white transition">&larr; মূল ওয়েবসাইটে ফিরে যান</a>
        </div>
    </div>
</body>
</html>
