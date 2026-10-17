    <!-- Floating WhatsApp and Call Buttons -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <!-- Call Button -->
        <a href="tel:<?= preg_replace('/[^0-9+]/', '', CONTACT_PHONE) ?>" class="w-12 h-12 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-600/30 transition hover:scale-110" title="Call Now">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </a>
        <!-- WhatsApp Button -->
        <a href="https://wa.me/<?= CONTACT_WHATSAPP ?>?text=<?= urlencode('Hello ShebaPoint BD, I need help regarding citizen services.') ?>" target="_blank" rel="noopener noreferrer" class="w-13 h-13 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/40 transition hover:scale-110 relative" title="Chat on WhatsApp">
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping"></span>
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.453.748.971 1.209.667.593 1.229.776 1.402.863.174.087.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.203.043.072.043.419-.101.824z"/></svg>
        </a>
    </div>

    <!-- Main Footer -->
    <footer class="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <!-- Col 1 -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
                        SP
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-lg"><?= SITE_NAME_BN ?></h4>
                        <p class="text-xs text-sky-400 font-medium">Citizen Digital Service Portal</p>
                    </div>
                </div>
                <p class="text-xs leading-relaxed text-slate-400">
                    গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ডিজিটাল সেবা গ্রহণ সহজতর করতে আমাদের এই নির্ভরযোগ্য ওয়ান-স্টপ নাগরিক সেবা প্ল্যাটফর্ম।
                </p>
                <div class="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    BDIX Superfast Hosting Server
                </div>
            </div>

            <!-- Col 2: Top Services -->
            <div class="space-y-3">
                <h5 class="text-white font-semibold text-sm tracking-wider uppercase">জনপ্রিয় সেবাসমূহ</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="services.php" class="hover:text-sky-400 transition">এনআইডি কার্ড সংশোধন ও রি-ইস্যু</a></li>
                    <li><a href="services.php" class="hover:text-sky-400 transition">নতুন জন্ম নিবন্ধন ও অনলাইন কপি</a></li>
                    <li><a href="services.php" class="hover:text-sky-400 transition">ই-পাসপোর্ট আবেদন ও নবায়ন</a></li>
                    <li><a href="services.php" class="hover:text-sky-400 transition">বিআরটিএ ড্রাইভিং লাইসেন্স</a></li>
                    <li><a href="services.php" class="hover:text-sky-400 transition">ই-নামজারি ও জমি জমাখারিজ</a></li>
                    <li><a href="services.php" class="hover:text-sky-400 transition">ই-টিন ও আয়কর রিটার্ন দাখিল</a></li>
                </ul>
            </div>

            <!-- Col 3: Useful Links -->
            <div class="space-y-3">
                <h5 class="text-white font-semibold text-sm tracking-wider uppercase">গুরুত্বপূর্ণ লিংক</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="track.php" class="hover:text-sky-400 transition">আবেদন স্ট্যাটাস চেক করুন</a></li>
                    <li><a href="about.php" class="hover:text-sky-400 transition">আমাদের সেবা নীতিমালা</a></li>
                    <li><a href="privacy.php" class="hover:text-sky-400 transition">প্রাইভেসি ও তথ্য সুরক্ষা নীতি</a></li>
                    <li><a href="terms.php" class="hover:text-sky-400 transition">শর্তাবলী ও নিয়মাবলী</a></li>
                    <li><a href="admin/login.php" class="hover:text-sky-400 transition">অ্যাডমিন প্রবেশদ্বার</a></li>
                </ul>
            </div>

            <!-- Col 4: Contact -->
            <div class="space-y-3">
                <h5 class="text-white font-semibold text-sm tracking-wider uppercase">জরুরি যোগাযোগ</h5>
                <div class="text-xs space-y-2 text-slate-400">
                    <p>📍 লেভেল ৪, ডিজিটাল সেন্টার, শাহবাগ, ঢাকা-১০০০</p>
                    <p>📞 হটলাইন: <span class="text-white font-semibold"><?= CONTACT_PHONE ?></span></p>
                    <p>💬 হোয়াটসঅ্যাপ: <span class="text-emerald-400"><?= CONTACT_WHATSAPP ?></span></p>
                    <p>✉️ ইমেইল: support@shebapointbd.com</p>
                    <p class="text-[11px] text-slate-500 pt-2">সপ্তাহে ৭ দিন (সকাল ৯:০০ - রাত ১০:০০)</p>
                </div>
            </div>
        </div>

        <div class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
            <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p>&copy; <?= date('Y') ?> <?= SITE_NAME_BN ?> (ShebaPoint BD). সর্বস্বত্ব সংরক্ষিত।</p>
                <p class="text-slate-500">ডিজাইন ও ডেভেলপমেন্ট: বাংলাদেশ অনলাইন সেবা ফ্রেমওয়ার্ক</p>
            </div>
        </div>
    </footer>

    <!-- Theme Toggle Script -->
    <script>
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

        if (document.documentElement.classList.contains('dark')) {
            lightIcon.classList.remove('hidden');
        } else {
            darkIcon.classList.remove('hidden');
        }

        themeToggleBtn.addEventListener('click', function() {
            darkIcon.classList.toggle('hidden');
            lightIcon.classList.toggle('hidden');

            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    </script>
</body>
</html>
