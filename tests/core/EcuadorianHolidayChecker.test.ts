import { EcuadorianHolidayChecker } from '../../src/core/EcuadorianHolidayChecker';

describe('EcuadorianHolidayChecker', () => {
  it('should return true for Christmas (2025-12-25)', () => {
    const checker = new EcuadorianHolidayChecker();
    expect(checker.isHoliday('2025-12-25')).toBe(true);
  });

  it('should return false for a regular day', () => {
    const checker = new EcuadorianHolidayChecker();
    expect(checker.isHoliday('2025-12-01')).toBe(false);
  });
});
