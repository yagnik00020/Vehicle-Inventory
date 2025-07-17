import { useState, useCallback, useMemo } from 'react';
import { SortOption, FilterOptions } from '../types/Vehicle';
import { vehicleData, getVehiclesByZipCode } from '../data/vehicles';

export const useVehicleSearch = () => {
  const [searchZipCode, setSearchZipCode] = useState<string>('');
  const [searchedZipCode, setSearchedZipCode] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({ make: '', color: '' });
  const [sortBy, setSortBy] = useState<SortOption>('make');
  const [error, setError] = useState<string>('');

  const validateZipCode = useCallback((zip: string): boolean => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  }, []);

  const searchVehicles = useCallback(() => {
    if (!searchZipCode.trim()) {
      setError('Please enter a ZIP code');
      return;
    }

    if (!validateZipCode(searchZipCode)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }

    setError('');
    setSearchedZipCode(searchZipCode);
  }, [searchZipCode, validateZipCode]);

  const rawVehicles = useMemo(() => {
    if (searchedZipCode) {
      return getVehiclesByZipCode(searchedZipCode);
    }
    return vehicleData;
  }, [searchedZipCode]);

  const filteredVehicles = useMemo(() => {
    return rawVehicles.filter(vehicle => {
      const matchesMake = !filters.make || vehicle.make === filters.make;
      const matchesColor = !filters.color || vehicle.color === filters.color;
      return matchesMake && matchesColor;
    });
  }, [rawVehicles, filters]);

  const sortedVehicles = useMemo(() => {
    const sorted = Array.from(filteredVehicles);
    
    switch (sortBy) {
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'make':
        return sorted.sort((a, b) => a.make.localeCompare(b.make));
      default:
        return sorted;
    }
  }, [filteredVehicles, sortBy]);

  const updateFilter = useCallback((filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ make: '', color: '' });
  }, []);

  const isEmpty = sortedVehicles.length === 0;

  return {
    searchZipCode,
    setSearchZipCode,
    searchVehicles,
    error,
    vehicles: sortedVehicles,
    filters,
    sortBy,
    setSortBy,
    updateFilter,
    clearFilters,
    isEmpty
  };
};