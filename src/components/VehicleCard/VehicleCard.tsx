import React, { memo } from 'react';
import styled from 'styled-components';
import { Vehicle } from '../../types/Vehicle';
import { theme } from '../../theme';

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray[200]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: ${theme.colors.gray[50]};
  position: relative;
`;

const VehicleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const VehicleHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const VehicleTitle = styled.h3`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  line-height: 1.2;
`;

const VehicleSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${theme.colors.gray[600]};
  font-weight: 500;
`;

const VehicleDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const DetailLabel = styled.span`
  color: ${theme.colors.gray[500]};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  color: ${theme.colors.gray[900]};
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0 0 0;
  border-top: 1px solid ${theme.colors.gray[100]};
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${theme.colors.primary};
`;

const ZipCodeBadge = styled.span`
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[600]};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 12px;
  font-weight: 500;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => getColorCode(props.color)};
  border: 2px solid ${theme.colors.gray[300]};
  margin-left: ${theme.spacing.xs};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const getColorCode = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    'White': '#ffffff',
    'Black': '#000000',
    'Silver': '#c0c0c0',
    'Gray': '#808080',
    'Red': '#ff0000',
    'Blue': '#0000ff',
    'Yellow': '#ffff00',
    'Green': '#008000'
  };
  return colorMap[color] || '#cccccc';
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = memo(({ vehicle }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <Card>
      <ImageContainer>
        <VehicleImage
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=No+Image';
          }}
        />
      </ImageContainer>
      <CardContent>
        <VehicleHeader>
          <VehicleTitle>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </VehicleTitle>
          <VehicleSubtitle>
            {vehicle.trim}
          </VehicleSubtitle>
        </VehicleHeader>
        
        <VehicleDetails>
          <DetailItem>
            <DetailLabel>Mileage</DetailLabel>
            <DetailValue>{formatMileage(vehicle.mileage)} mi</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Color</DetailLabel>
            <DetailValue>
              {vehicle.color}
              <ColorDot color={vehicle.color} />
            </DetailValue>
          </DetailItem>
        </VehicleDetails>

        <PriceContainer>
          <Price>{formatPrice(vehicle.price)}</Price>
          <ZipCodeBadge>{vehicle.zipCode}</ZipCodeBadge>
        </PriceContainer>
      </CardContent>
    </Card>
  );
});