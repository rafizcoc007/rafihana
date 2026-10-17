<?php
/**
 * ShebaPoint BD - Digital Citizen Services Platform
 * Database & Application Configuration File
 *
 * INSTRUCTIONS FOR cPanel:
 * 1. Create a MySQL database and user via cPanel > MySQL Database Wizard.
 * 2. Assign ALL PRIVILEGES to the user for this database.
 * 3. Replace the DB_NAME, DB_USER, DB_PASS, and SITE_URL below.
 */

// Show errors during setup (set to 0 in production)
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// Session Security
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 1 : 0);
    session_start();
}

// ==========================================
// 1. DATABASE CONFIGURATION (EDIT THESE 4)
// ==========================================
define('DB_HOST', 'localhost');                  // Usually localhost on cPanel
define('DB_NAME', 'yourcpanel_shebapoint');      // Your cPanel Database Name
define('DB_USER', 'yourcpanel_shebauser');      // Your cPanel Database User
define('DB_PASS', 'YourStrongPassword123#');     // Your cPanel Database Password
define('DB_CHARSET', 'utf8mb4');

// ==========================================
// 2. SITE URL & BRAND CONFIGURATION
// ==========================================
// Change this to your exact domain name (with https://)
define('SITE_URL', 'https://yourdomain.com');
define('SITE_NAME', 'ShebaPoint BD');
define('SITE_NAME_BN', 'সেবাপয়েন্ট বিডি');
define('CONTACT_PHONE', '+880 1712-345678');
define('CONTACT_WHATSAPP', '8801712345678');
define('CONTACT_EMAIL', 'support@yourdomain.com');

// ==========================================
// 3. PDO DATABASE CONNECTION
// ==========================================
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
            die("<div style='font-family:sans-serif;padding:30px;background:#fef2f2;color:#991b1b;border-left:5px solid #ef4444;max-width:700px;margin:40px auto;border-radius:8px;'>
                <h2>⚠️ Database Connection Error</h2>
                <p>Could not connect to the MySQL database. Please verify <code>config.php</code>:</p>
                <ul>
                    <li>Did you create the database in cPanel MySQL Wizard?</li>
                    <li>Did you assign the user to the database with ALL PRIVILEGES?</li>
                    <li>Did you run <strong><a href='install.php'>install.php</a></strong> first?</li>
                </ul>
                <small>Debug message: " . htmlspecialchars($e->getMessage()) . "</small>
            </div>");
        }
    }
    return $pdo;
}

// ==========================================
// 4. HELPER & SECURITY FUNCTIONS
// ==========================================
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function generateCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
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
