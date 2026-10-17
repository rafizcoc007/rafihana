import JSZip from 'jszip';

export async function downloadCpanelZip() {
  const zip = new JSZip();

  // Root files
  zip.file(
    'config.php',
    `<?php
/**
 * ShebaPoint BD - Digital Citizen Services Platform
 * Database & Application Configuration File
 *
 * INSTRUCTIONS FOR cPanel:
 * 1. Create a MySQL database and user via cPanel > MySQL Database Wizard.
 * 2. Assign ALL PRIVILEGES to the user for this database.
 * 3. Replace the DB_NAME, DB_USER, DB_PASS, and SITE_URL below.
 */

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 1 : 0);
    session_start();
}

// 1. DATABASE CONFIGURATION (EDIT THESE 4)
define('DB_HOST', 'localhost');                  // Usually localhost on cPanel
define('DB_NAME', 'yourcpanel_shebapoint');      // Your cPanel Database Name
define('DB_USER', 'yourcpanel_shebauser');      // Your cPanel Database User
define('DB_PASS', 'YourStrongPassword123#');     // Your cPanel Database Password
define('DB_CHARSET', 'utf8mb4');

// 2. SITE URL & BRAND CONFIGURATION
define('SITE_URL', 'https://yourdomain.com');
define('SITE_NAME', 'ShebaPoint BD');
define('SITE_NAME_BN', 'সেবাপয়েন্ট বিডি');
define('CONTACT_PHONE', '+880 1712-345678');
define('CONTACT_WHATSAPP', '8801712345678');
define('CONTACT_EMAIL', 'support@yourdomain.com');

// 3. PDO DATABASE CONNECTION
function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die("Database connection failed. Please verify config.php credentials.");
        }
    }
    return $pdo;
}

function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ' . SITE_URL . '/login.php');
        exit;
    }
}

function requireAdmin() {
    if (!isAdmin()) {
        header('Location: ' . SITE_URL . '/admin/login.php');
        exit;
    }
}
`
  );

  zip.file(
    '.htaccess',
    `Options -Indexes
ServerSignature Off
AddDefaultCharset UTF-8

<FilesMatch "^(config\\.php|\\.env|database\\.sql)$">
    Order allow,deny
    Deny from all
</FilesMatch>

<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}.php -f
    RewriteRule ^([a-zA-Z0-9_-]+)$ $1.php [L,QSA]
</IfModule>
`
  );

  zip.file(
    'install.php',
    `<?php
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

        // 1. Users Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS \`users\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY,
            \`name\` VARCHAR(191) NOT NULL,
            \`email\` VARCHAR(191) NOT NULL UNIQUE,
            \`phone\` VARCHAR(50) NOT NULL,
            \`password\` VARCHAR(255) NOT NULL,
            \`role\` ENUM('customer', 'admin') DEFAULT 'customer',
            \`district\` VARCHAR(100) DEFAULT 'ঢাকা',
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 2. Services Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS \`services\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY,
            \`slug\` VARCHAR(191) NOT NULL UNIQUE,
            \`title_en\` VARCHAR(255) NOT NULL,
            \`title_bn\` VARCHAR(255) NOT NULL,
            \`category_en\` VARCHAR(100) NOT NULL,
            \`category_bn\` VARCHAR(100) NOT NULL,
            \`short_desc_en\` TEXT NOT NULL,
            \`short_desc_bn\` TEXT NOT NULL,
            \`full_desc_en\` LONGTEXT NOT NULL,
            \`full_desc_bn\` LONGTEXT NOT NULL,
            \`price\` VARCHAR(100) NOT NULL DEFAULT '৳ 350',
            \`delivery_time\` VARCHAR(100) NOT NULL DEFAULT '2-3 Days',
            \`icon\` VARCHAR(50) NOT NULL DEFAULT 'FileText',
            \`badge\` VARCHAR(50) DEFAULT NULL,
            \`is_popular\` TINYINT(1) DEFAULT 0,
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 3. Service Requests Table
        $pdo->exec("CREATE TABLE IF NOT EXISTS \`service_requests\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY,
            \`tracking_id\` VARCHAR(50) NOT NULL UNIQUE,
            \`user_id\` INT NULL,
            \`service_id\` INT NOT NULL,
            \`service_name\` VARCHAR(255) NOT NULL,
            \`customer_name\` VARCHAR(191) NOT NULL,
            \`customer_phone\` VARCHAR(50) NOT NULL,
            \`customer_email\` VARCHAR(191) NOT NULL,
            \`customer_nid\` VARCHAR(100) NULL,
            \`district\` VARCHAR(100) NOT NULL DEFAULT 'ঢাকা',
            \`notes\` TEXT NULL,
            \`admin_remarks\` TEXT NULL,
            \`status\` ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
            \`amount\` VARCHAR(50) NOT NULL DEFAULT '৳ 350',
            \`payment_status\` ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX (\`tracking_id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // Admin User
        $adminEmail = 'admin@shebapointbd.com';
        $adminPass = password_hash('Admin@123456', PASSWORD_BCRYPT);
        $checkAdmin = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $checkAdmin->execute([$adminEmail]);
        if (!$checkAdmin->fetch()) {
            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, role, district) VALUES (?, ?, ?, ?, 'admin', 'ঢাকা')");
            $stmt->execute(['Super Admin', $adminEmail, '01712345678', $adminPass]);
        }

        $installed = true;
        $message = "Database tables and Admin created successfully!";
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>ShebaPoint BD Installer</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-900 text-slate-100 flex items-center justify-center min-h-screen p-4">
<div class="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700">
    <h1 class="text-xl font-bold mb-4">ShebaPoint BD Installer</h1>
    <?php if ($installed): ?>
        <p class="text-emerald-400 font-semibold mb-2"><?= $message ?></p>
        <p class="text-xs text-amber-300 mb-4">⚠️ PLEASE DELETE THIS FILE (install.php) NOW!</p>
        <div class="space-y-2 text-xs">
            <p>Admin Email: <code>admin@shebapointbd.com</code></p>
            <p>Password: <code>Admin@123456</code></p>
            <a href="index.php" class="inline-block mt-4 px-4 py-2 bg-sky-600 text-white rounded">Visit Website</a>
        </div>
    <?php else: ?>
        <form method="POST"><button type="submit" name="run_install" class="w-full py-3 bg-sky-500 text-black font-bold rounded">Run Setup Now 🚀</button></form>
    <?php endif; ?>
</div>
</body>
</html>
`
  );

  zip.file(
    'database.sql',
    `-- ShebaPoint BD - Complete Database Dump
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) NOT NULL,
  \`email\` varchar(191) NOT NULL UNIQUE,
  \`phone\` varchar(50) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`role\` enum('customer','admin') DEFAULT 'customer',
  \`district\` varchar(100) DEFAULT 'ঢাকা',
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`slug\` varchar(191) NOT NULL UNIQUE,
  \`title_en\` varchar(255) NOT NULL,
  \`title_bn\` varchar(255) NOT NULL,
  \`category_en\` varchar(100) NOT NULL,
  \`category_bn\` varchar(100) NOT NULL,
  \`short_desc_en\` text NOT NULL,
  \`short_desc_bn\` text NOT NULL,
  \`full_desc_en\` longtext NOT NULL,
  \`full_desc_bn\` longtext NOT NULL,
  \`price\` varchar(100) NOT NULL DEFAULT '৳ 350',
  \`delivery_time\` varchar(100) NOT NULL DEFAULT '2-3 Days',
  \`icon\` varchar(50) NOT NULL DEFAULT 'FileText',
  \`badge\` varchar(50) DEFAULT NULL,
  \`is_popular\` tinyint(1) DEFAULT 0,
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`service_requests\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`tracking_id\` varchar(50) NOT NULL UNIQUE,
  \`user_id\` int(11) DEFAULT NULL,
  \`service_id\` int(11) NOT NULL,
  \`service_name\` varchar(255) NOT NULL,
  \`customer_name\` varchar(191) NOT NULL,
  \`customer_phone\` varchar(50) NOT NULL,
  \`customer_email\` varchar(191) NOT NULL,
  \`customer_nid\` varchar(100) DEFAULT NULL,
  \`district\` varchar(100) NOT NULL DEFAULT 'ঢাকা',
  \`notes\` text DEFAULT NULL,
  \`admin_remarks\` text DEFAULT NULL,
  \`status\` enum('pending','processing','completed','cancelled') DEFAULT 'pending',
  \`amount\` varchar(50) NOT NULL DEFAULT '৳ 350',
  \`payment_status\` enum('unpaid','paid','partial') DEFAULT 'unpaid',
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`
  );

  zip.file(
    'README.md',
    `# ShebaPoint BD - BDIX Shared cPanel Deployment Guide

1. Log into your cPanel (https://yourdomain.com:2083)
2. Go to MySQL Database Wizard and create database & user with ALL PRIVILEGES
3. Go to File Manager > public_html and extract this zip file
4. Open config.php and update DB_NAME, DB_USER, DB_PASS, and SITE_URL
5. Visit https://yourdomain.com/install.php in your browser and click "Run Setup Now"
6. IMPORTANT: Delete install.php from File Manager
7. Log into Admin Panel at https://yourdomain.com/admin/login.php
   Email: admin@shebapointbd.com | Password: Admin@123456
`
  );

  // Generate and download zip
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'shebapoint_bd_cpanel.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
