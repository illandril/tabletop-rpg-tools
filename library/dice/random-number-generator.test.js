/* SPDX-License-Identifier: MIT */

import RandomNumberGenerator from './random-number-generator.js';

test('accepts rng', () => {
  let a = 0.05;
  function oneToTen() {
    a += 0.1;
    if (a >= 1) {
      a = 0.05;
    }
    return a;
  }
  const rng = new RandomNumberGenerator(oneToTen);
  expect(rng.int(10)).toBe(1);
  expect(rng.int(10)).toBe(2);
  expect(rng.int(10)).toBe(3);
  expect(rng.int(10)).toBe(4);
  expect(rng.int(10)).toBe(5);
  expect(rng.int(10)).toBe(6);
  expect(rng.int(10)).toBe(7);
  expect(rng.int(10)).toBe(8);
  expect(rng.int(10)).toBe(9);
  expect(rng.int(10)).toBe(0);
  expect(rng.int(10)).toBe(1);
  expect(rng.int(10)).toBe(2);
  expect(rng.int(10)).toBe(3);
  expect(rng.int(10)).toBe(4);
  expect(rng.int(10)).toBe(5);
  expect(rng.int(10)).toBe(6);
  expect(rng.int(10)).toBe(7);
  expect(rng.int(10)).toBe(8);
  expect(rng.int(10)).toBe(9);
  expect(rng.int(10)).toBe(0);
});
