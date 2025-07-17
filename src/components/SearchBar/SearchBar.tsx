import React, { FormEvent, memo } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primaryLight};
  }

  &:active {
    background-color: ${theme.colors.primaryDark};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 14px;
  margin-top: ${theme.spacing.sm};
  text-align: center;
`;

interface SearchBarProps {
  zipCode: string;
  onZipCodeChange: (zipCode: string) => void;
  onSearch: () => void;
  error: string;
}

export const SearchBar: React.FC<SearchBarProps> = memo(({
  zipCode,
  onZipCodeChange,
  onSearch,
  error
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleBlur = () => {
    // Auto-search when user clicks outside (loses focus)
    if (zipCode.trim()) {
      onSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Enter ZIP code (e.g., 90210)"
          value={zipCode}
          onChange={(e) => onZipCodeChange(e.target.value)}
          onBlur={handleBlur}
          maxLength={5}
        />
        <SearchButton type="submit">
          Search Vehicles
        </SearchButton>
      </SearchForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SearchContainer>
  );
});