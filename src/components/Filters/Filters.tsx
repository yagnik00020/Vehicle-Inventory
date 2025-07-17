import React, { memo } from 'react';
import styled from 'styled-components';
import { FilterOptions, SortOption } from '../../types/Vehicle';
import { getAllMakes, getAllColors } from '../../data/vehicles';
import { theme } from '../../theme';

const FiltersContainer = styled.div<{ $isVisible: boolean }>`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  position: sticky;
  top: ${theme.spacing.lg};
  height: fit-content;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    height: 100vh;
    overflow-y: auto;
    transform: ${props => props.$isVisible ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const FilterHeader = styled.div`
  display: none;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.lg};
    border-bottom: 1px solid ${theme.colors.gray[200]};
  }
`;

const FilterHeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.gray[600]};
  padding: ${theme.spacing.sm};
  
  &:hover {
    color: ${theme.colors.gray[900]};
  }
`;

const Overlay = styled.div<{ $isVisible: boolean }>`
  display: none;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${props => props.$isVisible ? 1 : 0};
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 14px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.gray[400]};
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${theme.spacing.md};

  &:hover {
    background-color: ${theme.colors.gray[200]};
    border-color: ${theme.colors.gray[400]};
  }

  &:active {
    background-color: ${theme.colors.gray[300]};
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
`;

const ResultsCount = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  font-size: 14px;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.lg};
`;

interface FiltersProps {
  filters: FilterOptions;
  sortBy: SortOption;
  onFilterChange: (filterType: keyof FilterOptions, value: string) => void;
  onSortChange: (sortBy: SortOption) => void;
  onClearFilters: () => void;
  resultsCount: number;
  isVisible: boolean;
  onToggle?: () => void;
}

export const Filters: React.FC<FiltersProps> = memo(({
  filters,
  sortBy,
  onFilterChange,
  onSortChange,
  onClearFilters,
  resultsCount,
  isVisible,
  onToggle
}) => {
  const makes = getAllMakes();
  const colors = getAllColors();

  return (
    <>
      <Overlay $isVisible={isVisible} onClick={onToggle} />
      <FiltersContainer $isVisible={isVisible}>
        <FilterHeader>
          <FilterHeaderTitle>Filters</FilterHeaderTitle>
          <CloseButton onClick={onToggle}>×</CloseButton>
        </FilterHeader>

        <ResultsCount>
          {resultsCount} vehicle{resultsCount !== 1 ? 's' : ''} found
        </ResultsCount>

        <FilterSection>
          <FilterTitle>Sort By</FilterTitle>
          <FilterSelect
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <option value="make">Make (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </FilterSelect>
        </FilterSection>


        <FilterSection>
          <FilterTitle>Filter by Make</FilterTitle>
          <FilterLabel htmlFor="make-filter">Make</FilterLabel>
          <FilterSelect
            id="make-filter"
            value={filters.make}
            onChange={(e) => onFilterChange('make', e.target.value)}
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </FilterSelect>
        </FilterSection>

        <FilterSection>
          <FilterTitle>Filter by Color</FilterTitle>
          <FilterLabel htmlFor="color-filter">Color</FilterLabel>
          <FilterSelect
            id="color-filter"
            value={filters.color}
            onChange={(e) => onFilterChange('color', e.target.value)}
          >
            <option value="">All Colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </FilterSelect>
        </FilterSection>

        <ClearButton onClick={onClearFilters}>
          Clear All Filters
        </ClearButton>
      </FiltersContainer>
    </>
  );
});