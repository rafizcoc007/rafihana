import React from 'react';
import {
  CreditCard,
  Baby,
  FileBadge,
  Compass,
  Car,
  Truck,
  FileText,
  Receipt,
  Percent,
  Briefcase,
  Building2,
  MapPin,
  Scroll,
  ShieldCheck,
  Plane,
  GraduationCap,
  Award,
  FileCheck,
  Zap,
  Sparkles,
  HelpCircle,
  LucideProps
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
  name: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
  switch (name) {
    case 'CreditCard':
      return <CreditCard {...props} />;
    case 'Baby':
      return <Baby {...props} />;
    case 'FileBadge':
      return <FileBadge {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Truck':
      return <Truck {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'Receipt':
      return <Receipt {...props} />;
    case 'Percent':
      return <Percent {...props} />;
    case 'Briefcase':
      return <Briefcase {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Scroll':
      return <Scroll {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Plane':
      return <Plane {...props} />;
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Award':
      return <Award {...props} />;
    case 'FileCheck':
      return <FileCheck {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
