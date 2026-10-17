export type Language = 'bn' | 'en';

export interface Service {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  shortDescEn: string;
  shortDescBn: string;
  fullDescEn: string;
  fullDescBn: string;
  price: string;
  priceBn: string;
  deliveryTimeEn: string;
  deliveryTimeBn: string;
  icon: string;
  badge?: string;
  badgeBn?: string;
  requiredDocumentsEn: string[];
  requiredDocumentsBn: string[];
  stepsEn: string[];
  stepsBn: string[];
  officialFee?: string;
  serviceCharge?: string;
  popular?: boolean;
}

export type RequestStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  trackingId: string;
  serviceId: string;
  serviceNameEn: string;
  serviceNameBn: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNid?: string;
  district: string;
  notes: string;
  adminRemarks?: string;
  status: RequestStatus;
  amount: string;
  paymentStatus: 'unpaid' | 'paid' | 'partial';
  createdAt: string;
  updatedAt: string;
  documentsUploaded?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  district?: string;
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  brandNameBn: string;
  tagline: string;
  taglineBn: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressBn: string;
  noticeTicker: string;
  noticeTickerBn: string;
  heroHeadline: string;
  heroHeadlineBn: string;
  heroSubheadline: string;
  heroSubheadlineBn: string;
}

export interface Review {
  id: string;
  name: string;
  district: string;
  rating: number;
  commentEn: string;
  commentBn: string;
  serviceName: string;
  date: string;
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleBn: string;
  messageEn: string;
  messageBn: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}
