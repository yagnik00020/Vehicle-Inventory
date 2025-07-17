import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Filters } from './components/Filters/Filters';
import { VehicleGrid } from './components/VehicleGrid/VehicleGrid';
import { FilterToggle } from './components/FilterToggle/FilterToggle';
import { useVehicleSearch } from './hooks/useVehicleSearch';
import { theme } from './theme';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
`;

const Header = styled.header`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  box-shadow: ${theme.shadows.md};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.025em;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  margin: ${theme.spacing.sm} 0 0 0;
  font-size: 16px;
  opacity: 0.9;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${theme.spacing.xl};
  align-items: start;

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const VehicleSection = styled.div`
  order: 1;

  @media (max-width: ${theme.breakpoints.desktop}) {
    order: 1;
  }
`;

const FilterSection = styled.div`
  order: 2;

  @media (max-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

function App() {
  const {
    searchZipCode,
    setSearchZipCode,
    searchVehicles,
    error,
    vehicles,
    filters,
    sortBy,
    setSortBy,
    updateFilter,
    clearFilters,
    isEmpty
  } = useVehicleSearch();

  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const toggleMobileFilters = () => {
    setMobileFiltersVisible(!mobileFiltersVisible);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Vehicle Inventory</Title>
        <Subtitle>Find your perfect vehicle</Subtitle>
      </Header>

      <MainContent>
        <SearchBar
          zipCode={searchZipCode}
          onZipCodeChange={setSearchZipCode}
          onSearch={searchVehicles}
          error={error}
        />

        <ContentGrid>
          <VehicleSection>
            <FilterToggle
              onClick={toggleMobileFilters}
              resultsCount={vehicles.length}
            />
            <VehicleGrid
              vehicles={vehicles}
              isEmpty={isEmpty}
            />
          </VehicleSection>

          <FilterSection>
            <Filters
              filters={filters}
              sortBy={sortBy}
              onFilterChange={updateFilter}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
              resultsCount={vehicles.length}
              isVisible={true}
            />
          </FilterSection>
        </ContentGrid>

        {/* Mobile-only filter overlay - only render on mobile/tablet */}
        {mobileFiltersVisible && (
          <Filters
            filters={filters}
            sortBy={sortBy}
            onFilterChange={updateFilter}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
            resultsCount={vehicles.length}
            isVisible={mobileFiltersVisible}
            onToggle={toggleMobileFilters}
          />
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
