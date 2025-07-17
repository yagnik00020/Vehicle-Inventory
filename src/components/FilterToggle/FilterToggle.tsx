import React, { memo } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const ToggleButton = styled.button`
  display: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: ${theme.spacing.lg};
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background-color: ${theme.colors.primaryLight};
  }

  &:active {
    background-color: ${theme.colors.primaryDark};
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    display: flex;
  }
`;

const FilterIcon = styled.span`
  font-size: 18px;
`;

interface FilterToggleProps {
  onClick: () => void;
  resultsCount: number;
}

export const FilterToggle: React.FC<FilterToggleProps> = memo(({
  onClick,
  resultsCount
}) => {
  return (
    <ToggleButton onClick={onClick}>
      <FilterIcon>⚙️</FilterIcon>
      Filters ({resultsCount})
    </ToggleButton>
  );
});