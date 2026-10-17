<?php
require_once __DIR__ . '/header.php';
$pdo = getDbConnection();

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $district = sanitize($_POST['district'] ?? 'ঢাকা');

    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        $error = 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।';
    } else {
        $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $check->execute([$email]);
        if ($check->fetch()) {
            $error = 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।';
        } else {
            $hashedPass = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, role, district) VALUES (?, ?, ?, ?, 'customer', ?)");
            $stmt->execute([$name, $email, $phone, $hashedPass, $district]);

            $_SESSION['user_id'] = $pdo->lastInsertId();
            $_SESSION['user_name'] = $name;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_role'] = 'customer';

            header('Location: dashboard.php');
            exit;
        }
    }
}
?>

<div class="py-16 bg-slate-50 dark:bg-slate-950 flex-1 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
            <p class="text-xs text-slate-400 mt-1">কয়েক সেকেন্ডে নিবন্ধন করে নাগরিক সেবার আবেদন ট্র্যাক করুন</p>
        </div>

        <?php if ($error): ?>
            <div class="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-xl mb-4">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" class="space-y-3.5 text-xs">
            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">পূর্ণ নাম *</label>
                <input type="text" name="name" required placeholder="মোঃ নাম..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">ইমেইল ঠিকানা *</label>
                <input type="email" name="email" required placeholder="user@gmail.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">মোবাইল নম্বর *</label>
                <input type="text" name="phone" required placeholder="017xxxxxxxx" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">জেলা</label>
                <input type="text" name="district" value="ঢাকা" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">গোপন পাসওয়ার্ড *</label>
                <input type="password" name="password" required placeholder="কমপক্ষে ৬ অক্ষর..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none">
            </div>

            <button type="submit" class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition text-xs">
                নিবন্ধন সম্পন্ন করুন &rarr;
            </button>
        </form>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <a href="login.php" class="text-sky-600 font-bold hover:underline">লগইন করুন</a>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
