export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  brand?: string;
  sku?: string;
  minimumOrderQuantity?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  tags?: string[];
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }>;
  availabilityStatus?: string;
  meta?: {
    barcode: string;
  };
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  url?: string;
}

export interface PaginatedResponse {
  products: Product[];
  total: number;
}
