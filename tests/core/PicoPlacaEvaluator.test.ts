import { PicoPlacaEvaluator } from '../../src/core/PicoPlacaEvaluator';
import { HolidayChecker } from '../../src/core/interfaces/HolidayChecker';

// Simple Mock
class MockHolidayChecker implements HolidayChecker {
  isHoliday(date: string): boolean {
    return date === '2025-12-25'; // Christmas is the only holiday in this mock
  }
}

describe('PicoPlacaEvaluator', () => {
  let evaluator: PicoPlacaEvaluator;

  beforeEach(() => {
    const mockChecker = new MockHolidayChecker();
    evaluator = new PicoPlacaEvaluator(mockChecker);
  });

  it('should be instantiated correctly', () => {
    expect(evaluator).toBeInstanceOf(PicoPlacaEvaluator);
  });

  it('should return a boolean result when checking if a car can drive', () => {
    const result = evaluator.canDrive('PBC-1234', '2025-12-01', '08:00'); 
    expect(typeof result).toBe('boolean');
  });

  it('should return false for plate ending in 1 on Monday morning (08:00)', () => {
    // 2025-12-01 is a Monday
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '08:00');
    expect(result).toBe(false);
  });

  it('should return true for plate ending in 1 on Monday at unrestricted time (12:00)', () => {
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '12:00');
    expect(result).toBe(true);
  });

  it('should return true for plate ending in 1 on Tuesday (unrestricted day)', () => {
    // 2025-12-02 is a Tuesday
    const result = evaluator.canDrive('PBC-1231', '2025-12-02', '08:00');
    expect(result).toBe(true);
  });

  it('should return true for any plate on Weekend (Saturday)', () => {
    // 2025-12-06 is a Saturday
    const result = evaluator.canDrive('PBC-1231', '2025-12-06', '08:00');
    expect(result).toBe(true);
  });

  it('should return false at exactly 07:00 (start of restricted time)', () => {
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '07:00');
    expect(result).toBe(false);
  });

  it('should return false at exactly 09:30 (end of restricted time)', () => {
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '09:30');
    expect(result).toBe(false);
  });

  it('should return true on a holiday even if plate/time is restricted', () => {
     // 2025-12-25 is a Thursday. Plate ending in 7 is restricted on Thursdays.
     // But mock says 2025-12-25 is a holiday.
     const result = evaluator.canDrive('PBC-1237', '2025-12-25', '08:00');
     expect(result).toBe(true);
  });
});