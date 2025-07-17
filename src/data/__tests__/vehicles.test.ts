import { getVehiclesByZipCode, getAllMakes, getAllColors } from '../vehicles';

describe('vehicles data utilities', () => {
  describe('getVehiclesByZipCode', () => {
    test('returns vehicles for valid ZIP code', () => {
      const vehicles = getVehiclesByZipCode('90210');
      
      expect(vehicles.length).toBeGreaterThan(0);
      expect(vehicles.every(vehicle => vehicle.zipCode === '90210')).toBe(true);
    });

    test('returns empty array for invalid ZIP code', () => {
      const vehicles = getVehiclesByZipCode('00000');
      
      expect(vehicles).toEqual([]);
    });

    test('returns different vehicles for different ZIP codes', () => {
      const vehicles1 = getVehiclesByZipCode('90210');
      const vehicles2 = getVehiclesByZipCode('10001');
      
      expect(vehicles1).not.toEqual(vehicles2);
    });
  });

  describe('getAllMakes', () => {
    test('returns unique makes in alphabetical order', () => {
      const makes = getAllMakes();
      
      expect(makes.length).toBeGreaterThan(0);
      expect(makes).toEqual([...new Set(makes)]);
      
      const sortedMakes = [...makes].sort();
      expect(makes).toEqual(sortedMakes);
    });

    test('includes expected vehicle makes', () => {
      const makes = getAllMakes();
      
      expect(makes).toContain('Toyota');
      expect(makes).toContain('Honda');
      expect(makes).toContain('BMW');
    });
  });

  describe('getAllColors', () => {
    test('returns unique colors in alphabetical order', () => {
      const colors = getAllColors();
      
      expect(colors.length).toBeGreaterThan(0);
      expect(colors).toEqual([...new Set(colors)]);
      
      const sortedColors = [...colors].sort();
      expect(colors).toEqual(sortedColors);
    });

    test('includes expected vehicle colors', () => {
      const colors = getAllColors();
      
      expect(colors).toContain('White');
      expect(colors).toContain('Black');
      expect(colors).toContain('Silver');
    });
  });
});