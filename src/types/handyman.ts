export type ServiceCategory =
  | "house"
  | "electricity"
  | "handcraft"
  | "plumber"
  | "painting"
  | "gardening"
  | "cleaning"
  | "more";

export type UserRole = "customer" | "artisan" | "guest";

export interface HandymanReview {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Handyman {
  id: string;
  name: string;
  title: string; // e.g. "Plumber - 10 year Experience"
  category: ServiceCategory;
  categoryLabel: string;
  hourlyRate: number; // e.g. 34.00
  rating: number; // e.g. 4.9
  reviewCount: number; // e.g. 200
  distanceKm: number; // e.g. 24
  location: string; // e.g. "Pietersburg, St"
  avatar: string; // Hero portrait
  gallery: string[]; // Work portfolio photos
  about: string; // Detailed bio
  isVerified: boolean;
  yearsExperience: number;
  completedJobs: number;
  onTimeRate: number; // Percentage, e.g. 98
  skills: string[];
  reviews: HandymanReview[];
}

export type BookingStatus =
  | "requested"
  | "accepted"
  | "en_route"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  handymanId: string;
  handyman: Handyman;
  serviceCategory: ServiceCategory;
  serviceName: string;
  status: BookingStatus;
  scheduledAt: string;
  address: string;
  notes?: string;
  estimatedHours: number;
  hourlyRate: number;
  serviceFee: number;
  totalCost: number;
  etaMinutes?: number;
  createdAt: string;
}

export interface ServiceCategoryItem {
  id: ServiceCategory;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}
