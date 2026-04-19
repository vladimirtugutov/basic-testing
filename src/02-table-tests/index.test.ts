import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator - table tests', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid input', () => {
    expect(simpleCalculator({ a: '5', b: 2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 5, b: null, action: Action.Multiply }),
    ).toBeNull();
    expect(simpleCalculator({ a: 5, b: 2, action: '%' })).toBeNull();
  });

  test('should return Infinity when dividing by zero', () => {
    const result = simpleCalculator({ a: 10, b: 0, action: Action.Divide });

    expect(result).toBe(Infinity);
  });

  test('should return 1 when exponentiating any number to zero', () => {
    const result = simpleCalculator({
      a: 7,
      b: 0,
      action: Action.Exponentiate,
    });

    expect(result).toBe(1);
  });

  test('should correctly subtract negative numbers', () => {
    const result = simpleCalculator({ a: -5, b: -3, action: Action.Subtract });

    expect(result).toBe(-2);
  });
});
