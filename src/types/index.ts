export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface Item {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  specifications?: { key: string; value: string }[];
  seller: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  item: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: Pagination;
}

export interface AuthData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  token: string;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  location: string;
  sort: string;
  order: 'asc' | 'desc';
}

export interface DashboardStats {
  totalItems: number;
  totalValue: number;
  avgPrice: number;
  categoryCounts: { category: string; count: number }[];
}

export interface AdminStats {
  totalUsers: number;
  totalItems: number;
  totalValue: number;
  avgPrice: number;
  categoryCounts: { category: string; count: number }[];
  recentUsers: User[];
}
