import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockProps = {
    zipCode: '',
    onZipCodeChange: jest.fn(),
    onSearch: jest.fn(),
    error: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and button', () => {
    render(<SearchBar {...mockProps} />);
    
    expect(screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Vehicles' })).toBeInTheDocument();
  });

  test('calls onZipCodeChange when input changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 90210)');
    fireEvent.change(input, { target: { value: '90210' } });
    
    expect(mockProps.onZipCodeChange).toHaveBeenCalledWith('90210');
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchBar {...mockProps} />);
    
    const form = screen.getByRole('button', { name: 'Search Vehicles' }).closest('form');
    fireEvent.submit(form!);
    
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  test('displays error message when error prop is provided', () => {
    render(<SearchBar {...mockProps} error="Invalid ZIP code" />);
    
    expect(screen.getByText('Invalid ZIP code')).toBeInTheDocument();
  });
});