import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Service,
  ServiceRequest,
  User,
  SiteSettings,
  NotificationItem,
  Review
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_REQUESTS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  isServiceModalOpen: boolean;
  setIsServiceModalOpen: (open: boolean) => void;
  
  // Request Modal
  isRequestModalOpen: boolean;
  setIsRequestModalOpen: (open: boolean) => void;
  targetServiceForRequest: Service | null;
  openRequestModal: (service?: Service) => void;
  
  // Service Requests
  requests: ServiceRequest[];
  createRequest: (data: Partial<ServiceRequest>) => ServiceRequest;
  updateRequestStatus: (id: string, status: ServiceRequest['status'], remarks?: string) => void;
  
  // Tracking
  trackingQuery: string;
  setTrackingQuery: (q: string) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  trackedRequest: ServiceRequest | null;
  handleTrackRequest: (trackingId: string) => ServiceRequest | null;
  
  // Invoice / Receipt Modal
  receiptRequest: ServiceRequest | null;
  setReceiptRequest: (req: ServiceRequest | null) => void;
  
  // Auth
  currentUser: User | null;
  isAdmin: boolean;
  loginUser: (email: string, role?: 'customer' | 'admin') => boolean;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  
  // Site Settings
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Reviews
  reviews: Review[];
  addReview: (rev: Omit<Review, 'id' | 'date'>) => void;
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('bn');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeTab, setActiveTab] = useState<string>('home');

  // Services State with LocalStorage
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('shebapoint_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Requests State
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('shebapoint_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('shebapoint_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Current User (demo default logged in as customer or null)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shebapoint_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'মোঃ তানভীর হাসান',
      email: 'tanvir.bd@gmail.com',
      phone: '01711223344',
      role: 'customer',
      district: 'ঢাকা',
      createdAt: '2026-01-10'
    };
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const saved = localStorage.getItem('shebapoint_is_admin');
    return saved === 'true';
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [targetServiceForRequest, setTargetServiceForRequest] = useState<Service | null>(null);

  // Tracking
  const [trackingQuery, setTrackingQuery] = useState('');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackedRequest, setTrackedRequest] = useState<ServiceRequest | null>(null);

  // Receipt Modal
  const [receiptRequest, setReceiptRequest] = useState<ServiceRequest | null>(null);

  // Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Notifications & Reviews
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Persist services
  useEffect(() => {
    localStorage.setItem('shebapoint_services', JSON.stringify(services));
  }, [services]);

  // Persist requests
  useEffect(() => {
    localStorage.setItem('shebapoint_requests', JSON.stringify(requests));
  }, [requests]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('shebapoint_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist user & admin
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('shebapoint_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('shebapoint_user');
    }
    localStorage.setItem('shebapoint_is_admin', isAdmin ? 'true' : 'false');
  }, [currentUser, isAdmin]);

  const toggleLang = () => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addService = (srv: Service) => {
    setServices(prev => [srv, ...prev]);
    showToast(lang === 'bn' ? 'নতুন সেবা সফলভাবে যুক্ত করা হয়েছে!' : 'New service added successfully!');
  };

  const updateService = (srv: Service) => {
    setServices(prev => prev.map(s => s.id === srv.id ? srv : s));
    showToast(lang === 'bn' ? 'সেবা আপডেট করা হয়েছে!' : 'Service updated successfully!');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast(lang === 'bn' ? 'সেবা মুছে ফেলা হয়েছে!' : 'Service deleted!');
  };

  const openRequestModal = (service?: Service) => {
    setTargetServiceForRequest(service || services[0]);
    setIsRequestModalOpen(true);
  };

  const createRequest = (data: Partial<ServiceRequest>): ServiceRequest => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `SHB-${new Date().getFullYear()}-${randomDigits}`;
    const newReq: ServiceRequest = {
      id: `req-${Date.now()}`,
      trackingId,
      serviceId: data.serviceId || 'srv-1',
      serviceNameEn: data.serviceNameEn || 'General Citizen Service',
      serviceNameBn: data.serviceNameBn || 'নাগরিক সেবা',
      customerName: data.customerName || 'গ্রাহক',
      customerPhone: data.customerPhone || '01700000000',
      customerEmail: data.customerEmail || 'user@example.com',
      customerNid: data.customerNid || '',
      district: data.district || 'ঢাকা',
      notes: data.notes || '',
      adminRemarks: 'অনলাইন আবেদন গৃহীত হয়েছে। আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে।',
      status: 'pending',
      amount: data.amount || '৳ 350',
      paymentStatus: 'unpaid',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      documentsUploaded: data.documentsUploaded || ['nid_copy.pdf']
    };

    setRequests(prev => [newReq, ...prev]);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleEn: `Service Request Created: ${trackingId}`,
      titleBn: `নতুন আবেদন সফল: ${trackingId}`,
      messageEn: `Your request for ${newReq.serviceNameEn} has been created. Save your Tracking ID.`,
      messageBn: `${newReq.serviceNameBn} এর আবেদন সফল হয়েছে। ট্র্যাকিং আইডি সংরক্ষণ করুন।`,
      time: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(lang === 'bn' ? `আবেদন সফল! ট্র্যাকিং আইডি: ${trackingId}` : `Request submitted! Tracking ID: ${trackingId}`);
    return newReq;
  };

  const updateRequestStatus = (id: string, status: ServiceRequest['status'], remarks?: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          adminRemarks: remarks !== undefined ? remarks : r.adminRemarks,
          updatedAt: new Date().toLocaleString()
        };
      }
      return r;
    }));
    showToast(lang === 'bn' ? 'আবেদনের স্ট্যাটাস আপডেট করা হয়েছে!' : 'Request status updated!');
  };

  const handleTrackRequest = (trackingId: string): ServiceRequest | null => {
    const trimmed = trackingId.trim().toUpperCase();
    const found = requests.find(r => r.trackingId.toUpperCase() === trimmed);
    setTrackedRequest(found || null);
    setIsTrackingModalOpen(true);
    return found || null;
  };

  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    if (role === 'admin' || email.includes('admin')) {
      setIsAdmin(true);
      setCurrentUser({
        id: 'usr-admin',
        name: 'সুপার অ্যাডমিন (Admin)',
        email: 'admin@shebapointbd.com',
        phone: '01712345678',
        role: 'admin',
        district: 'ঢাকা',
        createdAt: '2026-01-01'
      });
      showToast(lang === 'bn' ? 'অ্যাডমিন প্যানেলে স্বাগতম!' : 'Welcome to Admin Panel!');
      return true;
    }

    setIsAdmin(false);
    setCurrentUser({
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      phone: '01711223344',
      role: 'customer',
      district: 'ঢাকা',
      createdAt: new Date().toLocaleDateString()
    });
    showToast(lang === 'bn' ? 'সফলভাবে লগইন করেছেন!' : 'Logged in successfully!');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    showToast(lang === 'bn' ? 'লগআউট সম্পন্ন হয়েছে!' : 'Logged out!');
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast(lang === 'bn' ? 'সাইটের সেটিংস সংরক্ষণ করা হয়েছে!' : 'Site settings saved!');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const addReview = (rev: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: 'আজকে'
    };
    setReviews(prev => [newRev, ...prev]);
    showToast(lang === 'bn' ? 'আপনার মতামতের জন্য ধন্যবাদ!' : 'Thank you for your review!');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        isDark,
        toggleTheme,
        activeTab,
        setActiveTab,
        services,
        addService,
        updateService,
        deleteService,
        selectedService,
        setSelectedService,
        isServiceModalOpen,
        setIsServiceModalOpen,
        isRequestModalOpen,
        setIsRequestModalOpen,
        targetServiceForRequest,
        openRequestModal,
        requests,
        createRequest,
        updateRequestStatus,
        trackingQuery,
        setTrackingQuery,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        trackedRequest,
        handleTrackRequest,
        receiptRequest,
        setReceiptRequest,
        currentUser,
        isAdmin,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        settings,
        updateSettings,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        notifications,
        markNotificationAsRead,
        clearNotifications,
        reviews,
        addReview,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
