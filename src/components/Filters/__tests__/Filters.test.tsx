import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../Filters';

describe('Filters', () => {
  const mockProps = {
    filters: { make: '', color: '' },
    sortBy: 'make' as const,
    onFilterChange: jest.fn(),
    onSortChange: jest.fn(),
    onClearFilters: jest.fn(),
    resultsCount: 5,
    isVisible: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders filters when visible', () => {
    render(<Filters {...mockProps} />);
    
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByText('Filter by Make')).toBeInTheDocument();
    expect(screen.getByText('Filter by Color')).toBeInTheDocument();
    // ZIP code filtering is now handled by search bar
  });

  test('displays correct results count', () => {
    render(<Filters {...mockProps} resultsCount={10} />);
    
    expect(screen.getByText('10 vehicles found')).toBeInTheDocument();
  });

  test('calls onSortChange when sort option is selected', () => {
    render(<Filters {...mockProps} />);
    
    const sortSelect = screen.getByDisplayValue('Make (A-Z)');
    fireEvent.change(sortSelect, { target: { value: 'price-high' } });
    
    expect(mockProps.onSortChange).toHaveBeenCalledWith('price-high');
  });

  test('calls onFilterChange when make filter is changed', () => {
    render(<Filters {...mockProps} />);
    
    const makeSelect = screen.getByDisplayValue('All Makes');
    fireEvent.change(makeSelect, { target: { value: 'Toyota' } });
    
    expect(mockProps.onFilterChange).toHaveBeenCalledWith('make', 'Toyota');
  });

  test('calls onFilterChange when color filter is changed', () => {
    render(<Filters {...mockProps} />);
    
    const colorSelect = screen.getByDisplayValue('All Colors');
    fireEvent.change(colorSelect, { target: { value: 'White' } });
    
    expect(mockProps.onFilterChange).toHaveBeenCalledWith('color', 'White');
  });

  // ZIP code filtering is now handled by search bar

  test('calls onClearFilters when clear button is clicked', () => {
    render(<Filters {...mockProps} />);
    
    const clearButton = screen.getByText('Clear All Filters');
    fireEvent.click(clearButton);
    
    expect(mockProps.onClearFilters).toHaveBeenCalled();
  });

  test('displays selected filters correctly', () => {
    const propsWithFilters = {
      ...mockProps,
      filters: { make: 'Toyota', color: 'White' },
      sortBy: 'price-high' as const
    };
    
    render(<Filters {...propsWithFilters} />);
    
    expect(screen.getByDisplayValue('Toyota')).toBeInTheDocument();
    expect(screen.getByDisplayValue('White')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Price (High to Low)')).toBeInTheDocument();
  });
});