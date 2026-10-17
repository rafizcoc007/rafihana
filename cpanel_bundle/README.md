# ShebaPoint BD - BDIX Shared cPanel Hosting Deployment Guide

This package is custom-engineered for **BDIX Shared Hosting with cPanel (PHP 8.0, 8.1, 8.2, 8.3 + MySQL/MariaDB)**. It has **no Node.js requirement**, **no terminal requirement**, and **no build step**.

---

## 🚀 Easy Step-by-Step cPanel Upload Instructions

### Step 1: Prepare the Files
1. Download or zip all the contents inside this folder (`cpanel_bundle/`).
2. Make sure `config.php`, `install.php`, `index.php`, `.htaccess`, and the `admin/` folder are at the root level of your zip file.

---

### Step 2: Create MySQL Database in cPanel
1. Log in to your **cPanel** dashboard (e.g., `https://yourdomain.com:2083`).
2. Under the **Databases** section, click **MySQL® Database Wizard**.
3. **Step 1: Create A Database**:
   - Type a database name (e.g., `shebapoint`).
   - Click **Next Step**.
4. **Step 2: Create Database Users**:
   - Type a username (e.g., `shebauser`).
   - Click **Password Generator** to create a strong password (e.g., `P@ssword#2026!`).
   - **Important:** Copy and save this password on your notepad.
   - Click **Create User**.
5. **Step 3: Add User to the Database**:
   - Check the box **ALL PRIVILEGES**.
   - Click **Make Changes**.
   - Note down the full database name and username (e.g., `mycpanel_shebapoint` and `mycpanel_shebauser`).

---

### Step 3: Upload and Extract via cPanel File Manager
1. In cPanel, navigate to **Files** > **File Manager**.
2. Open the **`public_html`** directory (or your addon domain's document root folder).
3. Click the **Upload** button in the top menu.
4. Select your zip file and wait until the progress bar turns green (100%).
5. Return to `public_html`, right-click on the uploaded zip file, and click **Extract**.
6. Ensure the extracted files (`index.php`, `config.php`, `install.php`, `.htaccess`, `admin/`) are placed directly inside `public_html`.

---

### Step 4: Configure `config.php`
1. Inside `public_html`, find `config.php`.
2. Right-click on `config.php` and click **Edit**.
3. Update the four database variables with the credentials created in Step 2:
   ```php
   define('DB_HOST', 'localhost');                  // Usually localhost on cPanel
   define('DB_NAME', 'mycpanel_shebapoint');        // Your full Database Name
   define('DB_USER', 'mycpanel_shebauser');         // Your full Database User
   define('DB_PASS', 'YourSavedPassword123#');      // Your Database Password
   define('SITE_URL', 'https://yourdomain.com');    // Your domain name with https://
   ```
4. Click **Save Changes**.

---

### Step 5: Run Automated One-Click Installer
1. Open your browser and visit:
   ```
   https://yourdomain.com/install.php
   ```
2. Click the green button: **"Run Database Setup Now 🚀"**.
3. The installer will automatically create all tables (`users`, `services`, `service_requests`, `settings`, `reviews`) and seed all **20 top citizen services** with both Bangla and English details.
4. **CRITICAL SECURITY STEP:** Go back to cPanel **File Manager** and **DELETE `install.php`** immediately so nobody else can rerun the installer.

---

### Step 6: Log In to the Admin Panel
1. Visit:
   ```
   https://yourdomain.com/admin/login.php
   ```
2. Use the default Super Admin credentials:
   - **Email:** `admin@shebapointbd.com`
   - **Password:** `Admin@123456`
3. Once logged in:
   - View overview statistics.
   - Edit phone, WhatsApp, and notice ticker.
   - Change your admin password to your personal strong password.

---

### Step 7: Enable Free SSL (AutoSSL) and Force HTTPS
1. In cPanel, look for **SSL/TLS Status**.
2. Select your domain and click **Run AutoSSL** to issue a free Sectigo/cPanel SSL certificate.
3. The included `.htaccess` file automatically forces all HTTP visitors to HTTPS:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## 🛠️ Troubleshooting & Common Fixes

### 1. Database Connection Error ("Could not connect to MySQL")
- **Cause:** Typo in database name, username, or password in `config.php`.
- **Solution:** Verify in cPanel > **MySQL® Databases** that the user is properly added to the database with **ALL PRIVILEGES**. Note that cPanel prefixes your username (e.g., `accountname_shebapoint`).

### 2. 500 Internal Server Error
- **Cause:** Unsupported `.htaccess` directive or incorrect PHP version.
- **Solution:** In cPanel, search for **Select PHP Version** or **MultiPHP Manager**. Ensure your PHP version is set to **PHP 8.0, 8.1, 8.2, or 8.3** (do not use PHP 7.x or 5.x). Ensure `pdo_mysql` extension is enabled.

### 3. File Permissions
- Folders should be set to **755** (`drwxr-xr-x`).
- Files should be set to **644** (`-rw-r--r--`).
- Never set files or directories to 777.

### 4. Bangla Characters Showing as Question Marks (`???`)
- The included database script and installer use `utf8mb4` with `utf8mb4_unicode_ci`. If you imported manually via phpMyAdmin, make sure the connection collation was set to `utf8mb4`.

---

## 📞 Support & Customization
- **Default WhatsApp Hotline:** Configured in `config.php` under `CONTACT_WHATSAPP`.
- **Phone Number:** Configured in `config.php` under `CONTACT_PHONE`.
- **Logo and Branding:** Can be edited directly from `config.php` or `header.php`.
