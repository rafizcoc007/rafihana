import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service, ServiceRequest } from '../types';
import {
  Shield,
  Layers,
  FileSpreadsheet,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  LogOut,
  FolderDown,
  Download,
  AlertTriangle,
  RefreshCw,
  Search
} from 'lucide-react';
import { downloadCpanelZip } from '../utils/cpanelZipGenerator';

export const AdminPanel: React.FC = () => {
  const {
    lang,
    isAdmin,
    loginUser,
    logoutUser,
    services,
    addService,
    updateService,
    deleteService,
    requests,
    updateRequestStatus,
    settings,
    updateSettings,
    setReceiptRequest,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'services' | 'settings'>('overview');
  const [adminEmail, setAdminEmail] = useState('admin@shebapointbd.com');
  const [adminPass, setAdminPass] = useState('');
  
  // Requests filter
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');
  const [requestSearch, setRequestSearch] = useState('');

  // Service Edit / Add Modal state
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    titleBn: '',
    titleEn: '',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    price: '৳ 350',
    priceBn: '৳ ৩৫০',
    deliveryTimeEn: '2-3 Days',
    deliveryTimeBn: '২-৩ কর্মদিবস',
    shortDescBn: '',
    shortDescEn: '',
    icon: 'FileText',
    badge: 'Popular',
    requiredDocumentsBn: ['এনআইডি বা ভোটার স্লিপ', 'পাসপোর্ট ছবি'],
    requiredDocumentsEn: ['NID or Voter Slip', 'Passport Photo'],
    stepsBn: ['অনলাইন আবেদন পূরণ', 'সরকারি ফি পরিশোধ', 'সনদ ডেলিভারি'],
    stepsEn: ['Fill form', 'Pay fee', 'Receive document']
  });

  // Settings Form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [isExportingZip, setIsExportingZip] = useState(false);

  // If not logged in as Admin, show Admin Login view
  if (!isAdmin) {
    return (
      <div className="py-20 flex items-center justify-center px-4 bg-slate-900 min-h-[70vh]">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">ShebaPoint BD Admin</h1>
            <p className="text-xs text-slate-400 mt-1">সুরক্ষিত অ্যাডমিন কন্ট্রোল প্যানেল</p>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser(adminEmail, 'admin');
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block text-slate-300 font-semibold mb-1">অ্যাডমিন ইমেইল</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                placeholder="Admin@123456"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">ডিফল্ট পাসওয়ার্ড: <code>Admin@123456</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl shadow-lg shadow-sky-500/20 transition text-xs"
            >
              অ্যাডমিন প্রবেশদ্বার &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter requests
  const filteredRequests = requests.filter(r => {
    const matchesStatus = requestFilter === 'all' || r.status === requestFilter;
    const matchesSearch =
      r.trackingId.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.customerName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.customerPhone.includes(requestSearch);
    return matchesStatus && matchesSearch;
  });

  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceForm({
      titleBn: '',
      titleEn: '',
      category: 'Identity & Civil',
      categoryBn: 'পরিচয় ও নাগরিক সনদ',
      price: '৳ 350',
      priceBn: '৳ ৩৫০',
      deliveryTimeEn: '2-3 Days',
      deliveryTimeBn: '২-৩ কর্মদিবস',
      shortDescBn: '',
      shortDescEn: '',
      icon: 'FileText',
      badge: 'New',
      requiredDocumentsBn: ['এনআইডি কপি', 'পাসপোর্ট ছবি'],
      requiredDocumentsEn: ['NID copy', 'Passport Photo'],
      stepsBn: ['অনলাইন আবেদন', 'ফি পরিশোধ', 'সনদ ডেলিভারি'],
      stepsEn: ['Online application', 'Payment', 'Certificate delivery']
    });
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (srv: Service) => {
    setEditingService(srv);
    setServiceForm({ ...srv });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.titleBn || !serviceForm.titleEn) return;

    if (editingService) {
      updateService({
        ...editingService,
        ...serviceForm,
        titleBn: serviceForm.titleBn!,
        titleEn: serviceForm.titleEn!
      } as Service);
    } else {
      const newService: Service = {
        id: `srv-${Date.now()}`,
        slug: (serviceForm.titleEn || 'new-service').toLowerCase().replace(/\s+/g, '-'),
        titleEn: serviceForm.titleEn || 'New Service',
        titleBn: serviceForm.titleBn || 'নতুন সেবা',
        category: serviceForm.category || 'Identity & Civil',
        categoryBn: serviceForm.categoryBn || 'পরিচয় ও নাগরিক সনদ',
        shortDescEn: serviceForm.shortDescEn || '',
        shortDescBn: serviceForm.shortDescBn || '',
        fullDescEn: serviceForm.shortDescEn || '',
        fullDescBn: serviceForm.shortDescBn || '',
        price: serviceForm.price || '৳ 350',
        priceBn: serviceForm.priceBn || '৳ ৩৫০',
        deliveryTimeEn: serviceForm.deliveryTimeEn || '2-3 Days',
        deliveryTimeBn: serviceForm.deliveryTimeBn || '২-৩ কর্মদিবস',
        icon: serviceForm.icon || 'FileText',
        badge: serviceForm.badge || 'New',
        requiredDocumentsEn: serviceForm.requiredDocumentsEn || ['NID Copy'],
        requiredDocumentsBn: serviceForm.requiredDocumentsBn || ['এনআইডি কপি'],
        stepsEn: serviceForm.stepsEn || ['Application', 'Processing', 'Delivery'],
        stepsBn: serviceForm.stepsBn || ['আবেদন', 'প্রক্রিয়া', 'ডেলিভারি']
      };
      addService(newService);
    }
    setServiceModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleExportZip = async () => {
    try {
      setIsExportingZip(true);
      await downloadCpanelZip();
      showToast(lang === 'bn' ? 'cPanel ZIP সফলভাবে ডাউনলোড হয়েছে!' : 'cPanel ZIP downloaded successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="py-10 bg-slate-900 text-slate-100 flex-1 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Bar */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-slate-950 font-black flex items-center justify-center">
              SP
            </div>
            <div>
              <h1 className="text-xl font-black text-white">ShebaPoint BD Admin Console</h1>
              <span className="text-xs text-sky-400 font-medium">সুপার অ্যাডমিন ড্যাশবোর্ড • BDIX Ready</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={handleExportZip}
              disabled={isExportingZip}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingZip ? 'প্যাকেজ প্রস্তুত হচ্ছে...' : 'cPanel ZIP ডাউনলোড'}</span>
            </button>

            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>সারসংক্ষেপ (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>আবেদনসমূহ ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'services'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>সেবা ক্যাটালগ ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সাইট সেটিংস</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400">সর্বমোট সক্রিয় সেবা</span>
                <div className="text-3xl font-black text-sky-400 mt-2">{services.length}</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400">সর্বমোট প্রাপ্ত আবেদন</span>
                <div className="text-3xl font-black text-white mt-2">{requests.length}</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-amber-400">অপেক্ষমান আবেদন (Pending)</span>
                <div className="text-3xl font-black text-amber-400 mt-2">
                  {requests.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-emerald-400">ডেলিভারি সম্পন্ন</span>
                <div className="text-3xl font-black text-emerald-400 mt-2">
                  {requests.filter(r => r.status === 'completed').length}
                </div>
              </div>
            </div>

            {/* Recent Orders Snippet */}
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">সর্বশেষ গ্রাহক আবেদনসমূহ</h3>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="text-xs text-sky-400 hover:underline font-bold"
                >
                  সবগুলো দেখুন &rarr;
                </button>
              </div>

              <div className="divide-y divide-slate-750 text-xs">
                {requests.slice(0, 5).map(r => (
                  <div key={r.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sky-400 font-bold block">{r.trackingId}</span>
                      <span className="text-white font-medium">{r.serviceNameBn} • {r.customerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-slate-300">
                        {r.status}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">{r.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REQUESTS MANAGEMENT */}
        {activeTab === 'requests' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2">
                {(['all', 'pending', 'processing', 'completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setRequestFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                      requestFilter === f
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  value={requestSearch}
                  onChange={e => setRequestSearch(e.target.value)}
                  placeholder="আইডি বা নাম দিয়ে ফিল্টার..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3">ট্র্যাকিং আইডি</th>
                    <th className="pb-3">গ্রাহক বিবরণ</th>
                    <th className="pb-3">সেবার নাম</th>
                    <th className="pb-3">স্ট্যাটাস পরিবর্তন</th>
                    <th className="pb-3">অফিসিয়াল মন্তব্য</th>
                    <th className="pb-3 text-right">ইনভয়েস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-750">
                  {filteredRequests.map(r => (
                    <tr key={r.id}>
                      <td className="py-4 font-mono font-bold text-sky-400">
                        {r.trackingId}
                        <span className="block text-[10px] text-slate-500 font-normal">{r.createdAt}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-white block">{r.customerName}</span>
                        <span className="text-slate-400 text-[11px] block">{r.customerPhone}</span>
                        <span className="text-slate-500 text-[10px]">{r.district}</span>
                      </td>
                      <td className="py-4 font-medium text-slate-200">
                        {r.serviceNameBn}
                        <span className="block text-sky-400 font-bold">{r.amount}</span>
                      </td>
                      <td className="py-4">
                        <select
                          value={r.status}
                          onChange={e => updateRequestStatus(r.id, e.target.value as any)}
                          className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 max-w-xs">
                        <input
                          type="text"
                          defaultValue={r.adminRemarks || ''}
                          onBlur={e => updateRequestStatus(r.id, r.status, e.target.value)}
                          placeholder="মন্তব্য বা আপডেট লিখুন..."
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => setReceiptRequest(r)}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold text-[11px] transition"
                        >
                          রিসিট
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT (ADD / EDIT / DELETE) */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">সেবা ক্যাটালগ ব্যবস্থাপনা</h3>
                <p className="text-xs text-slate-400">ওয়েবসাইটে প্রদর্শিত সকল ২০টি সেবা সম্পাদনা বা নতুন সেবা যোগ করুন</p>
              </div>
              <button
                onClick={handleOpenAddService}
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন সেবা যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.id} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                        {s.categoryBn}
                      </span>
                      <span className="text-xs font-bold text-white">{s.priceBn}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white">{s.titleBn}</h4>
                    <p className="text-[11px] text-slate-400">{s.titleEn}</p>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2">{s.shortDescBn}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">ডেলিভারি: {s.deliveryTimeBn}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditService(s)}
                        className="p-1.5 bg-slate-700 hover:bg-slate-600 text-sky-400 rounded-lg transition"
                        title="সম্পাদনা"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${s.titleBn}?`)) {
                            deleteService(s.id);
                          }
                        }}
                        className="p-1.5 bg-slate-700 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6 max-w-3xl animate-in fade-in">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">সাইট ব্র্যান্ডিং ও সাধারণ সেটিংস</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">ব্র্যান্ডের নাম (English)</label>
                <input
                  type="text"
                  value={settingsForm.brandName}
                  onChange={e => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">ব্র্যান্ডের নাম (বাংলা)</label>
                <input
                  type="text"
                  value={settingsForm.brandNameBn}
                  onChange={e => setSettingsForm({ ...settingsForm, brandNameBn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">হটলাইন ফোন নম্বর</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">হোয়াটসঅ্যাপ নম্বর (৮৮০ সহ)</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="text-xs space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">জরুরি নোটিশ বার টেক্সট (বাংলা)</label>
                <input
                  type="text"
                  value={settingsForm.noticeTickerBn}
                  onChange={e => setSettingsForm({ ...settingsForm, noticeTickerBn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">হিরো সাব-হেডলাইন (বাংলা)</label>
                <textarea
                  rows={2}
                  value={settingsForm.heroSubheadlineBn}
                  onChange={e => setSettingsForm({ ...settingsForm, heroSubheadlineBn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-sky-500/20"
            >
              সেটিংস সংরক্ষণ করুন &rarr;
            </button>
          </form>
        )}

        {/* ADD/EDIT SERVICE MODAL */}
        {serviceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto text-xs space-y-4">
              <h3 className="text-base font-bold text-white">
                {editingService ? 'সেবা সম্পাদনা করুন' : 'নতুন সেবা যুক্ত করুন'}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1">সেবার নাম (বাংলা) *</label>
                  <input
                    type="text"
                    value={serviceForm.titleBn}
                    onChange={e => setServiceForm({ ...serviceForm, titleBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">সেবার নাম (English) *</label>
                  <input
                    type="text"
                    value={serviceForm.titleEn}
                    onChange={e => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">ফি (বাংলা)</label>
                    <input
                      type="text"
                      value={serviceForm.priceBn}
                      onChange={e => setServiceForm({ ...serviceForm, priceBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">ডেলিভারি সময়</label>
                    <input
                      type="text"
                      value={serviceForm.deliveryTimeBn}
                      onChange={e => setServiceForm({ ...serviceForm, deliveryTimeBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">সংক্ষিপ্ত বিবরণ (বাংলা)</label>
                  <textarea
                    rows={2}
                    value={serviceForm.shortDescBn}
                    onChange={e => setServiceForm({ ...serviceForm, shortDescBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handleSaveService}
                  className="px-5 py-2 bg-sky-500 text-slate-950 font-black rounded-xl"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
