// Product types
export interface Product {
  id: number;
  name: string;
  price: number;
  is_offer: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  is_offer: boolean;
}

export interface ProductUpdate {
  name?: string;
  price?: number;
  is_offer?: boolean;
}

export interface ProductsListResponse {
  total: number;
  items: Product[];
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}
