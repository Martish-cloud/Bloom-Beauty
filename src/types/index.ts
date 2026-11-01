export type ProductCategory =
  | 'Makeup'
  | 'Skincare'
  | 'Haircare'
  | 'Bath & Body'
  | 'Fragrance'
  | 'Nail Care'
  | 'Beauty Tools';

export type ProductBadge = 'BESTSELLER' | 'NEW ARRIVAL' | 'LIMITED OFFER' | 'BEST VALUE';

export interface ProductShade {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: ProductBadge;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeaturedValue?: boolean;
  isSavingsDeal?: boolean;
  dealLabel?: string;
  description: string;
  keyBenefits?: string[];
  ingredients: string;
  howToUse: string;
  shades?: ProductShade[];
  sizes?: string[];
  inStock: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
  selectedSize?: string;
}

export interface Brand {
  id: string;
  name: string;
  category: 'Makeup' | 'Skincare' | 'Haircare' | 'All';
  description: string;
  logoText: string;
  featuredProductCount: number;
  badge?: string;
}

export type SortOption =
  | 'featured'
  | 'bestseller'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'newest';

export interface FilterState {
  categories: ProductCategory[];
  brands: string[];
  priceRange: [number, number];
  minRating: number;
  onlyInStock: boolean;
  badges: ProductBadge[];
}
