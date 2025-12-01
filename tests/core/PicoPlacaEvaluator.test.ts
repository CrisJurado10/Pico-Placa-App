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
});
