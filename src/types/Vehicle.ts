export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
  zipCode: string;
}

export type SortOption = 'price-high' | 'price-low' | 'make';

export interface FilterOptions {
  make: string;
  color: string;
}