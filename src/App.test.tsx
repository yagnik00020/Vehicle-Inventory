import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders header and shows vehicles by default', () => {
    render(<App />);
    
    expect(screen.getByText('Vehicle Inventory')).toBeInTheDocument();
    expect(screen.getByText('Find your perfect vehicle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)')).toBeInTheDocument();
    
    // Should show vehicles by default instead of welcome message
    expect(screen.queryByText('Welcome to Vehicle Inventory')).not.toBeInTheDocument();
  });


  test('searches and displays vehicles', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)');
    const searchButton = screen.getByText('Search Vehicles');
    
    fireEvent.change(input, { target: { value: '90210' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/vehicles found/)).toBeInTheDocument();
    });
  });

  test('shows error for invalid ZIP code', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)');
    const searchButton = screen.getByText('Search Vehicles');
    
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid 5-digit ZIP code')).toBeInTheDocument();
    });
  });

  test('shows error for empty ZIP code', async () => {
    render(<App />);
    
    const searchButton = screen.getByText('Search Vehicles');
    
    // Click search without entering a ZIP code
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a ZIP code')).toBeInTheDocument();
    });
  });

  test('filters vehicles after search', async () => {
    render(<App />);
    
    // First search for vehicles
    const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)');
    const searchButton = screen.getByText('Search Vehicles');
    
    fireEvent.change(input, { target: { value: '90210' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/vehicles found/)).toBeInTheDocument();
    });

    // Then filter by make
    const makeSelects = screen.getAllByDisplayValue('All Makes');
    fireEvent.change(makeSelects[0], { target: { value: 'Toyota' } });
    
    await waitFor(() => {
      const vehicleCards = screen.getAllByText(/Toyota/);
      expect(vehicleCards.length).toBeGreaterThan(0);
    });
  });
});
