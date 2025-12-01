import { PicoPlacaEvaluator } from '../../src/core/PicoPlacaEvaluator';

describe('PicoPlacaEvaluator', () => {
  it('should be instantiated correctly', () => {
    const evaluator = new PicoPlacaEvaluator();
    expect(evaluator).toBeInstanceOf(PicoPlacaEvaluator);
  });

  it('should return a boolean result when checking if a car can drive', () => {
    const evaluator = new PicoPlacaEvaluator();
    // Using dummy data for now just to establish the interface
    const result = evaluator.canDrive('PBC-1234', '2025-12-01', '08:00'); 
    expect(typeof result).toBe('boolean');
  });

  it('should return false for plate ending in 1 on Monday morning (08:00)', () => {
    const evaluator = new PicoPlacaEvaluator();
    // 2025-12-01 is a Monday
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '08:00');
    expect(result).toBe(false);
  });

  it('should return true for plate ending in 1 on Monday at unrestricted time (12:00)', () => {
    const evaluator = new PicoPlacaEvaluator();
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '12:00');
    expect(result).toBe(true);
  });

  it('should return true for plate ending in 1 on Tuesday (unrestricted day)', () => {
    const evaluator = new PicoPlacaEvaluator();
    // 2025-12-02 is a Tuesday
    const result = evaluator.canDrive('PBC-1231', '2025-12-02', '08:00');
    expect(result).toBe(true);
  });

  it('should return true for any plate on Weekend (Saturday)', () => {
    const evaluator = new PicoPlacaEvaluator();
    // 2025-12-06 is a Saturday
    const result = evaluator.canDrive('PBC-1231', '2025-12-06', '08:00');
    expect(result).toBe(true);
  });

  it('should return false at exactly 07:00 (start of restricted time)', () => {
    const evaluator = new PicoPlacaEvaluator();
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '07:00');
    expect(result).toBe(false);
  });

  it('should return false at exactly 09:30 (end of restricted time)', () => {
    const evaluator = new PicoPlacaEvaluator();
    const result = evaluator.canDrive('PBC-1231', '2025-12-01', '09:30');
    expect(result).toBe(false);
  });
});
