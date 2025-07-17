import React from 'react';
import { render, screen } from '@testing-library/react';
import { VehicleCard } from '../VehicleCard';
import { Vehicle } from '../../../types/Vehicle';

describe('VehicleCard', () => {
  const mockVehicle: Vehicle = {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2022,
    color: 'White',
    mileage: 15000,
    price: 28500,
    image: 'https://example.com/car.jpg',
    zipCode: '90210'
  };

  test('renders vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    
    expect(screen.getByText('2022 Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('LE')).toBeInTheDocument();
    expect(screen.getByText('15,000 mi')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('$28,500')).toBeInTheDocument();
  });

  test('formats price correctly', () => {
    const vehicleWithHighPrice = {
      ...mockVehicle,
      price: 1234567
    };
    
    render(<VehicleCard vehicle={vehicleWithHighPrice} />);
    
    expect(screen.getByText('$1,234,567')).toBeInTheDocument();
  });
});