/* SPDX-License-Identifier: MIT */

import Ceil from './ceil.js';

test('ceil 1 to 10', () => {
  for (let v = 1; v <= 10; v++) {
    for (let i = v; i > v - 1; i -= 0.01) {
      const ceil = new Ceil({ value: i });
      expect(ceil.value).toEqual(v);
    }
  }
});

test('ceil 0', () => {
  for (let i = 0; i > -1; i -= 0.01) {
    const ceil = new Ceil({ value: i });
    if (i === 0) {
      expect(ceil.value).toEqual(0);
    } else {
      expect(ceil.value).toEqual(-0);
    }
  }
});

test('ceil -1 to -10', () => {
  for (let v = -10; v <= -1; v++) {
    for (let i = v; i > v - 1; i -= 0.01) {
      const ceil = new Ceil({ value: i });
      expect(ceil.value).toEqual(v);
    }
  }
});
