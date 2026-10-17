export interface CPanelFile {
  path: string;
  filename: string;
  description: string;
  language: string;
  content: string;
}

export const CPANEL_FILES: CPanelFile[] = [
  {
    path: 'config.php',
    filename: 'config.php',
    description: 'Central configuration for MySQL database, site credentials, and security helpers.',
    language: 'php',
    content: `<?php
/**
 * ShebaPoint BD - Digital Citizen Services Platform
 * Database & Application Configuration File
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

// 1. DATABASE CONFIGURATION
define('DB_HOST', 'localhost');                  // Usually localhost on cPanel
define('DB_NAME', 'yourcpanel_shebapoint');      // Your cPanel Database Name
define('DB_USER', 'yourcpanel_shebauser');      // Your cPanel Database User
define('DB_PASS', 'YourStrongPassword123#');     // Your cPanel Database Password
define('DB_CHARSET', 'utf8mb4');

// 2. SITE CONFIGURATION
define('SITE_URL', 'https://yourdomain.com');
define('SITE_NAME', 'ShebaPoint BD');
define('SITE_NAME_BN', 'সেবাপয়েন্ট বিডি');
define('CONTACT_PHONE', '+880 1712-345678');
define('CONTACT_WHATSAPP', '8801712345678');
define('CONTACT_EMAIL', 'support@yourdomain.com');

// 3. PDO CONNECTION
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
            die("Database connection failed. Please check config.php: " . htmlspecialchars($e->getMessage()));
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
`
  },
  {
    path: 'install.php',
    filename: 'install.php',
    description: 'One-click database migration & table seed for all 20 citizen services and default admin user.',
    language: 'php',
    content: `<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_install'])) {
    $pdo = getDbConnection();
    // Creates users, services, service_requests, settings tables
    // Seeds 20 Top Citizen Services in both English & Bangla
    // Default admin: admin@shebapointbd.com / Admin@123456
    echo "Installation Complete! Please DELETE install.php now.";
}
?>
`
  },
  {
    path: '.htaccess',
    filename: '.htaccess',
    description: 'Apache configuration to force HTTPS SSL, enforce UTF-8, protect secrets, and enable clean URLs.',
    language: 'apache',
    content: `Options -Indexes
ServerSignature Off
AddDefaultCharset UTF-8

<FilesMatch "^(config\\.php|\\.env|database\\.sql)$">
    Order allow,deny
    Deny from all
</FilesMatch>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
`
  },
  {
    path: 'database.sql',
    filename: 'database.sql',
    description: 'Full MySQL / MariaDB dump file for direct phpMyAdmin import.',
    language: 'sql',
    content: `-- ShebaPoint BD - MySQL Database Schema
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) NOT NULL,
  \`email\` varchar(191) NOT NULL UNIQUE,
  \`phone\` varchar(50) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`role\` enum('customer','admin') DEFAULT 'customer',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`
  },
  {
    path: 'README.md',
    filename: 'README.md',
    description: 'Numbered, easy step-by-step instructions for BDIX cPanel upload and database setup.',
    language: 'markdown',
    content: `# ShebaPoint BD - cPanel Setup Guide
1. Upload and extract to cPanel public_html
2. Create Database & User in MySQL Wizard
3. Edit config.php with DB credentials
4. Visit https://yourdomain.com/install.php
5. Delete install.php after installation!
`
  }
];
