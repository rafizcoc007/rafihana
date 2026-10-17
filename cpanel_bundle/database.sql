-- ShebaPoint BD - Complete MySQL Database Schema
-- Compatible with MySQL 5.7+ & MySQL 8.x / MariaDB (BDIX cPanel standard)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+06:00";

-- 1. Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL UNIQUE,
  `phone` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `district` varchar(100) DEFAULT 'ঢাকা',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin User: admin@shebapointbd.com / Admin@123456
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `district`, `created_at`) 
VALUES (1, 'Super Admin', 'admin@shebapointbd.com', '01712345678', '$2y$10$w3q9Z2ZqQ3oP6J6Jv9aWce.x0yGjL3B3dO8f1P9qR7tV4x6z8m9K2', 'admin', 'ঢাকা', NOW())
ON DUPLICATE KEY UPDATE `email` = `email`;

-- 2. Table structure for table `services`
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) NOT NULL UNIQUE,
  `title_en` varchar(255) NOT NULL,
  `title_bn` varchar(255) NOT NULL,
  `category_en` varchar(100) NOT NULL,
  `category_bn` varchar(100) NOT NULL,
  `short_desc_en` text NOT NULL,
  `short_desc_bn` text NOT NULL,
  `full_desc_en` longtext NOT NULL,
  `full_desc_bn` longtext NOT NULL,
  `price` varchar(100) NOT NULL DEFAULT '৳ 350',
  `delivery_time` varchar(100) NOT NULL DEFAULT '2-3 Days',
  `icon` varchar(50) NOT NULL DEFAULT 'FileText',
  `badge` varchar(50) DEFAULT NULL,
  `required_docs` longtext DEFAULT NULL,
  `steps_guide` longtext DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table structure for table `service_requests`
CREATE TABLE IF NOT EXISTS `service_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(50) NOT NULL UNIQUE,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `customer_name` varchar(191) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_email` varchar(191) NOT NULL,
  `customer_nid` varchar(100) DEFAULT NULL,
  `district` varchar(100) NOT NULL DEFAULT 'ঢাকা',
  `notes` text DEFAULT NULL,
  `admin_remarks` text DEFAULT NULL,
  `status` enum('pending','processing','completed','cancelled') DEFAULT 'pending',
  `amount` varchar(50) NOT NULL DEFAULT '৳ 350',
  `payment_status` enum('unpaid','paid','partial') DEFAULT 'unpaid',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tracking_id` (`tracking_id`),
  KEY `customer_phone` (`customer_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table structure for table `settings`
CREATE TABLE IF NOT EXISTS `settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` longtext NOT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('brand_name', 'ShebaPoint BD'),
('brand_name_bn', 'সেবাপয়েন্ট বিডি'),
('phone', '+880 1712-345678'),
('whatsapp', '8801712345678'),
('email', 'support@shebapointbd.com'),
('notice_ticker', 'জরুরি নোটিশ: ভোটার তালিকা হালনাগাদ ও ই-পাসপোর্ট দ্রুত স্লটের আবেদন চলছে। ঘরে বসেই সকল সরকারি ফরম পূরণে সাহায্য নিন।'),
('hero_headline', 'All Government & Citizen Services at One Single Point'),
('hero_headline_bn', 'সকল অনলাইন সরকারি ও নাগরিক সেবা এক ঠিকানায়')
ON DUPLICATE KEY UPDATE `setting_key` = `setting_key`;

COMMIT;
