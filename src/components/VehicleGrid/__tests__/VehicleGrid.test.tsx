import React from 'react';
import { render, screen } from '@testing-library/react';
import { VehicleGrid } from '../VehicleGrid';
import { Vehicle } from '../../../types/Vehicle';

describe('VehicleGrid', () => {
  const mockVehicles: Vehicle[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      trim: 'LE',
      year: 2022,
      color: 'White',
      mileage: 15000,
      price: 28500,
      image: 'https://example.com/car1.jpg',
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
      image: 'https://example.com/car2.jpg',
      zipCode: '90210'
    }
  ];

  test('renders no vehicles found message when no results', () => {
    render(<VehicleGrid vehicles={[]} isEmpty={true} />);
    
    expect(screen.getByText('No vehicles found')).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find any vehicles matching your criteria/)).toBeInTheDocument();
  });

  test('renders vehicle cards when vehicles are available', () => {
    render(<VehicleGrid vehicles={mockVehicles} isEmpty={false} />);
    
    expect(screen.getByText('2022 Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2021 Honda Accord')).toBeInTheDocument();
  });

  test('renders correct number of vehicle cards', () => {
    render(<VehicleGrid vehicles={mockVehicles} isEmpty={false} />);
    
    const vehicleCards = screen.getAllByText(/\d{4} \w+ \w+/);
    expect(vehicleCards).toHaveLength(2);
  });
});