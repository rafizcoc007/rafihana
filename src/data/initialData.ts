import { Service, ServiceRequest, User, SiteSettings, Review, NotificationItem } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    slug: 'nid-card-correction-reissue',
    titleEn: 'NID Card Correction / Reissue',
    titleBn: 'এনআইডি কার্ড সংশোধন ও রি-ইস্যু',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    shortDescEn: 'Correction of name, date of birth, address, or parent names on national ID card and lost card re-issuance.',
    shortDescBn: 'জাতীয় পরিচয়পত্রের নাম, জন্মতারিখ, পিতা-মাতার নাম বা ঠিকানা সংশোধন এবং হারানো এনআইডি নতুন করে উত্তোলন।',
    fullDescEn: 'We provide full legal online assistance for Bangladesh Election Commission NID correction, online slip download, smart card status check, and re-issuance requests with proper supporting documents.',
    fullDescBn: 'বাংলাদেশ নির্বাচন কমিশনের অনলাইন সিস্টেমের মাধ্যমে এনআইডি কার্ডের তথ্য সংশোধন, অনলাইন কপি ডাউনলোড এবং হারানো কার্ড উত্তোলনের সম্পূর্ণ সহযোগিতা।',
    price: '৳ 350',
    priceBn: '৳ ৩৫০',
    deliveryTimeEn: '2-5 Working Days',
    deliveryTimeBn: '২-৫ কর্মদিবস',
    icon: 'CreditCard',
    badge: 'Most Popular',
    badgeBn: 'সবচেয়ে জনপ্রিয়',
    popular: true,
    requiredDocumentsEn: [
      'Current NID or Form Number',
      'SSC/JSC Certificate copy (for DOB/Name)',
      'Digital Birth Certificate copy',
      'Parents NID copy (for parent name change)',
      'GD copy from Thana (if NID is lost)'
    ],
    requiredDocumentsBn: [
      'বর্তমান এনআইডি বা ভোটার স্লিপ নম্বর',
      'এসএসসি/জেএসসি সনদের ফটোকপি (বয়স ও নাম সংশোধনে)',
      'ডিজিটাল জন্ম সনদের অনলাইন কপি',
      'পিতা ও মাতার এনআইডি কপি',
      'থানার জিডি কপি (হারানো কার্ড উত্তোলনের ক্ষেত্রে)'
    ],
    stepsEn: [
      'Document review & gap verification',
      'Submission of online application on EC Portal',
      'Payment of government fee via mobile banking',
      'Tracking & delivery of official revised slip/card'
    ],
    stepsBn: [
      'কাগজপত্র যাচাই ও প্রয়োজনীয় প্রমাণ নির্ধারণ',
      'নির্বাচন কমিশন পোর্টালে অনলাইন আবেদন দাখিল',
      'সরকারি ফি মোবাইল ব্যাংকিংয়ে পরিশোধ',
      'ট্র্যাকিং ও সংশোধিত ডিজিটাল কপি সরবরাহ'
    ],
    officialFee: '৳ 230 - ৳ 460 (Govt Fee)',
    serviceCharge: '৳ 120'
  },
  {
    id: 'srv-2',
    slug: 'birth-registration-new-correction',
    titleEn: 'Birth Registration (New & Correction)',
    titleBn: 'নতুন জন্ম নিবন্ধন ও সংশোধন',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    shortDescEn: 'Fresh online digital birth certificate application and correction of Bangla/English spelling mistakes.',
    shortDescBn: 'অনলাইন ডিজিটাল ১৭ ডিজিটের নতুন জন্ম নিবন্ধন আবেদন এবং বিদ্যমান সনদের ভুল সংশোধন সেবা।',
    fullDescEn: 'Digital 17-digit Birth Registration certificate application under the Union Parishad or City Corporation system. Fast processing with bilingual verification.',
    fullDescBn: 'ইউনিয়ন পরিষদ, পৌরসভা বা সিটি করপোরেশনের আওতাধীন ডিজিটাল ১৭ ডিজিটের জন্ম নিবন্ধন সনদ আবেদন ও দ্রুত ডেলিভারি সহায়তা।',
    price: '৳ 250',
    priceBn: '৳ ২৫০',
    deliveryTimeEn: '3-7 Working Days',
    deliveryTimeBn: '৩-৭ কর্মদিবস',
    icon: 'Baby',
    badge: 'Essential',
    badgeBn: 'জরুরি সেবা',
    popular: true,
    requiredDocumentsEn: [
      'EPI Vaccination card (for children under 5)',
      'Hospital Birth Slip or Doctor Certificate',
      'Parents 17-digit online birth certificate & NID',
      'Holding tax receipt or electricity bill'
    ],
    requiredDocumentsBn: [
      'ইপিআই টিকার কার্ড (৫ বছরের কম শিশুর জন্য)',
      'হাসপাতালের বার্থ স্লিপ বা ডাক্তারের প্রত্যয়ন',
      'পিতা-মাতার ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন ও এনআইডি',
      'হোল্ডিং ট্যাক্স রশিদ অথবা বিদ্যুৎ বিলের কপি'
    ],
    stepsEn: [
      'Form preparation on BDRIS portal',
      'Verification of Union / Ward Councilor office details',
      'Submission & token generation for office verification',
      'Assistance until official certificate issuance'
    ],
    stepsBn: [
      'বিডিআরআইএস পোর্টালে নিখুঁত অনলাইন ফর্ম পূরণ',
      'ইউনিয়ন পরিষদ বা ওয়ার্ড কাউন্সিলর অফিসে সাবমিশন',
      'আবেদন ট্র্যাকিং ও দ্রুত অনুমোদন ট্র্যাকিং',
      'ডিজিটাল সনদপত্র সংগ্রহ সহায়তা'
    ],
    officialFee: '৳ 50 - ৳ 100',
    serviceCharge: '৳ 150'
  },
  {
    id: 'srv-3',
    slug: 'death-registration',
    titleEn: 'Death Registration Certificate',
    titleBn: 'মৃত্যু নিবন্ধন সনদ আবেদন',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    shortDescEn: 'Official government online death registration for inheritance and legal documentation.',
    shortDescBn: 'উত্তরাধিকার ও আইনগত প্রক্রিয়ার জন্য সরকারি অনলাইন মৃত্যু নিবন্ধন সনদ আবেদন সেবা।',
    fullDescEn: 'Accurate online filing of death certificate on the national portal with proper cemetery/hospital slip documentation.',
    fullDescBn: 'জাতীয় বিডিআরআইএস পোর্টালে হাসপাতালের মৃত্যু প্রত্যয়ন ও কবরস্থান স্লিপসহ নির্ভুল মৃত্যু নিবন্ধন আবেদন।',
    price: '৳ 300',
    priceBn: '৳ ৩০০',
    deliveryTimeEn: '3-5 Working Days',
    deliveryTimeBn: '৩-৫ কর্মদিবস',
    icon: 'FileBadge',
    requiredDocumentsEn: [
      'Hospital Death Certificate or Medical Certificate',
      'Deceased person’s NID or Birth Certificate',
      'Applicant’s NID copy & relationship proof',
      'Graveyard / Cremation ground slip'
    ],
    requiredDocumentsBn: [
      'হাসপাতালের ডেথ সার্টিফিকেট বা ডাক্তারের প্রত্যয়নপত্র',
      'মৃত ব্যক্তির এনআইডি অথবা জন্ম নিবন্ধন কপি',
      'আবেদনকারী ওয়ারিশের এনআইডি ও সম্পর্কের প্রমাণ',
      'কবরস্থান বা শ্মশানের দাফন/দাহ সনদ'
    ],
    stepsEn: [
      'Verification of legal heir details',
      'Online BDRIS registration submission',
      'Submission of documents to local registry authority'
    ],
    stepsBn: [
      'ওয়ারিশ ও মৃত্যুর সনদপত্র যাচাই',
      'বিডিআরআইএস পোর্টালে অনলাইন ফর্ম সাবমিশন',
      'স্থানীয় কর্তৃপক্ষের অনুমোদন ও সনদ ডাউনলোড'
    ]
  },
  {
    id: 'srv-4',
    slug: 'epassport-application-renewal',
    titleEn: 'e-Passport Application / Renewal',
    titleBn: 'ই-পাসপোর্ট আবেদন ও নবায়ন',
    category: 'Transport & Travel',
    categoryBn: 'পরিবহন ও ভ্রমণ সেবা',
    shortDescEn: 'New 48/64 page e-Passport online form submission, bank fee payment, and biometric appointment booking.',
    shortDescBn: 'নতুন ই-পাসপোর্ট আবেদন, মেয়াদোত্তীর্ণ পাসপোর্ট রিনিউ, সরকারি ব্যাংক চালান ও বায়োমেট্রিক স্লট বুকিং।',
    fullDescEn: 'Complete end-to-end guidance for Bangladesh e-Passport. We fill out the online form with 100% accuracy matching your NID, generate bank deposit slip or pay online, and secure your passport office date.',
    fullDescBn: 'এনআইডির সাথে শতভাগ তথ্য মিল রেখে ই-পাসপোর্টের অনলাইন ফর্ম পূরণ, সরকারি ফি চালান তৈরি ও দ্রুত বায়োমেট্রিক অ্যাপয়েন্টমেন্ট তারিখ বুকিং।',
    price: '৳ 500',
    priceBn: '৳ ৫০০',
    deliveryTimeEn: '24-48 Hours (Application)',
    deliveryTimeBn: '২৪-৪৮ ঘণ্টা (আবেদন সম্পন্ন)',
    icon: 'Compass',
    badge: 'High Demand',
    badgeBn: 'বেশি চাহিদাসম্পন্ন',
    popular: true,
    requiredDocumentsEn: [
      'Original Smart NID Card or 17-digit Birth Certificate',
      'Old Passport photocopy (if renewal)',
      'Educational or Professional Certificate (if applicable)',
      'Marriage Certificate (Nikahnama) if married'
    ],
    requiredDocumentsBn: [
      'আসল স্মার্ট এনআইডি অথবা ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন',
      'পূর্বের পাসপোর্টের ফটোকপি (নবায়নের ক্ষেত্রে)',
      'শিক্ষাগত সনদ বা পেশাগত প্রত্যয়ন (প্রযোজ্য ক্ষেত্রে)',
      'বিবাহিত হলে নিকাহনামা বা ম্যারেজ সার্টিফিকেট'
    ],
    stepsEn: [
      'Personal data match with national database',
      'Online form submission on e-Passport portal',
      'Bank payment slip generated (Sonali Bank / bKash / Nagad)',
      'Printed application summary & payment receipt ready for RPO visit'
    ],
    stepsBn: [
      'এনআইডি ডেটাবেজের সাথে তথ্যের শতভাগ সমন্বয় যাচাই',
      'ই-পাসপোর্ট পোর্টালে অনলাইন ফর্ম জমা',
      'সরকারি ব্যাংক চালান স্লিপ প্রস্তুত',
      'অ্যাপয়েন্টমেন্ট সামারি ও বারকোডযুক্ত ডেলিভারি ফাইল রেডি'
    ],
    officialFee: 'Govt Fee (৳4025 / ৳5750 / ৳8050 based on urgency)',
    serviceCharge: '৳ 500'
  },
  {
    id: 'srv-5',
    slug: 'driving-license-new-renewal',
    titleEn: 'Driving License (New / Renewal)',
    titleBn: 'ড্রাইভিং লাইসেন্স নতুন ও নবায়ন',
    category: 'Transport & Travel',
    categoryBn: 'পরিবহন ও ভ্রমণ সেবা',
    shortDescEn: 'BRTA BSCIS online learner license, smart card driving license application, and license renewal.',
    shortDescBn: 'বিআরটিএ লার্নার ড্রাইভিং লাইসেন্স, পেশাদার ও অপেশাদার স্মার্ট কার্ড লাইসেন্স আবেদন ও নবায়ন।',
    fullDescEn: 'Seamless BRTA service assistance. We apply for the e-Learner driving permit, schedule the field test, pay licensing fees, and assist with smart card biometrics.',
    fullDescBn: 'বিআরটিএ সেবা পোর্টালের মাধ্যমে লার্নার লাইসেন্স তৈরি, ব্যবহারিক পরীক্ষার প্রস্তুতি সহায়তা ও স্মার্ট ড্রাইভিং লাইসেন্স নবায়ন।',
    price: '৳ 450',
    priceBn: '৳ ৪৫০',
    deliveryTimeEn: '1-3 Working Days',
    deliveryTimeBn: '১-৩ কর্মদিবস',
    icon: 'Car',
    popular: true,
    requiredDocumentsEn: [
      'Smart NID or 17-digit online birth certificate',
      'Registered MBBS Doctor Medical Fitness Certificate',
      'Educational Certificate (Minimum 8th pass / JSC)',
      'Passport size digital photo'
    ],
    requiredDocumentsBn: [
      'স্মার্ট এনআইডি কার্ডের রঙিন কপি',
      'রেজিস্টার্ড এমবিবিএস ডাক্তারের মেডিকেল সার্টিফিকেট ফর্ম',
      'ন্যূনতম ৮ম শ্রেণি বা জেএসসি পাসের শিক্ষাগত সনদ',
      'সদ্য তোলা পাসপোর্ট সাইজ রঙিন ছবি'
    ],
    stepsEn: [
      'BRTA portal user registration',
      'Medical certificate upload & learner issuance',
      'Examination slot booking & fee payment',
      'Final smart card application processing'
    ],
    stepsBn: [
      'বিআরটিএ পোর্টালে প্রোফাইল তৈরি',
      'মেডিকেল সার্টিফিকেট আপলোড ও তাৎক্ষণিক লার্নার ডাউনলোড',
      'পরীক্ষার স্লট বুকিং ও ফি প্রদান',
      'চূড়ান্ত স্মার্ট ড্রাইভিং লাইসেন্স আবেদন জমা'
    ]
  },
  {
    id: 'srv-6',
    slug: 'brta-vehicle-registration-fitness',
    titleEn: 'BRTA Vehicle Registration & Fitness',
    titleBn: 'বিআরটিএ যানবাহন নিবন্ধন ও ফিটনেস',
    category: 'Transport & Travel',
    categoryBn: 'পরিবহন ও ভ্রমণ সেবা',
    shortDescEn: 'Online tax token renewal, vehicle fitness slot booking, ownership transfer, and registration assistance.',
    shortDescBn: 'মোটরসাইকেল ও গাড়ির ট্যাক্স টোকেন নবায়ন, ফিটনেস অ্যাপয়েন্টমেন্ট ও মালিকানা বদলি ফর্ম প্রস্তুত।',
    fullDescEn: 'Skip the serpentine lines at BRTA. Pay your motor vehicle taxes online, download authentic digital tax tokens, and book fitness inspection appointments.',
    fullDescBn: 'বিআরটিএ অফিসের ঝামেলা এড়িয়ে অনলাইনে মোটরযানের ট্যাক্স টোকেন নবায়ন, ডিজিটাল পেমেন্ট ও ফিটনেস পরিদর্শনের তারিখ বুকিং।',
    price: '৳ 400',
    priceBn: '৳ ৪০০',
    deliveryTimeEn: '24-48 Hours',
    deliveryTimeBn: '২৪-৪৮ ঘণ্টা',
    icon: 'Truck',
    requiredDocumentsEn: [
      'Vehicle Registration Certificate (Blue Book / Card)',
      'Previous Tax Token & Fitness Certificate copy',
      'Insurance document',
      'Owner NID copy'
    ],
    requiredDocumentsBn: [
      'গাড়ির রেজিস্ট্রেশন সনদ (ব্লু-বুক বা ডিজিটাল কার্ড)',
      'পূর্বের ট্যাক্স টোকেন ও ফিটনেস সার্টিফিকেটের ফটোকপি',
      'হালনাগাদ ইন্স্যুরেন্স কপি',
      'মালিকের এনআইডি কার্ডের কপি'
    ],
    stepsEn: [
      'Vehicle ledger verification on BRTA system',
      'Tax & fitness arrears calculation',
      'Online payment execution',
      'Official downloadable QR-coded digital tax token'
    ],
    stepsBn: [
      'বিআরটিএ সিস্টেমে গাড়ির লেজার ও বকেয়া যাচাই',
      'ট্যাক্স টোকেন ও ফিটনেস ফি হিসাব',
      'অনলাইন পেমেন্ট সম্পন্নকরণ',
      'কিউআর কোড সম্বলিত আসল ট্যাক্স টোকেন ডাউনলোড'
    ]
  },
  {
    id: 'srv-7',
    slug: 'etin-registration',
    titleEn: 'e-TIN Registration & Correction',
    titleBn: 'ই-টিন সার্টিফিকেট তৈরি ও সংশোধন',
    category: 'Tax & Business',
    categoryBn: 'কর ও ব্যবসা সেবা',
    shortDescEn: 'Instant 12-digit e-TIN certificate generation and NID-matched taxpayer profile updates.',
    shortDescBn: 'জাতীয় রাজস্ব বোর্ডের ১২ ডিজিটের ই-টিন সার্টিফিকেট তৈরি এবং নাম বা ঠিকানা সংশোধন।',
    fullDescEn: 'Get your official 12-digit Taxpayer Identification Number (e-TIN) issued from the National Board of Revenue (NBR) system in less than 30 minutes.',
    fullDescBn: 'জাতীয় রাজস্ব বোর্ড (এনবিআর) থেকে মাত্র ৩০ মিনিটে ভেরিফায়েড ১২ ডিজিটের ই-টিন সার্টিফিকেট ডাউনলোড ও সংশোধন সেবা।',
    price: '৳ 200',
    priceBn: '৳ ২০০',
    deliveryTimeEn: '30 Minutes - 2 Hours',
    deliveryTimeBn: '৩০ মিনিট - ২ ঘণ্টা',
    icon: 'FileText',
    badge: 'Instant Delivery',
    badgeBn: 'তাৎক্ষণিক ডেলিভারি',
    popular: true,
    requiredDocumentsEn: [
      'National ID (NID) Card',
      'Active mobile phone number (for OTP verification)',
      'Business/trade address (if business TIN)'
    ],
    requiredDocumentsBn: [
      'জাতীয় পরিচয়পত্র (এনআইডি)',
      'সক্রিয় মোবাইল নম্বর (ওটিপি ভেরিফিকেশনের জন্য)',
      'বর্তমান ও স্থায়ী ঠিকানা / ব্যবসা প্রতিষ্ঠানের ঠিকানা'
    ],
    stepsEn: [
      'NBR Tax Portal account creation',
      'Election Commission NID live verification',
      'Instant e-TIN certificate generation & PDF delivery'
    ],
    stepsBn: [
      'এনবিআর ট্যাক্স পোর্টালে নিবন্ধন',
      'নির্বাচন কমিশনের এনআইডি লাইভ ভেরিফিকেশন',
      'তাৎক্ষণিক ১২ ডিজিট সার্টিফিকেট তৈরি ও পিডিএফ প্রিন্ট'
    ]
  },
  {
    id: 'srv-8',
    slug: 'income-tax-return-submission',
    titleEn: 'Income Tax Return Submission',
    titleBn: 'আয়কর রিটার্ন দাখিল ও ট্যাক্স ফাইল',
    category: 'Tax & Business',
    categoryBn: 'কর ও ব্যবসা সেবা',
    shortDescEn: 'Complete e-Return filing, wealth statement submission, and official PSR tax acknowledgement receipt.',
    shortDescBn: 'অনলাইন ই-রিটার্ন দাখিল, সম্পদ বিবরণী প্রস্তুত এবং সরকারি ট্যাক্স প্রাপ্তি স্বীকারপত্র (পিএসআর) উত্তোলন।',
    fullDescEn: 'Accurate income tax computation for salaried individuals, small business owners, and freelancers. We calculate exemptions, submit the e-Return to NBR, and provide the official Tax Return Certificate.',
    fullDescBn: 'চাকরিজীবী, ব্যবসায়ী ও ফ্রিল্যান্সারদের জন্য নিখুঁত আয়কর হিসাব, অনলাইন রিটার্ন দাখিল ও তাৎক্ষণিক পিএসআর সার্টিফিকেট সংগ্রহ।',
    price: '৳ 600',
    priceBn: '৳ ৬০০',
    deliveryTimeEn: '1-2 Working Days',
    deliveryTimeBn: '১-২ কর্মদিবস',
    icon: 'Receipt',
    badge: 'Govt Mandatory',
    badgeBn: 'সরকারি বাধ্যতামূলক',
    popular: true,
    requiredDocumentsEn: [
      'e-TIN Certificate & registered mobile number',
      'Salary certificate / Bank statement for past fiscal year',
      'Investment / insurance proofs (for rebate)',
      'Asset details (land, car, savings certificate)'
    ],
    requiredDocumentsBn: [
      'ই-টিন সার্টিফিকেট ও এনবিআর এ নিবন্ধিত মোবাইল সিম',
      'বাৎসরিক ব্যাংক স্টেটমেন্ট ও বেতন সনদ',
      'বিনিয়োগ বা ডিপিএস প্রমাণপত্র (কর রেয়াতের জন্য)',
      'স্থাবর ও অস্থাবর সম্পত্তির বিবরণ'
    ],
    stepsEn: [
      'Financial evaluation and tax liability calculation',
      'Form preparation on NBR eReturn portal',
      'Submission and issuance of official PSR Tax Certificate'
    ],
    stepsBn: [
      'আয়-ব্যয় ও সম্পদের নিখুঁত মূল্যায়ন',
      'এনবিআর ই-রিটার্ন পোর্টালে ফর্ম পূরণ',
      'রিটার্ন সাবমিশন ও সরকারি প্রাপ্তি স্বীকারপত্র প্রদান'
    ]
  },
  {
    id: 'srv-9',
    slug: 'vat-registration',
    titleEn: 'VAT Registration (BIN Certificate)',
    titleBn: 'অনলাইন ভ্যাট রেজিস্ট্রেশন ও বিন (BIN)',
    category: 'Tax & Business',
    categoryBn: 'কর ও ব্যবসা সেবা',
    shortDescEn: '13-digit Business Identification Number (BIN) registration from NBR IVAS portal.',
    shortDescBn: 'জাতীয় রাজস্ব বোর্ডের অনলাইন সিস্টেম থেকে ১৩ ডিজিটের ব্যবসায়িক ভ্যাট নিবন্ধন (বিন সার্টিফিকেট)।',
    fullDescEn: 'Acquire your company or trade business 13-digit online VAT registration (BIN) within 48 hours for tender participation, banking, and import-export.',
    fullDescBn: 'টেন্ডার, ব্যাংক লোন এবং বাণিজ্যিক কার্যক্রম পরিচালনার জন্য ১৩ ডিজিটের অনলাইন বিজনেস আইডেন্টিফিকেশন নম্বর (BIN) দ্রুত উত্তোলন।',
    price: '৳ 700',
    priceBn: '৳ ৭০০',
    deliveryTimeEn: '2-3 Working Days',
    deliveryTimeBn: '২-৩ কর্মদিবস',
    icon: 'Percent',
    requiredDocumentsEn: [
      'Valid Trade License copy',
      'Owner e-TIN certificate and NID card',
      'Bank Solvency Certificate or statement',
      'Office rental agreement and electricity bill'
    ],
    requiredDocumentsBn: [
      'হালনাগাদ ট্রেড লাইসেন্সের কপি',
      'মালিকের ই-টিন সার্টিফিকেট ও এনআইডি',
      'ব্যাংক সলভেন্সি সার্টিফিকেট বা স্টেটমেন্ট',
      'অফিস ভাড়ার চুক্তিপত্র ও বিদ্যুৎ বিলের কপি'
    ],
    stepsEn: [
      'IVAS account registration',
      'Business profile setup with economic activity codes',
      'VAT circle assignment & certificate generation'
    ],
    stepsBn: [
      'আইভাস পোর্টালে কোম্পানি প্রোফাইল তৈরি',
      'বিজনেস কোড ও সঠিক সার্কেল নির্বাচন',
      'অনুমোদন ট্র্যাকিং ও ১৩ ডিজিটের বিন সার্টিফিকেট সরবরাহ'
    ]
  },
  {
    id: 'srv-10',
    slug: 'trade-license',
    titleEn: 'Trade License (New & Renewal)',
    titleBn: 'নতুন ট্রেড লাইসেন্স ও নবায়ন',
    category: 'Tax & Business',
    categoryBn: 'কর ও ব্যবসা সেবা',
    shortDescEn: 'E-Trade license issuance under Dhaka/Chittagong City Corporations, Pourashava, or Union Parishad.',
    shortDescBn: 'সিটি করপোরেশন, পৌরসভা বা ইউনিয়ন পরিষদের আওতাধীন ই-ট্রেড লাইসেন্স নতুন আবেদন ও নবায়ন।',
    fullDescEn: 'Establish your legal business footprint. We file electronic trade license applications across City Corporations and municipalities with verified signboards and holding clearances.',
    fullDescBn: 'যেকোনো ব্যবসা শুরু বা ব্যাংক অ্যাকাউন্ট খোলার জন্য সিটি করপোরেশন ও পৌরসভা থেকে ডিজিটাল ই-ট্রেড লাইসেন্স সংগ্রহ সহায়তা।',
    price: '৳ 550',
    priceBn: '৳ ৫৫০',
    deliveryTimeEn: '2-4 Working Days',
    deliveryTimeBn: '২-৪ কর্মদিবস',
    icon: 'Briefcase',
    popular: true,
    requiredDocumentsEn: [
      'Owner NID and passport photo',
      'Shop/office rental agreement or holding tax receipt',
      'e-TIN certificate',
      'Bank statement (for limited companies)'
    ],
    requiredDocumentsBn: [
      'মালিকের এনআইডি ও পাসপোর্ট সাইজ ছবি',
      'দোকান/অফিস ভাড়ার চুক্তিপত্র অথবা হোল্ডিং ট্যাক্স রশিদ',
      'মালিকের ই-টিন সার্টিফিকেট',
      'কোম্পানির ক্ষেত্রে মেমোরেন্ডাম ও কার্যবিবরণী'
    ],
    stepsEn: [
      'Online municipal portal filing',
      'Category selection and fee assessment',
      'Ward inspector verification liaison',
      'Digital licensed certificate delivery'
    ],
    stepsBn: [
      'অনলাইন পৌরসভা/সিটি করপোরেশন পোর্টালে আবেদন',
      'ব্যবসায়িক ক্যাটাগরি ও ট্রেড ফি নির্ধারণ',
      'অনুমোদন ট্র্যাকিং ও সরকারি চালান পরিশোধ',
      'ডিজিটাল সিলযুক্ত ই-ট্রেড লাইসেন্স ডেলিভারি'
    ]
  },
  {
    id: 'srv-11',
    slug: 'company-business-registration-rjsc',
    titleEn: 'Company / Business Registration (RJSC)',
    titleBn: 'কোম্পানি ও ফার্ম নিবন্ধন (RJSC)',
    category: 'Tax & Business',
    categoryBn: 'কর ও ব্যবসা সেবা',
    shortDescEn: 'RJSC Name Clearance, Memorandum & Articles drafting, and Private Limited company incorporation.',
    shortDescBn: 'আরজেএসসি থেকে কোম্পানির নাম ছাড়পত্র, মেমোরেন্ডাম ড্রাফটিং ও প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন।',
    fullDescEn: 'Professional legal registration for Private Limited companies, One Person Companies (OPC), and partnership firms under the Registrar of Joint Stock Companies and Firms (RJSC).',
    fullDescBn: 'আরজেএসসি থেকে নাম ছাড়পত্র নেওয়া, মেমোরেন্ডাম ও আর্টিকেল অফ অ্যাসোসিয়েশন প্রস্তুতকরণ এবং ইনকর্পোরেশন সার্টিফিকেট প্রাপ্তি।',
    price: 'Contact for price',
    priceBn: 'যোগাযোগ করে জানুন',
    deliveryTimeEn: '7-14 Working Days',
    deliveryTimeBn: '৭-১৪ কর্মদিবস',
    icon: 'Building2',
    requiredDocumentsEn: [
      'Proposed company names (at least 3)',
      'All directors NID, TIN, and passport photos',
      'Registered office address in Bangladesh',
      'Authorized and paid-up capital structure'
    ],
    requiredDocumentsBn: [
      'পছন্দনীয় ৩টি কোম্পানির ইংরেজি নাম',
      'সকল পরিচালকের এনআইডি, ই-টিন ও পাসপোর্ট ছবি',
      'কোম্পানির নিবন্ধিত প্রধান কার্যালয়ের ঠিকানা',
      'শেয়ার ক্যাপিটালের অনুপাত ও দায়িত্ব বণ্টন'
    ],
    stepsEn: [
      'RJSC Name clearance application and approval',
      'Drafting MOA and AOA by corporate advocate',
      'Registration filing, digital stamp duty payment',
      'Certificate of Incorporation & Form XII handover'
    ],
    stepsBn: [
      'আরজেএসসি নাম ছাড়পত্র আবেদন ও অনুমোদন গ্রহণ',
      'আইনজীবী দ্বারা মেমোরেন্ডাম ও আর্টিকেলস প্রস্তুত',
      'সরকারি ফি ও স্ট্যাম্প ডিউটি প্রদান',
      'ইনকর্পোরেশন সার্টিফিকেট ও ফর্ম-১২ হস্তান্তর'
    ]
  },
  {
    id: 'srv-12',
    slug: 'land-mutation-namjari',
    titleEn: 'Land Mutation (e-Namjari)',
    titleBn: 'ই-নামজারি ও জমাখারিজ আবেদন',
    category: 'Land & Legal',
    categoryBn: 'ভূমি ও আইনি সেবা',
    shortDescEn: 'Online e-Mutation (Namjari), DCR payment, and mutation khatian issuance under AC Land office.',
    shortDescBn: 'সহকারী কমিশনার (ভূমি) অফিসের মাধ্যমে অনলাইন ই-নামজারি, ডিসিআর ফি প্রদান ও খতিয়ান সংগ্রহ।',
    fullDescEn: 'Safeguard your real estate ownership with seamless digital land mutation (e-Namjari). We submit your deed, trace chain of ownership, track hearing dates, and ensure DCR download.',
    fullDescBn: 'জমির মালিকানা নিশ্চিত করতে সহকারী কমিশনার (ভূমি) অফিসে ই-নামজারি আবেদন, কাগজপত্র আপলোড ও ডিসিআর পরিশোধ করে অনলাইন খতিয়ান সংগ্রহ।',
    price: '৳ 650',
    priceBn: '৳ ৬৫০',
    deliveryTimeEn: '15-28 Working Days',
    deliveryTimeBn: '১৫-২৮ কর্মদিবস',
    icon: 'MapPin',
    badge: 'Legal Essential',
    badgeBn: 'আইনি জরুরি সেবা',
    popular: true,
    requiredDocumentsEn: [
      'Registered Sale Deed (Dalil) copy',
      'Previous Khatian (CS, SA, RS, BS / City Porcha)',
      'Up-to-date Land Development Tax (Khajna) receipt',
      'Applicant NID & Warishan certificate (if inherited)'
    ],
    requiredDocumentsBn: [
      'রেজিস্ট্রিকৃত ক্রয় বা হেবা দলিলের ফটোকপি',
      'পূর্বের খতিয়ান (সিএস, এসএ, আরএস, বিএস বা সিটি জরিপ)',
      'হালনাগাদ ভূমি উন্নয়ন কর (দাখিলা/খাজনা) রশিদ',
      'আবেদনকারীর এনআইডি ও ওয়ারিশান সনদ (ওয়ারিশি সম্পত্তির ক্ষেত্রে)'
    ],
    stepsEn: [
      'Deed and chain verification by land specialist',
      'Online filing on mutation.land.gov.bd',
      'Union Land Officer hearing tracking',
      'DCR payment (৳1100 govt) and Khatian printout'
    ],
    stepsBn: [
      'দলিল ও খতিয়ানের লিংক চেইন যাচাই',
      'ভূমি মন্ত্রণালয়ের নামজারি পোর্টালে অনলাইন আবেদন',
      'তহশিলদার ও এসিল্যান্ড অফিসের শুনানি ফলোআপ',
      'ডিসিআর ফি প্রদান ও অনলাইন কিউআর কোড খতিয়ান সংগ্রহ'
    ],
    officialFee: '৳ 1170 (Govt Court & DCR Fee)',
    serviceCharge: '৳ 650'
  },
  {
    id: 'srv-13',
    slug: 'khatian-porcha-land-tax',
    titleEn: 'Khatian / Porcha / Land Tax (Khajna)',
    titleBn: 'খতিয়ান/পর্চা উত্তোলন ও ভূমি কর (খাজনা)',
    category: 'Land & Legal',
    categoryBn: 'ভূমি ও আইনি সেবা',
    shortDescEn: 'Certified CS, SA, RS, BS copy from DC record room and online land tax holding registration & payment.',
    shortDescBn: 'জেলা প্রশাসকের রেকর্ড রুম থেকে সার্টিফাইড পর্চা উত্তোলন এবং অনলাইনে ভূমি উন্নয়ন কর (খাজনা) পরিশোধ।',
    fullDescEn: 'Online certified copy of any land khatian (CS/SA/RS/BS) from the Deputy Commissioner Record Room delivered right to your home, along with online holding registration for land tax.',
    fullDescBn: 'ডিসি রেকর্ড রুম থেকে মূল সার্টিফাইড পর্চা উত্তোলন ও অনলাইনে জমি হোল্ডিং তৈরি করে ঘরে বসেই খাজনা পরিশোধের দাখিলা রশিদ সংগ্রহ।',
    price: '৳ 350',
    priceBn: '৳ ৩৫০',
    deliveryTimeEn: '3-7 Working Days',
    deliveryTimeBn: '৩-৭ কর্মদিবস',
    icon: 'Scroll',
    requiredDocumentsEn: [
      'District, Upazila, Mouza, and Khatian/Dag number',
      'Owner name as recorded in survey',
      'Applicant NID and mobile number'
    ],
    requiredDocumentsBn: [
      'জেলা, উপজেলা, মৌজা এবং খতিয়ান বা দাগ নম্বর',
      'জরিপে উল্লিখিত মূল মালিকের নাম',
      'আবেদনকারীর জাতীয় পরিচয়পত্র ও মোবাইল নম্বর'
    ],
    stepsEn: [
      'Database search on ePorcha portal',
      'Application filing for DC certified hard copy or instant digital copy',
      'Postal tracking or direct PDF download'
    ],
    stepsBn: [
      'ই-পর্চা পোর্টালে রেকর্ড রুমের তথ্য সন্ধান',
      'অনলাইন বা সার্টিফাইড হার্ডকপি আবেদন ও সরকারি ফি জমাদান',
      'অনলাইন খতিয়ান ডাউনলোড বা কুরিয়ার ট্র্যাকিং'
    ]
  },
  {
    id: 'srv-14',
    slug: 'police-clearance-certificate',
    titleEn: 'Police Clearance Certificate',
    titleBn: 'অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    shortDescEn: 'Bangladesh Police Clearance Certificate for immigration, study abroad, and foreign employment.',
    shortDescBn: 'বিদেশে ভ্রমণ, উচ্চশিক্ষা বা চাকরির জন্য বাংলাদেশ পুলিশের অনলাইন ক্লিয়ারেন্স সার্টিফিকেট আবেদন।',
    fullDescEn: 'Authorized online application for Police Clearance Certificate via Bangladesh Police Portal. We coordinate with your local police station and Special Branch for swift verification.',
    fullDescBn: 'বাংলাদেশ পুলিশের অফিশিয়াল পোর্টালে আবেদন, ৫০০ টাকা সরকারি ট্রেজারি চালান এবং স্থানীয় থানা ও এসবি ভেরিফিকেশনে সহায়তা।',
    price: '৳ 350',
    priceBn: '৳ ৩৫০',
    deliveryTimeEn: '7-12 Working Days',
    deliveryTimeBn: '৭-১২ কর্মদিবস',
    icon: 'ShieldCheck',
    badge: 'Abroad Essential',
    badgeBn: 'বিদেশ গমনে জরুরি',
    popular: true,
    requiredDocumentsEn: [
      'Valid Passport photocopy (minimum 6 months validity)',
      'Government treasury challan of ৳500',
      'Ward Councilor or Chairman Citizen Certificate',
      'Present address utility bill or proof of residence'
    ],
    requiredDocumentsBn: [
      'বৈধ পাসপোর্টের রঙিন ফটোকপি (কমপক্ষে ৬ মাসের মেয়াদ)',
      'বাংলাদেশ ব্যাংকে ৫০০ টাকা সরকারি ট্রেজারি চালান',
      'ওয়ার্ড কাউন্সিলর বা ইউপি চেয়ারম্যানের নাগরিকত্ব সনদ',
      'বর্তমান ঠিকানার বিদ্যুৎ বিল বা বসবাসের প্রমাণ'
    ],
    stepsEn: [
      'Police clearance portal form submission',
      'Treasury challan verification via Sonali Bank',
      'Forwarding to Thana Officer-in-Charge for field inquiry',
      'Digital certificate delivery and foreign ministry attestation readiness'
    ],
    stepsBn: [
      'পুলিশ ক্লিয়ারেন্স পোর্টালে নির্ভুল আবেদন ফর্ম পূরণ',
      'সরকারি ৫০০ টাকার ট্রেজারি চালান অনলাইনে জমা',
      'স্থানীয় থানায় পুলিশ তদন্তের জন্য ফাইল ফরোয়ার্ড',
      'সুপারিনটেনডেন্ট অফ পুলিশ (এসপি) স্বাক্ষরিত সনদ ডেলিভারি'
    ],
    officialFee: '৳ 500 (Govt Treasury Challan)',
    serviceCharge: '৳ 350'
  },
  {
    id: 'srv-15',
    slug: 'visa-application-assistance',
    titleEn: 'Visa Application Assistance',
    titleBn: 'দেশ-বিদেশের ভিসা আবেদন সহায়তা',
    category: 'Transport & Travel',
    categoryBn: 'পরিবহন ও ভ্রমণ সেবা',
    shortDescEn: 'Tourist, business, and medical visa form fill-up for India, Malaysia, Thailand, UAE, UK, and Schengen.',
    shortDescBn: 'ভারত, মালয়েশিয়া, থাইল্যান্ড, দুবাই, যুক্তরাজ্য ও ইউরোপিয়ান দেশের ট্যুরিস্ট ও মেডিকেল ভিসা আবেদন।',
    fullDescEn: 'Expert visa consultation and application submission. We prepare airtight documentation, draft cover letters, verify bank statements, and book embassy/VFS appointments.',
    fullDescBn: 'ইন্ডিয়ান আইভ্যাক (IVAC) স্লট বুকিং, দুবাই ই-ভিসা, মালয়েশিয়া ই-ভিসা এবং ইউকে ও শেনজেন ভিসার পেশাদার ফাইল প্রসেসিং।',
    price: '৳ 500',
    priceBn: '৳ ৫০০',
    deliveryTimeEn: '24-72 Hours',
    deliveryTimeBn: '২৪-৭২ ঘণ্টা',
    icon: 'Plane',
    requiredDocumentsEn: [
      'Valid Passport (minimum 6 months)',
      'White background photos matching embassy specs',
      '6-month bank statement with solvency certificate',
      'Job NOC / Trade license / Student ID'
    ],
    requiredDocumentsBn: [
      'কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট',
      'নির্দিষ্ট মাপের সাদা ব্যাকগ্রাউন্ড ছবি',
      'বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি',
      'চাকরির এনওসি অথবা ট্রেড লাইসেন্স বা স্টুডেন্ট আইডি'
    ],
    stepsEn: [
      'Country specific visa requirement evaluation',
      'Online form submission & appointment slot reservation',
      'Document bundle organization for submission day'
    ],
    stepsBn: [
      'নির্দিষ্ট দেশের ভিসার প্রয়োজনীয় শর্তাবলী মূল্যায়ন',
      'অনলাইন ফর্ম পূরণ ও দ্রুত অ্যাপয়েন্টমেন্ট তারিখ বুকিং',
      'জমা দেওয়ার জন্য সুবিন্যস্ত ফাইল ও কভার লেটার প্রস্তুত'
    ]
  },
  {
    id: 'srv-16',
    slug: 'online-job-application-form-fillup',
    titleEn: 'Online Job Application Form Fill-up',
    titleBn: 'সরকারি-বেসরকারি চাকরি আবেদন ফর্ম পূরণ',
    category: 'Career & Education',
    categoryBn: 'ক্যারিয়ার ও শিক্ষা সেবা',
    shortDescEn: 'Teletalk govt job applications (BCS, Primary, NTRCA, Railway, Ministry) with image/signature resize.',
    shortDescBn: 'টেলিটক সরকারি চাকরির আবেদন (বিসিএস, প্রাথমিক, রেলওয়ে, এনটিআরসিএ) ও সঠিক মাপের ছবি-স্বাক্ষর রিসাইজ।',
    fullDescEn: 'Never miss a career deadline. We fill government job forms on all Teletalk portals with exact 300x300 px photo and 300x80 px signature resizing, and assist with Teletalk SMS fee payment.',
    fullDescBn: 'বিসিএস, মন্ত্রণালয়, ব্যাংক ও স্বায়ত্তশাসিত প্রতিষ্ঠানের সকল টেলিটক চাকরির অনলাইন ফর্ম নির্ভুলভাবে পূরণ ও ফি প্রদান।',
    price: '৳ 150',
    priceBn: '৳ ১৫০',
    deliveryTimeEn: '1-3 Hours',
    deliveryTimeBn: '১-৩ ঘণ্টা',
    icon: 'GraduationCap',
    badge: 'Quick & Reliable',
    badgeBn: 'দ্রুত সেবা',
    popular: true,
    requiredDocumentsEn: [
      'Educational roll, reg, passing year & GPA',
      'Applicant NID & active mobile number',
      'Passport photo & signature copy',
      'Quota certificate if applicable (Freedom fighter, tribal, etc.)'
    ],
    requiredDocumentsBn: [
      'এসএসসি, এইচএসসি ও ডিগ্রির রোল, রেজি ও জিপিএ',
      'প্রার্থীর এনআইডি বা জন্ম সনদ এবং সক্রিয় মোবাইল নম্বর',
      'সদ্য তোলা পাসপোর্ট ছবি ও সাদা কাগজে স্পষ্ট স্বাক্ষর',
      'কোটায় আবেদন করলে সংশ্লিষ্ট সনদপত্র'
    ],
    stepsEn: [
      'Circular criteria analysis',
      'Exact photo & signature format adjustment',
      'Online submission and Teletalk SMS payment guidance',
      'Admit-card ready Applicant Copy PDF download'
    ],
    stepsBn: [
      'নিয়োগ বিজ্ঞপ্তির শর্তাবলী ও পদ নির্বাচন',
      'ছবি ও স্বাক্ষরের সঠিক পিক্সেল ও কেবি সাইজ রূপান্তর',
      'টেলিটক পোর্টালে ফর্ম সাবমিশন ও ইউজার আইডি প্রদান',
      'টেলিটকে ফি জমা দিয়ে চূড়ান্ত অ্যাপ্লিক্যান্ট কপি ডাউনলোড'
    ]
  },
  {
    id: 'srv-17',
    slug: 'educational-certificate-attestation',
    titleEn: 'Educational Certificate Attestation',
    titleBn: 'শিক্ষাগত সনদ সত্যায়ন ও অ্যাপোস্টিল',
    category: 'Career & Education',
    categoryBn: 'ক্যারিয়ার ও শিক্ষা সেবা',
    shortDescEn: 'Education Board, Ministry of Education, and Foreign Ministry (MOFA) attestation assistance.',
    shortDescBn: 'শিক্ষা বোর্ড, শিক্ষা মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয় (এমওএফএ) থেকে সার্টিফিকেট সত্যায়ন সহায়তা।',
    fullDescEn: 'End-to-end guidance for higher studies or foreign work visa document attestation. Board verification, Ministry endorsements, and MOFA stamp coordination.',
    fullDescBn: 'বিদেশে উচ্চশিক্ষা বা চাকরির ভিসার জন্য সকল শিক্ষাবোর্ড, শিক্ষা মন্ত্রণালয় এবং পররাষ্ট্র মন্ত্রণালয় থেকে সনদ সত্যায়ন সহায়তা।',
    price: '৳ 450',
    priceBn: '৳ ৪৫০',
    deliveryTimeEn: '5-10 Working Days',
    deliveryTimeBn: '৫-১০ কর্মদিবস',
    icon: 'Award',
    requiredDocumentsEn: [
      'Original Certificate and Transcript / Marksheet',
      'Photocopies of all educational documents',
      'Passport copy of candidate',
      'Board verification fee slip'
    ],
    requiredDocumentsBn: [
      'মূল সার্টিফিকেট ও মার্কশিট/ট্রান্সক্রিপ্ট',
      'সকল শিক্ষা সনদের স্পষ্ট রঙিন ফটোকপি',
      'প্রার্থীর পাসপোর্টের ফটোকপি',
      'সংশ্লিষ্ট শিক্ষাবোর্ডের ভেরিফিকেশন ফি রশিদ'
    ],
    stepsEn: [
      'Education board verification tracking',
      'Ministry of Education online token generation',
      'MOFA attestation queue management'
    ],
    stepsBn: [
      'সংশ্লিষ্ট শিক্ষা বোর্ড থেকে সনদ ভেরিফিকেশন',
      'শিক্ষা মন্ত্রণালয়ের অনুমোদন গ্রহণ',
      'পররাষ্ট্র মন্ত্রণালয়ের সত্যায়ন স্টিকার ও কিউআর সিল নিশ্চিতকরণ'
    ]
  },
  {
    id: 'srv-18',
    slug: 'citizenship-nationality-certificate',
    titleEn: 'Citizenship / Character Certificate',
    titleBn: 'নাগরিকত্ব ও চারিত্রিক সনদপত্র',
    category: 'Identity & Civil',
    categoryBn: 'পরিচয় ও নাগরিক সনদ',
    shortDescEn: 'Union Parishad, Municipality, or Ward Councillor official citizenship & character testimonials.',
    shortDescBn: 'ইউনিয়ন পরিষদ, পৌরসভা বা ওয়ার্ড কাউন্সিলর অফিস থেকে নাগরিকত্ব, চারিত্রিক ও অবিবাহিত সনদপত্র।',
    fullDescEn: 'Official local government certificates required for banking, jobs, tenders, and civil registrations directly authorized by your Councillor or UP Chairman.',
    fullDescBn: 'ব্যাংক লোন, সরকারি চাকরি, পাসপোর্ট বা জমি ক্রয়ে প্রয়োজনীয় কাউন্সিলর বা ইউপি চেয়ারম্যানের প্রত্যয়নপত্র ও অনলাইন নাগরিক সনদ।',
    price: '৳ 200',
    priceBn: '৳ ২০০',
    deliveryTimeEn: '1-2 Working Days',
    deliveryTimeBn: '১-২ কর্মদিবস',
    icon: 'FileCheck',
    requiredDocumentsEn: [
      'National ID Card (NID) copy',
      'Present or permanent address holding receipt',
      'Passport size photograph'
    ],
    requiredDocumentsBn: [
      'জাতীয় পরিচয়পত্র (এনআইডি) এর কপি',
      'বর্তমান বা স্থায়ী ঠিকানার হোল্ডিং ট্যাক্স রশিদ',
      'পাসপোর্ট সাইজের রঙিন ছবি'
    ],
    stepsEn: [
      'Drafting testimonial with local jurisdiction details',
      'Submission to local administrative portal/council office',
      'Signed and stamped certificate issuance'
    ],
    stepsBn: [
      'ওয়ার্ড কাউন্সিলর বা ইউপি কার্যালয়ের ফরমেটে খসড়া তৈরি',
      'স্থানীয় সরকার পোর্টালে অনলাইন নিবন্ধন',
      'কাউন্সিলর বা চেয়ারম্যানের সিল-স্বাক্ষরযুক্ত সনদ সংগ্রহ'
    ]
  },
  {
    id: 'srv-19',
    slug: 'utility-bill-services',
    titleEn: 'Utility Bill Services (Electricity, Gas, Water)',
    titleBn: 'বিদ্যুৎ, গ্যাস ও পানির বিল পরিশোধ ও নতুন সংযোগ',
    category: 'Digital & Utilities',
    categoryBn: 'ডিজিটাল ও ইউটিলিটি সেবা',
    shortDescEn: 'DESCO, DPDC, NESCO, BREB, Titas Gas, and WASA bill payment, name change, and meter transfer.',
    shortDescBn: 'ডেসকো, ডিপিডিসি, নেসকো, পল্লী বিদ্যুৎ, তিতাস গ্যাস ও ওয়াসার বিল পরিশোধ ও মিটার নাম পরিবর্তন।',
    fullDescEn: 'Never miss a due date. Instant payment receipt generation for all prepaid and postpaid power grids across Bangladesh, plus official meter change applications.',
    fullDescBn: 'বাংলাদেশের সকল বিদ্যুৎ ও গ্যাস কোম্পানির প্রিপেইড কার্ড রিচার্জ, পোস্টপেইড বিল পরিশোধের ক্যাশমেমো এবং নতুন বিদ্যুৎ মিটার আবেদন।',
    price: '৳ 50',
    priceBn: '৳ ৫০',
    deliveryTimeEn: 'Instant - 1 Hour',
    deliveryTimeBn: 'তাৎক্ষণিক - ১ ঘণ্টা',
    icon: 'Zap',
    badge: 'Quick Pay',
    badgeBn: 'দ্রুত সেবা',
    requiredDocumentsEn: [
      'Customer SMS Account / Meter Number',
      'Previous utility bill copy',
      'NID copy (for ownership change or new connection)'
    ],
    requiredDocumentsBn: [
      'মিটার নম্বর বা এসএমএস অ্যাকাউন্ট নম্বর',
      'পূর্বের যেকোনো মাসের বিলের কপি',
      'নতুন সংযোগের জন্য এনআইডি ও জমির দলিলের কপি'
    ],
    stepsEn: [
      'Biller system balance verification',
      'Direct clearing house payment execution',
      'Official downloadable payment receipt with transaction ID'
    ],
    stepsBn: [
      'ইউটিলিটি কোম্পানির সিস্টেমে বকেয়া বিল যাচাই',
      'ব্যাংক বা এমএফএস গেটওয়েতে তাৎক্ষণিক পরিশোধ',
      'ট্রানজেকশন আইডি সম্বলিত প্রিন্টযোগ্য অফিশিয়াল রশিদ সংগ্রহ'
    ]
  },
  {
    id: 'srv-20',
    slug: 'graphic-design-website-digital-marketing',
    titleEn: 'Graphic Design, Website & Digital Marketing',
    titleBn: 'গ্রাফিক্স ডিজাইন, ওয়েবসাইট ও ডিজিটাল মার্কেটিং',
    category: 'Digital & Utilities',
    categoryBn: 'ডিজিটাল ও ইউটিলিটি সেবা',
    shortDescEn: 'Logo design, visiting cards, banner printing, WordPress websites, and Facebook page boost campaigns.',
    shortDescBn: 'লোগো ডিজাইন, ভিজিটিং কার্ড, ব্যানার, ওয়ার্ডপ্রেস/কাস্টম ওয়েবসাইট তৈরি ও ফেসবুক পেজ বুস্ট সেবা।',
    fullDescEn: 'Elevate your enterprise. Professional branding, commercial stationery design, e-commerce websites, and targeted social media marketing for local and global businesses.',
    fullDescBn: 'আপনার ব্যবসা প্রসারের জন্য প্রফেশনাল লোগো, ভিজিটিং কার্ড, ফ্লেক্স ব্যানার, আধুনিক ওয়েবসাইট নির্মাণ ও ফেসবুক-গুগল অ্যাড ক্যাম্পেইন সেবা।',
    price: 'Contact for price',
    priceBn: 'যোগাযোগ করে জানুন',
    deliveryTimeEn: '2-7 Working Days',
    deliveryTimeBn: '২-৭ কর্মদিবস',
    icon: 'Sparkles',
    badge: 'Creative Agency',
    badgeBn: 'ক্রিয়েটিভ সেবা',
    requiredDocumentsEn: [
      'Business name & tagline',
      'Design concept reference or requirements brief',
      'Images, logos, or raw product photos'
    ],
    requiredDocumentsBn: [
      'ব্যবসা প্রতিষ্ঠানের নাম ও স্লোগান',
      'পছন্দনীয় ডিজাইন বা নমুনা রেফারেন্স',
      'প্রোডাক্ট ছবি, টেক্সট কন্টেন্ট ও ব্র্যান্ড কালার'
    ],
    stepsEn: [
      'Creative briefing & scope discussion',
      'Draft concept presentation and revisions',
      'Final high-resolution source files & live website handover'
    ],
    stepsBn: [
      'কাজের বিস্তারিত আলোচনা ও বাজেট নির্ধারণ',
      'খসড়া ডিজাইন বা ডেমো প্রেজেন্টেশন ও ফিডব্যাক সংশোধন',
      'চূড়ান্ত হাই-রেজুলেশন ফাইল বা লাইভ ওয়েবসাইট হস্তান্তর'
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'ShebaPoint BD',
  brandNameBn: 'সেবাপয়েন্ট বিডি',
  tagline: 'Bangladesh Premier Digital Citizen Services Portal',
  taglineBn: 'বাংলাদেশ ডিজিটাল নাগরিক সেবা কেন্দ্র',
  phone: '+880 1712-345678',
  whatsapp: '+8801712345678',
  email: 'support@shebapointbd.com',
  address: 'Level 4, Digital Center Tower, Shahbagh, Dhaka-1000, Bangladesh',
  addressBn: 'লেভেল ৪, ডিজিটাল সেন্টার টাওয়ার, শাহবাগ, ঢাকা-১০০০, বাংলাদেশ',
  noticeTicker: 'জরুরি নোটিশ: ভোটার তালিকা হালনাগাদ ও ই-পাসপোর্ট দ্রুত স্লটের আবেদন চলছে। ঘরে বসেই সকল সরকারি ফরম পূরণে সাহায্য নিন।',
  noticeTickerBn: 'জরুরি নোটিশ: ভোটার তালিকা হালনাগাদ ও ই-পাসপোর্ট দ্রুত স্লটের আবেদন চলছে। ঘরে বসেই সকল সরকারি ফরম পূরণে সাহায্য নিন।',
  heroHeadline: 'All Government & Citizen Services at One Single Point',
  heroHeadlineBn: 'সকল অনলাইন সরকারি ও নাগরিক সেবা এক ঠিকানায়',
  heroSubheadline: 'Quick, secure, and hassle-free assistance for NID, Passport, BRTA, Land Mutation, Tax, and 20+ essential digital services.',
  heroSubheadlineBn: 'এনআইডি, ই-পাসপোর্ট, ড্রাইভিং লাইসেন্স, নামজারি, আয়কর রিটার্নসহ ২০টিরও বেশি সেবা সহজে ও বিশ্বস্ততার সাথে গ্রহণ করুন।'
};

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-101',
    trackingId: 'SHB-2026-8941',
    serviceId: 'srv-1',
    serviceNameEn: 'NID Card Correction / Reissue',
    serviceNameBn: 'এনআইডি কার্ড সংশোধন ও রি-ইস্যু',
    customerName: 'মোঃ তানভীর হাসান',
    customerPhone: '01711223344',
    customerEmail: 'tanvir.bd@gmail.com',
    customerNid: '1992269542000012',
    district: 'ঢাকা (Dhaka)',
    notes: 'পিতার নামের বানান ভুল সংশোধন ও নতুন স্মার্ট কার্ডের অনলাইন কপি প্রয়োজন।',
    adminRemarks: 'কাগজপত্র নির্বাচন কমিশনে দাখিল করা হয়েছে। অনুমোদন প্রক্রিয়াধীন রয়েছে।',
    status: 'processing',
    amount: '৳ 350',
    paymentStatus: 'paid',
    createdAt: '2026-10-15 10:30 AM',
    updatedAt: '2026-10-16 04:15 PM'
  },
  {
    id: 'req-102',
    trackingId: 'SHB-2026-7729',
    serviceId: 'srv-4',
    serviceNameEn: 'e-Passport Application / Renewal',
    serviceNameBn: 'ই-পাসপোর্ট আবেদন ও নবায়ন',
    customerName: 'নুসরাত জাহান রিয়া',
    customerPhone: '01819876543',
    customerEmail: 'nusrat.ria@gmail.com',
    customerNid: '1995269542000088',
    district: 'চট্টগ্রাম (Chattogram)',
    notes: '৪৮ পৃষ্ঠা ও ৫ বছরের ই-পাসপোর্ট নবায়ন আবেদন এবং আগামী সপ্তাহের বায়োমেট্রিক স্লট বুকিং।',
    adminRemarks: 'অনলাইন ফর্ম পূরণ সম্পন্ন ও সোনালী ব্যাংকে চালানের ফি জমা হয়েছে। প্রিন্ট কপি ডাউনলোড করে গ্রাহককে পাঠানো হয়েছে।',
    status: 'completed',
    amount: '৳ 500',
    paymentStatus: 'paid',
    createdAt: '2026-10-14 02:20 PM',
    updatedAt: '2026-10-15 11:45 AM'
  },
  {
    id: 'req-103',
    trackingId: 'SHB-2026-6410',
    serviceId: 'srv-12',
    serviceNameEn: 'Land Mutation (e-Namjari)',
    serviceNameBn: 'ই-নামজারি ও জমাখারিজ আবেদন',
    customerName: 'আব্দুল করিম পাটোয়ারী',
    customerPhone: '01912345678',
    customerEmail: 'karim.patwary@yahoo.com',
    district: 'কুমিল্লা (Cumilla)',
    notes: 'পৈত্রিক ক্রয়সূত্রে প্রাপ্ত জমির নামজারি ও অনলাইন খতিয়ান সৃজন।',
    adminRemarks: 'আবেদনপত্র জমা নেওয়া হয়েছে। দলিল যাচাই চলছে।',
    status: 'pending',
    amount: '৳ 650',
    paymentStatus: 'unpaid',
    createdAt: '2026-10-17 09:10 AM',
    updatedAt: '2026-10-17 09:10 AM'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'কাজী আরিফুল ইসলাম',
    district: 'ঢাকা',
    rating: 5,
    commentEn: 'Got my NID card name correction done in just 3 days! Outstanding service, highly recommended.',
    commentBn: 'আমার এনআইডি কার্ডের নামের বানান মাত্র ৩ দিনে সংশোধন করিয়ে দিয়েছেন! অত্যন্ত আন্তরিক ও পেশাদার সার্ভিস।',
    serviceName: 'এনআইডি সংশোধন',
    date: '2 দিন আগে'
  },
  {
    id: 'rev-2',
    name: 'ফারহানা আহমেদ সোনিয়া',
    district: 'সিলেট',
    rating: 5,
    commentEn: 'e-Passport form was filled with 100% accuracy and the appointment date was secured immediately.',
    commentBn: 'ই-পাসপোর্টের ফর্ম কোনরকম ভুল ছাড়া পূরণ করে দিয়েছেন এবং দ্রুত বায়োমেট্রিক স্লট পেয়েছি। ধন্যবাদ সেবাপয়েন্ট।',
    serviceName: 'ই-পাসপোর্ট আবেদন',
    date: '৪ দিন আগে'
  },
  {
    id: 'rev-3',
    name: 'মাহমুদুল হক',
    district: 'খুলনা',
    rating: 5,
    commentEn: 'Very convenient! Applied for land mutation from abroad and monitored the full progress through tracking ID.',
    commentBn: 'আমি প্রবাসে থেকে জমির নামজারি আবেদন করিয়েছি। ট্র্যাকিং আইডির মাধ্যমে পুরো আপডেট দেখতে পেয়েছি। দারুণ সিস্টেম!',
    serviceName: 'ই-নামজারি',
    date: '১ সপ্তাহ আগে'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    titleEn: 'Service Request In Progress',
    titleBn: 'আপনার সেবার কাজ চলমান রয়েছে',
    messageEn: 'Your request SHB-2026-8941 is currently under review by our verification team.',
    messageBn: 'আপনার আবেদন SHB-2026-8941 বর্তমানে আমাদের ভেরিফিকেশন টিম দ্বারা পরীক্ষা করা হচ্ছে।',
    time: '১০ মিনিট আগে',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    titleEn: 'Important Portal Notice',
    titleBn: 'জরুরি পোর্টাল আপডেট',
    messageEn: 'E-Passport server maintenance scheduled by the government this Sunday.',
    messageBn: 'সরকারি সার্ভার রক্ষণাবেক্ষণের কারণে আগামী রবিবার ই-পাসপোর্ট সার্ভারে সাময়িক কাজ ধীরগতি হতে পারে।',
    time: '২ ঘণ্টা আগে',
    read: false,
    type: 'alert'
  }
];
