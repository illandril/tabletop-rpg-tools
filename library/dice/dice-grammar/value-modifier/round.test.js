/* SPDX-License-Identifier: MIT */

import Round from './round.js';

test('round 1 to 10', () => {
  for (let v = 1; v <= 10; v++) {
    for (let i = v - 0.5; i < v + 0.5; i += 0.01) {
      const round = new Round({ value: i });
      expect(round.value).toEqual(v);
    }
  }
});

test('round 0', () => {
  for (let i = -0.5; i < 0.5; i += 0.01) {
    const round = new Round({ value: i });
    if (i >= 0) {
      expect(round.value).toEqual(0);
    } else {
      expect(round.value).toEqual(-0);
    }
  }
});

test('round -1 to -10', () => {
  for (let v = -10; v <= -1; v++) {
    for (let i = v - 0.5; i < v + 0.5; i += 0.01) {
      const round = new Round({ value: i });
      expect(round.value).toEqual(v);
    }
  }
});
