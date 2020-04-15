/* SPDX-License-Identifier: MIT */

import KeepLowest from './keep-lowest.js';

function mockDice(values, sides) {
  return Object.freeze({
    count: values.length,
    values: values,
    sides: sides,
  });
}

function anyOrder(values, action) {
  if (values.length < 2) {
    action(values);
  } else if (values.length === 2) {
    action(Object.freeze([values[0], values[1]]));
    action(Object.freeze([values[1], values[0]]));
  } else {
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const rest = [...values];
      rest.splice(i, 1);
      anyOrder(rest, (restJumbled) => {
        action(Object.freeze([value, ...restJumbled]));
      });
    }
  }
}

test('1,2,3 kl 1', () => {
  anyOrder([1, 2, 3], (values) => {
    const kl = new KeepLowest(mockDice(values, 6), 1);
    expect(kl.keepRule).toEqual('lowest');
    expect(kl.count).toEqual(1);
    expect(kl.originalCount).toEqual(3);
    expect(kl.sides).toEqual(6);
    expect(kl.kept).toEqual([1]);
    expect(kl.dropped).toEqual([2, 3]);
    expect(kl.values).toEqual([1]);
    expect(kl.originalValues).toEqual(values);
    expect(kl.value).toEqual(1);
  });
});

test('3,7,13,20 kl 2', () => {
  anyOrder([3, 7, 13, 20], (values) => {
    const kl = new KeepLowest(mockDice(values, 20), 2);
    expect(kl.keepRule).toEqual('lowest');
    expect(kl.count).toEqual(2);
    expect(kl.originalCount).toEqual(4);
    expect(kl.sides).toEqual(20);
    expect(kl.kept).toEqual([3, 7]);
    expect(kl.dropped).toEqual([13, 20]);
    expect(kl.values).toEqual([3, 7]);
    expect(kl.originalValues).toEqual(values);
    expect(kl.value).toEqual(10);
  });
});
