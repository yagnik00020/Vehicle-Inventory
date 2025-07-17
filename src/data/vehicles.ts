import { Vehicle } from '../types/Vehicle';

export const vehicleData: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2022,
    color: 'White',
    mileage: 15000,
    price: 28500,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    zipCode: '90210'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    year: 2021,
    color: 'Black',
    mileage: 22000,
    price: 26800,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    zipCode: '90210'
  },
  {
    id: '3',
    make: 'BMW',
    model: '3 Series',
    trim: '320i',
    year: 2023,
    color: 'Blue',
    mileage: 8000,
    price: 42000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '90210'
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C300',
    year: 2022,
    color: 'Silver',
    mileage: 12000,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    zipCode: '90210'
  },
  {
    id: '5',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    year: 2021,
    color: 'Red',
    mileage: 18000,
    price: 38000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    zipCode: '10001'
  },
  {
    id: '6',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Standard Range',
    year: 2023,
    color: 'White',
    mileage: 5000,
    price: 39000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    zipCode: '10001'
  },
  {
    id: '7',
    make: 'Ford',
    model: 'Mustang',
    trim: 'GT',
    year: 2022,
    color: 'Yellow',
    mileage: 10000,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    zipCode: '10001'
  },
  {
    id: '8',
    make: 'Chevrolet',
    model: 'Camaro',
    trim: 'SS',
    year: 2021,
    color: 'Black',
    mileage: 16000,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    zipCode: '60601'
  },
  {
    id: '9',
    make: 'Nissan',
    model: 'Altima',
    trim: 'SV',
    year: 2022,
    color: 'Gray',
    mileage: 20000,
    price: 24000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '60601'
  },
  {
    id: '10',
    make: 'Hyundai',
    model: 'Sonata',
    trim: 'SEL',
    year: 2021,
    color: 'Blue',
    mileage: 25000,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    zipCode: '60601'
  },
  {
    id: '11',
    make: 'Volkswagen',
    model: 'Jetta',
    trim: 'S',
    year: 2022,
    color: 'White',
    mileage: 14000,
    price: 23500,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    zipCode: '33101'
  },
  {
    id: '12',
    make: 'Subaru',
    model: 'Outback',
    trim: 'Premium',
    year: 2023,
    color: 'Green',
    mileage: 7000,
    price: 31000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    zipCode: '33101'
  },
  {
    id: '13',
    make: 'Mazda',
    model: 'CX-5',
    trim: 'Sport',
    year: 2021,
    color: 'Red',
    mileage: 19000,
    price: 27000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    zipCode: '33101'
  },
  {
    id: '14',
    make: 'Lexus',
    model: 'ES',
    trim: '350',
    year: 2022,
    color: 'Silver',
    mileage: 11000,
    price: 41000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    zipCode: '78701'
  },
  {
    id: '15',
    make: 'Acura',
    model: 'TLX',
    trim: 'Type S',
    year: 2023,
    color: 'Black',
    mileage: 6000,
    price: 48000,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    zipCode: '78701'
  }
];

export const getVehiclesByZipCode = (zipCode: string): Vehicle[] => {
  return vehicleData.filter(vehicle => vehicle.zipCode === zipCode);
};

export const getAllMakes = (): string[] => {
  const makes = vehicleData.map(vehicle => vehicle.make);
  return Array.from(new Set(makes)).sort();
};

export const getAllColors = (): string[] => {
  const colors = vehicleData.map(vehicle => vehicle.color);
  return Array.from(new Set(colors)).sort();
};

export const getAllZipCodes = (): string[] => {
  const zipCodes = vehicleData.map(vehicle => vehicle.zipCode);
  return Array.from(new Set(zipCodes)).sort();
};