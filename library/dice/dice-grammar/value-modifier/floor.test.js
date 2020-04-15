/* SPDX-License-Identifier: MIT */

import Floor from './floor.js';

test('floor -10 to 10', () => {
  for (let v = -10; v <= 10; v++) {
    for (let i = v; i < v + 1; i += 0.01) {
      const floor = new Floor({ value: i });
      expect(floor.value).toEqual(v);
    }
  }
});
