/* SPDX-License-Identifier: MIT */

import KeepHighest from './keep-highest.js';

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

test('1,2,3 kh 1', () => {
  anyOrder([1, 2, 3], (values) => {
    const kh = new KeepHighest(mockDice(values, 6), 1);
    expect(kh.keepRule).toEqual('highest');
    expect(kh.count).toEqual(1);
    expect(kh.originalCount).toEqual(3);
    expect(kh.sides).toEqual(6);
    expect(kh.kept).toEqual([3]);
    expect(kh.dropped).toEqual([1, 2]);
    expect(kh.values).toEqual([3]);
    expect(kh.originalValues).toEqual(values);
    expect(kh.value).toEqual(3);
  });
});

test('3,7,13,20 kh 2', () => {
  anyOrder([3, 7, 13, 20], (values) => {
    const kh = new KeepHighest(mockDice(values, 20), 2);
    expect(kh.keepRule).toEqual('highest');
    expect(kh.count).toEqual(2);
    expect(kh.originalCount).toEqual(4);
    expect(kh.sides).toEqual(20);
    expect(kh.kept).toEqual([13, 20]);
    expect(kh.dropped).toEqual([3, 7]);
    expect(kh.values).toEqual([13, 20]);
    expect(kh.originalValues).toEqual(values);
    expect(kh.value).toEqual(33);
  });
});
