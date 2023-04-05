import assert from 'node:assert';
import { beforeEach, describe, test } from 'node:test';
import fibonacci from '../../src/utils/fibonacci.js';

describe('Fibonacci Calculator', () => {
  const cases = [0, 1, 2, 3, 4, 5];
  const expectedResults = [1, 1, 2, 6, 24, 120];

  let results;

  beforeEach(() => {
    results = cases.map((n) => fibonacci(n));
  });

  test('"results" should have the same elements as "expectedResults"', () => {
    const resultsStr = results.join('');
    const expectedResultsStr = expectedResults.join('');
    assert.strictEqual(resultsStr, expectedResultsStr);
  });
});
