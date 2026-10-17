<?php
/**
 * ShebaPoint BD - One-Click Database Installer (install.php)
 * Run once via browser: https://yourdomain.com/install.php
 * DELETE THIS FILE AFTER INSTALLATION FOR SECURITY!
 */

require_once __DIR__ . '/config.php';

$message = '';
$error = '';
$installed = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_install'])) {
    try {
        $pdo = getDbConnection();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // 1. Create Users Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(191) NOT NULL,
            `email` VARCHAR(191) NOT NULL UNIQUE,
            `phone` VARCHAR(50) NOT NULL,
            `password` VARCHAR(255) NOT NULL,
            `role` ENUM('customer', 'admin') DEFAULT 'customer',
            `district` VARCHAR(100) DEFAULT 'ঢাকা',
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
            `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 2. Create Services Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS `services` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `slug` VARCHAR(191) NOT NULL UNIQUE,
            `title_en` VARCHAR(255) NOT NULL,
            `title_bn` VARCHAR(255) NOT NULL,
            `category_en` VARCHAR(100) NOT NULL,
            `category_bn` VARCHAR(100) NOT NULL,
            `short_desc_en` TEXT NOT NULL,
            `short_desc_bn` TEXT NOT NULL,
            `full_desc_en` LONGTEXT NOT NULL,
            `full_desc_bn` LONGTEXT NOT NULL,
            `price` VARCHAR(100) NOT NULL DEFAULT '৳ 350',
            `delivery_time` VARCHAR(100) NOT NULL DEFAULT '2-3 Days',
            `icon` VARCHAR(50) NOT NULL DEFAULT 'FileText',
            `badge` VARCHAR(50) DEFAULT NULL,
            `required_docs` LONGTEXT DEFAULT NULL,
            `steps_guide` LONGTEXT DEFAULT NULL,
            `is_popular` TINYINT(1) DEFAULT 0,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 3. Create Service Requests Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS `service_requests` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `tracking_id` VARCHAR(50) NOT NULL UNIQUE,
            `user_id` INT NULL,
            `service_id` INT NOT NULL,
            `service_name` VARCHAR(255) NOT NULL,
            `customer_name` VARCHAR(191) NOT NULL,
            `customer_phone` VARCHAR(50) NOT NULL,
            `customer_email` VARCHAR(191) NOT NULL,
            `customer_nid` VARCHAR(100) NULL,
            `district` VARCHAR(100) NOT NULL DEFAULT 'ঢাকা',
            `notes` TEXT NULL,
            `admin_remarks` TEXT NULL,
            `status` ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
            `amount` VARCHAR(50) NOT NULL DEFAULT '৳ 350',
            `payment_status` ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
            `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX (`tracking_id`),
            INDEX (`customer_phone`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 4. Create Settings Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS `settings` (
            `setting_key` VARCHAR(100) PRIMARY KEY,
            `setting_value` LONGTEXT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 5. Create Reviews Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS `reviews` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(191) NOT NULL,
            `district` VARCHAR(100) NOT NULL,
            `rating` INT DEFAULT 5,
            `comment_en` TEXT NOT NULL,
            `comment_bn` TEXT NOT NULL,
            `service_name` VARCHAR(191) NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // Create Default Admin User
        $adminEmail = 'admin@shebapointbd.com';
        $adminPass = password_hash('Admin@123456', PASSWORD_BCRYPT);
        
        $checkAdmin = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $checkAdmin->execute([$adminEmail]);
        if (!$checkAdmin->fetch()) {
            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, role, district) VALUES (?, ?, ?, ?, 'admin', 'ঢাকা')");
            $stmt->execute(['Super Admin', $adminEmail, '01712345678', $adminPass]);
        }

        // Seed 20 Top Services
        $services = [
            ['nid-card-correction', 'NID Card Correction / Reissue', 'এনআইডি কার্ড সংশোধন ও রি-ইস্যু', 'Identity & Civil', 'পরিচয় ও নাগরিক সনদ', 'Correction of name, date of birth, address, or parent names on national ID card and lost card re-issuance.', 'জাতীয় পরিচয়পত্রের নাম, জন্মতারিখ, পিতা-মাতার নাম বা ঠিকানা সংশোধন এবং হারানো এনআইডি নতুন করে উত্তোলন।', '৳ 350', '2-5 Working Days', 'CreditCard', 'Most Popular', 1],
            ['birth-registration', 'Birth Registration (New & Correction)', 'নতুন জন্ম নিবন্ধন ও সংশোধন', 'Identity & Civil', 'পরিচয় ও নাগরিক সনদ', 'Fresh online digital birth certificate application and correction of spelling mistakes.', 'অনলাইন ডিজিটাল ১৭ ডিজিটের নতুন জন্ম নিবন্ধন আবেদন এবং বিদ্যমান সনদের ভুল সংশোধন সেবা।', '৳ 250', '3-7 Working Days', 'Baby', 'Essential', 1],
            ['death-registration', 'Death Registration Certificate', 'মৃত্যু নিবন্ধন সনদ', 'Identity & Civil', 'পরিচয় ও নাগরিক সনদ', 'Official government online death registration for inheritance and legal documentation.', 'উত্তরাধিকার ও আইনগত প্রক্রিয়ার জন্য সরকারি অনলাইন মৃত্যু নিবন্ধন সনদ আবেদন সেবা।', '৳ 300', '3-5 Working Days', 'FileBadge', null, 0],
            ['epassport-application', 'e-Passport Application / Renewal', 'ই-পাসপোর্ট আবেদন ও নবায়ন', 'Transport & Travel', 'পরিবহন ও ভ্রমণ সেবা', 'New 48/64 page e-Passport online form submission, bank fee payment, and appointment booking.', 'নতুন ই-পাসপোর্ট আবেদন, মেয়াদোত্তীর্ণ পাসপোর্ট রিনিউ, সরকারি ব্যাংক চালান ও বায়োমেট্রিক স্লট বুকিং।', '৳ 500', '24-48 Hours', 'Compass', 'High Demand', 1],
            ['driving-license', 'Driving License (New / Renewal)', 'ড্রাইভিং লাইসেন্স নতুন ও নবায়ন', 'Transport & Travel', 'পরিবহন ও ভ্রমণ সেবা', 'BRTA BSCIS online learner license, smart card driving license application, and license renewal.', 'বিআরটিএ লার্নার ড্রাইভিং লাইসেন্স, পেশাদার ও অপেশাদার স্মার্ট কার্ড লাইসেন্স আবেদন ও নবায়ন।', '৳ 450', '1-3 Working Days', 'Car', null, 1],
            ['brta-vehicle-registration', 'BRTA Vehicle Registration & Fitness', 'বিআরটিএ যানবাহন নিবন্ধন ও ফিটনেস', 'Transport & Travel', 'পরিবহন ও ভ্রমণ সেবা', 'Online tax token renewal, vehicle fitness slot booking, ownership transfer, and registration assistance.', 'মোটরসাইকেল ও গাড়ির ট্যাক্স টোকেন নবায়ন, ফিটনেস অ্যাপয়েন্টমেন্ট ও মালিকানা বদলি ফর্ম প্রস্তুত।', '৳ 400', '24-48 Hours', 'Truck', null, 0],
            ['etin-registration', 'e-TIN Registration & Correction', 'ই-টিন সার্টিফিকেট তৈরি ও সংশোধন', 'Tax & Business', 'কর ও ব্যবসা সেবা', 'Instant 12-digit e-TIN certificate generation and NID-matched taxpayer profile updates.', 'জাতীয় রাজস্ব বোর্ডের ১২ ডিজিটের ই-টিন সার্টিফিকেট তৈরি এবং নাম বা ঠিকানা সংশোধন।', '৳ 200', '30 Minutes', 'FileText', 'Instant', 1],
            ['income-tax-return', 'Income Tax Return Submission', 'আয়কর রিটার্ন দাখিল ও ট্যাক্স ফাইল', 'Tax & Business', 'কর ও ব্যবসা সেবা', 'Complete e-Return filing, wealth statement submission, and official PSR tax acknowledgement receipt.', 'অনলাইন ই-রিটার্ন দাখিল, সম্পদ বিবরণী প্রস্তুত এবং সরকারি ট্যাক্স প্রাপ্তি স্বীকারপত্র (পিএসআর) উত্তোলন।', '৳ 600', '1-2 Working Days', 'Receipt', 'Mandatory', 1],
            ['vat-registration', 'VAT Registration (BIN Certificate)', 'অনলাইন ভ্যাট রেজিস্ট্রেশন ও বিন', 'Tax & Business', 'কর ও ব্যবসা সেবা', '13-digit Business Identification Number (BIN) registration from NBR IVAS portal.', 'জাতীয় রাজস্ব বোর্ডের অনলাইন সিস্টেম থেকে ১৩ ডিজিটের ব্যবসায়িক ভ্যাট নিবন্ধন (বিন সার্টিফিকেট)।', '৳ 700', '2-3 Working Days', 'Percent', null, 0],
            ['trade-license', 'Trade License (New & Renewal)', 'নতুন ট্রেড লাইসেন্স ও নবায়ন', 'Tax & Business', 'কর ও ব্যবসা সেবা', 'E-Trade license issuance under City Corporations, Pourashava, or Union Parishad.', 'সিটি করপোরেশন, পৌরসভা বা ইউনিয়ন পরিষদের আওতাধীন ই-ট্রেড লাইসেন্স নতুন আবেদন ও নবায়ন।', '৳ 550', '2-4 Working Days', 'Briefcase', null, 1],
            ['company-registration-rjsc', 'Company / Business Registration (RJSC)', 'কোম্পানি ও ফার্ম নিবন্ধন (RJSC)', 'Tax & Business', 'কর ও ব্যবসা সেবা', 'RJSC Name Clearance, Memorandum & Articles drafting, and Private Limited incorporation.', 'আরজেএসসি থেকে কোম্পানির নাম ছাড়পত্র, মেমোরেন্ডাম ড্রাফটিং ও প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন।', 'Contact for price', '7-14 Days', 'Building2', null, 0],
            ['land-mutation-namjari', 'Land Mutation (e-Namjari)', 'ই-নামজারি ও জমাখারিজ আবেদন', 'Land & Legal', 'ভূমি ও আইনি সেবা', 'Online e-Mutation, DCR payment, and mutation khatian issuance under AC Land office.', 'সহকারী কমিশনার (ভূমি) অফিসের মাধ্যমে অনলাইন ই-নামজারি, ডিসিআর ফি প্রদান ও খতিয়ান সংগ্রহ।', '৳ 650', '15-28 Days', 'MapPin', 'Legal', 1],
            ['khatian-porcha-land-tax', 'Khatian / Porcha / Land Tax (Khajna)', 'খতিয়ান/পর্চা উত্তোলন ও ভূমি কর', 'Land & Legal', 'ভূমি ও আইনি সেবা', 'Certified CS, SA, RS, BS copy from DC record room and online land tax holding registration & payment.', 'জেলা প্রশাসকের রেকর্ড রুম থেকে সার্টিফাইড পর্চা উত্তোলন এবং অনলাইনে ভূমি উন্নয়ন কর পরিশোধ।', '৳ 350', '3-7 Working Days', 'Scroll', null, 0],
            ['police-clearance', 'Police Clearance Certificate', 'অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট', 'Identity & Civil', 'পরিচয় ও নাগরিক সনদ', 'Bangladesh Police Clearance Certificate for immigration, study abroad, and foreign employment.', 'বিদেশে ভ্রমণ, উচ্চশিক্ষা বা চাকরির জন্য বাংলাদেশ পুলিশের অনলাইন ক্লিয়ারেন্স সার্টিফিকেট আবেদন।', '৳ 350', '7-12 Days', 'ShieldCheck', 'Abroad Essential', 1],
            ['visa-application', 'Visa Application Assistance', 'দেশ-বিদেশের ভিসা আবেদন সহায়তা', 'Transport & Travel', 'পরিবহন ও ভ্রমণ সেবা', 'Tourist, business, and medical visa form fill-up for India, Malaysia, Thailand, UAE, UK, and Schengen.', 'ভারত, মালয়েশিয়া, থাইল্যান্ড, দুবাই, যুক্তরাজ্য ও ইউরোপিয়ান দেশের ট্যুরিস্ট ও মেডিকেল ভিসা আবেদন।', '৳ 500', '24-72 Hours', 'Plane', null, 0],
            ['online-job-application', 'Online Job Application Form Fill-up', 'সরকারি-বেসরকারি চাকরি আবেদন ফর্ম পূরণ', 'Career & Education', 'ক্যারিয়ার ও শিক্ষা সেবা', 'Teletalk govt job applications (BCS, Primary, NTRCA, Railway, Ministry) with photo/signature resize.', 'টেলিটক সরকারি চাকরির আবেদন ও সঠিক মাপের ছবি-স্বাক্ষর রিসাইজ।', '৳ 150', '1-3 Hours', 'GraduationCap', 'Fast', 1],
            ['certificate-attestation', 'Educational Certificate Attestation', 'শিক্ষাগত সনদ সত্যায়ন ও অ্যাপোস্টিল', 'Career & Education', 'ক্যারিয়ার ও শিক্ষা সেবা', 'Education Board, Ministry of Education, and Foreign Ministry (MOFA) attestation assistance.', 'শিক্ষা বোর্ড, শিক্ষা মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয় (এমওএফএ) থেকে সার্টিফিকেট সত্যায়ন সহায়তা।', '৳ 450', '5-10 Days', 'Award', null, 0],
            ['citizenship-certificate', 'Citizenship / Character Certificate', 'নাগরিকত্ব ও চারিত্রিক সনদপত্র', 'Identity & Civil', 'পরিচয় ও নাগরিক সনদ', 'Union Parishad, Municipality, or Ward Councillor official citizenship & character testimonials.', 'ইউনিয়ন পরিষদ, পৌরসভা বা ওয়ার্ড কাউন্সিলর অফিস থেকে নাগরিকত্ব, চারিত্রিক ও অবিবাহিত সনদপত্র।', '৳ 200', '1-2 Days', 'FileCheck', null, 0],
            ['utility-bill-services', 'Utility Bill Services (Electricity, Gas, Water)', 'বিদ্যুৎ, গ্যাস ও পানির বিল পরিশোধ ও নতুন সংযোগ', 'Digital & Utilities', 'ডিজিটাল ও ইউটিলিটি সেবা', 'DESCO, DPDC, NESCO, BREB, Titas Gas, and WASA bill payment, name change, and meter transfer.', 'ডেসকো, ডিপিডিসি, নেসকো, পল্লী বিদ্যুৎ, তিতাস গ্যাস ও ওয়াসার বিল পরিশোধ ও মিটার নাম পরিবর্তন।', '৳ 50', '1 Hour', 'Zap', null, 0],
            ['graphic-design-marketing', 'Graphic Design, Website & Digital Marketing', 'গ্রাফিক্স ডিজাইন, ওয়েবসাইট ও ডিজিটাল মার্কেটিং', 'Digital & Utilities', 'ডিজিটাল ও ইউটিলিটি সেবা', 'Logo design, visiting cards, banner printing, WordPress websites, and Facebook page boost campaigns.', 'লোগো ডিজাইন, ভিজিটিং কার্ড, ব্যানার, ওয়ার্ডপ্রেস ওয়েবসাইট ও ফেসবুক পেজ বুস্টিং।', 'Contact for price', '2-7 Days', 'Sparkles', 'Creative', 0],
        ];

        $insService = $pdo->prepare("INSERT IGNORE INTO services (slug, title_en, title_bn, category_en, category_bn, short_desc_en, short_desc_bn, full_desc_en, full_desc_bn, price, delivery_time, icon, badge, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($services as $s) {
            $insService->execute([
                $s[0], $s[1], $s[2], $s[3], $s[4], $s[5], $s[6],
                $s[5], $s[6], // full desc fallback
                $s[7], $s[8], $s[9], $s[10], $s[11]
            ]);
        }

        // Insert Initial Sample Request for testing
        $checkReq = $pdo->query("SELECT COUNT(*) FROM service_requests")->fetchColumn();
        if ($checkReq == 0) {
            $stmt = $pdo->prepare("INSERT INTO service_requests (tracking_id, service_id, service_name, customer_name, customer_phone, customer_email, district, notes, admin_remarks, status, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                'SHB-2026-8941',
                1,
                'এনআইডি কার্ড সংশোধন ও রি-ইস্যু (NID Correction)',
                'মোঃ তানভীর হাসান',
                '01711223344',
                'tanvir.bd@gmail.com',
                'ঢাকা',
                'পিতার নামের বানান সংশোধন ও নতুন স্মার্ট কার্ড আবেদন।',
                'কাগজপত্র নির্বাচন কমিশনে দাখিল করা হয়েছে। প্রক্রিয়াধীন।',
                'processing',
                '৳ 350',
                'paid'
            ]);
        }

        $installed = true;
        $message = "Installation completed successfully! All tables, 20 services, and Admin user created.";
    } catch (Exception $e) {
        $error = "Installation failed: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShebaPoint BD - Database Installer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Hind Siliguri', 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/30">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zM9 12h6M12 9v6"/></svg>
            </div>
            <h1 class="text-2xl font-bold text-white">ShebaPoint BD Installer</h1>
            <p class="text-slate-400 text-sm mt-1">bKash/Nagad & Citizen Services Portal for BDIX cPanel</p>
        </div>

        <?php if ($error): ?>
            <div class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm">
                <strong>Error:</strong> <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <?php if ($installed): ?>
            <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-5 rounded-xl mb-6">
                <h3 class="font-bold text-lg mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    Installation Complete!
                </h3>
                <p class="text-sm text-slate-300 mb-3">All database tables, 20 services, and default admin login have been configured.</p>
                <div class="bg-slate-900/80 p-3 rounded-lg text-xs space-y-1 font-mono text-slate-300 border border-slate-700">
                    <p><strong>Admin URL:</strong> <?= SITE_URL ?>/admin</p>
                    <p><strong>Admin Email:</strong> admin@shebapointbd.com</p>
                    <p><strong>Default Password:</strong> Admin@123456</p>
                </div>
                <div class="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs">
                    ⚠️ <strong>CRITICAL SECURITY STEP:</strong> You MUST now delete <code>install.php</code> from your cPanel File Manager!
                </div>
            </div>

            <div class="flex gap-4">
                <a href="index.php" class="flex-1 text-center py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl transition shadow-lg shadow-sky-600/30">
                    Visit Homepage
                </a>
                <a href="admin/login.php" class="flex-1 text-center py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition">
                    Admin Login
                </a>
            </div>
        <?php else: ?>
            <div class="space-y-4 text-sm text-slate-300 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <p>This automated installer will:</p>
                <ul class="list-disc list-inside space-y-1 text-slate-400">
                    <li>Create <code>users</code> table &amp; security role management</li>
                    <li>Create <code>services</code> table and seed all 20 citizen services</li>
                    <li>Create <code>service_requests</code> table with live tracking IDs</li>
                    <li>Create <code>settings</code> &amp; <code>reviews</code> tables</li>
                    <li>Create Super Admin account with encrypted password</li>
                </ul>
                <div class="pt-2 text-xs text-sky-400">
                    Database: <strong><?= DB_NAME ?></strong> on <strong><?= DB_HOST ?></strong>
                </div>
            </div>

            <form method="POST" action="">
                <button type="submit" name="run_install" class="w-full py-3.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-sky-500/20 text-center">
                    Run Database Setup Now 🚀
                </button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
