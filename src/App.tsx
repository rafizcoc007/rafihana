import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ServicesPage } from './components/ServicesPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CPanelPackageViewer } from './components/CPanelPackageViewer';
import { AboutPage } from './components/AboutPage';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { TrackRequestModal } from './components/TrackRequestModal';
import { PrintableReceiptModal } from './components/PrintableReceiptModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { lang, activeTab, setActiveTab, services, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white border border-sky-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content based on activeTab */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && (
          <>
            {/* Hero Section with AI Smart Search */}
            <Hero />

            {/* Featured Bento Services Grid */}
            <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {lang === 'bn' ? 'শীর্ষ চাহিদাসম্পন্ন সেবা' : 'Top Citizen Services'}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
                      {lang === 'bn' ? 'আমাদের জনপ্রিয় অনলাইন সেবাসমূহ' : 'Featured Digital Services'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {lang === 'bn'
                        ? 'আপনার প্রয়োজনীয় সেবা বাছাই করে ঘরে বসেই দ্রুত সমাধান পান।'
                        : 'Choose your desired service and submit with verified document requirements.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition self-start sm:self-auto group"
                  >
                    <span>{lang === 'bn' ? 'সকল ২০টি সেবা দেখুন' : 'Explore All 20 Services'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.slice(0, 6).map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-xl shadow-sky-600/25 transition transform hover:-translate-y-0.5"
                  >
                    {lang === 'bn' ? 'সকল ২০টি নাগরিক সেবা ও চার্জ দেখুন &rarr;' : 'View All 20 Citizen Services &rarr;'}
                  </button>
                </div>
              </div>
            </section>

            {/* How It Works (4 Steps) */}
            <HowItWorks />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Customer Testimonials */}
            <Testimonials />

            {/* Interactive FAQ Section */}
            <FaqSection />

            {/* Bottom Call to Action Section */}
            <section className="py-20 bg-gradient-to-b from-white to-sky-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200/80 dark:border-slate-800">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-600 to-cyan-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-sky-500/25">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
                  {lang === 'bn'
                    ? 'আজই শুরু করুন আপনার কাঙ্ক্ষিত সেবা'
                    : 'Get Your Citizen Document Application Started Today'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'সরকারি অফিসে দীর্ঘ লাইনের ঝামেলা এড়িয়ে ঘরে বসেই স্বচ্ছতার সাথে সেবা গ্রহণ করুন।'
                    : 'Save valuable time and travel expenses by utilizing our trusted digital assistance.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-sky-600/30 transition hover:-translate-y-0.5"
                  >
                    {lang === 'bn' ? 'সেবা তালিকা দেখুন' : 'Explore All Services'}
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('cpanel-package');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-sm rounded-xl transition hover:-translate-y-0.5"
                  >
                    {lang === 'bn' ? 'BDIX cPanel প্যাকেজ' : 'cPanel Deployment'}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'services' && <ServicesPage />}
        {activeTab === 'dashboard' && <CustomerDashboard />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'cpanel-package' && <CPanelPackageViewer />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Global Modals */}
      <ServiceDetailsModal />
      <ServiceRequestModal />
      <TrackRequestModal />
      <PrintableReceiptModal />
      <CustomerAuthModal />

      {/* Floating Buttons (WhatsApp, Call, Scroll to Top) */}
      <FloatingActions />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
