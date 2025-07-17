import React, { memo } from 'react';
import styled from 'styled-components';
import { Vehicle } from '../../types/Vehicle';
import { VehicleCard } from '../VehicleCard/VehicleCard';
import { theme } from '../../theme';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray[600]};
  min-height: 60vh;
`;

const EmptyTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 24px;
  color: ${theme.colors.gray[700]};
`;

const EmptyMessage = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  max-width: 500px;
`;

interface VehicleGridProps {
  vehicles: Vehicle[];
  isEmpty: boolean;
}

export const VehicleGrid: React.FC<VehicleGridProps> = memo(({
  vehicles,
  isEmpty,
}) => {
  if (isEmpty) {
    return (
      <EmptyState>
        <EmptyTitle>No vehicles found</EmptyTitle>
        <EmptyMessage>
          We couldn't find any vehicles matching your criteria. 
          Try adjusting your filters or search in a different ZIP code.
        </EmptyMessage>
      </EmptyState>
    );
  }

  return (
    <GridContainer>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </GridContainer>
  );
});