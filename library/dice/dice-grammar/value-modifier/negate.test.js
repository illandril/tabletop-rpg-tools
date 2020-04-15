/* SPDX-License-Identifier: MIT */

import Negate from './negate.js';

test('negate -10 to 10', () => {
  for (let v = -10; v <= 10; v += 0.01) {
    const negate = new Negate({ value: v });
    expect(negate.value).toEqual(-v);
  }
});
