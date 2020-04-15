/* SPDX-License-Identifier: MIT */

import { ExpectTypeError } from '../../../utils';
import Explode from './explode.js';
import KeepHighest from './keep-highest.js';
import KeepLowest from './keep-lowest.js';
import Factory from './factory.js';

function mockDice(values, sides, extras) {
  let nextExtra = 0;
  return {
    count: values.length,
    values: values,
    sides: sides,
    rollAgain: () => extras[nextExtra++],
  };
}

function expectBadTypeErrors(types) {
  types.forEach((type) => {
    expect(() => Factory(type, mockDice([1], 8, []), [])).toThrow(
      'Unexpected dice modifier type: ' + type
    );
  });
}

test('invalid types', () => {
  expectBadTypeErrors(['k', 'd', 'K', 'D', 'keep', 'KEEP']);
});

test('type typing', () => {
  ExpectTypeError.string('type', () => Factory());
  [null, 0, {}, []].forEach((invalidType) => {
    ExpectTypeError.string('type', () => Factory(invalidType));
  });
});

test('args typing', () => {
  [null, 0, {}, '[]'].forEach((invalidArgs) => {
    ExpectTypeError.array('args', () => Factory('x', null, invalidArgs));
  });
});

describe('keep lowest', () => {
  test('1', () => {
    const modifier = Factory('kl', mockDice([1, 2, 3]), [1]);
    expect(modifier).toBeInstanceOf(KeepLowest);
    expect(modifier.count).toEqual(1);
    expect(modifier.kept).toEqual([1]);
    expect(modifier.dropped).toEqual([2, 3]);
    expect(modifier.value).toEqual(1);
  });

  test('2', () => {
    const modifier = Factory('kl', mockDice([2, 3, 5]), [2]);
    expect(modifier).toBeInstanceOf(KeepLowest);
    expect(modifier.count).toEqual(2);
    expect(modifier.kept).toEqual([2, 3]);
    expect(modifier.dropped).toEqual([5]);
    expect(modifier.value).toEqual(5);
  });

  test('case sensitivity', () => {
    expectBadTypeErrors(['KL', 'Kl', 'kL']);
  });

  describe('drop highest', () => {
    test('1', () => {
      const modifier = Factory('dh', mockDice([1, 2, 3]), [1]);
      expect(modifier).toBeInstanceOf(KeepLowest);
      expect(modifier.count).toEqual(2);
      expect(modifier.kept).toEqual([1, 2]);
      expect(modifier.dropped).toEqual([3]);
      expect(modifier.value).toEqual(3);
    });

    test('2', () => {
      const modifier = Factory('dh', mockDice([2, 3, 5]), [2]);
      expect(modifier).toBeInstanceOf(KeepLowest);
      expect(modifier.count).toEqual(1);
      expect(modifier.kept).toEqual([2]);
      expect(modifier.dropped).toEqual([3, 5]);
      expect(modifier.value).toEqual(2);
    });

    test('case sensitivity', () => {
      expectBadTypeErrors(['DH', 'Dh', 'dH']);
    });
  });
});

describe('keep highest', () => {
  test('1', () => {
    const modifier = Factory('kh', mockDice([1, 2, 3]), [1]);
    expect(modifier).toBeInstanceOf(KeepHighest);
    expect(modifier.count).toEqual(1);
    expect(modifier.kept).toEqual([3]);
    expect(modifier.dropped).toEqual([1, 2]);
    expect(modifier.value).toEqual(3);
  });

  test('2', () => {
    const modifier = Factory('kh', mockDice([2, 3, 5]), [2]);
    expect(modifier).toBeInstanceOf(KeepHighest);
    expect(modifier.count).toEqual(2);
    expect(modifier.kept).toEqual([3, 5]);
    expect(modifier.dropped).toEqual([2]);
    expect(modifier.value).toEqual(8);
  });

  test('case sensitivity', () => {
    expectBadTypeErrors(['KH', 'Kh', 'kH']);
  });

  describe('drop lowest', () => {
    test('1', () => {
      const modifier = Factory('dl', mockDice([1, 2, 3]), [1]);
      expect(modifier).toBeInstanceOf(KeepHighest);
      expect(modifier.count).toEqual(2);
      expect(modifier.kept).toEqual([2, 3]);
      expect(modifier.dropped).toEqual([1]);
      expect(modifier.value).toEqual(5);
    });

    test('2', () => {
      const modifier = Factory('dl', mockDice([2, 3, 5]), [2]);
      expect(modifier).toBeInstanceOf(KeepHighest);
      expect(modifier.count).toEqual(1);
      expect(modifier.kept).toEqual([5]);
      expect(modifier.dropped).toEqual([2, 3]);
      expect(modifier.value).toEqual(5);
    });

    test('case sensitivity', () => {
      expectBadTypeErrors(['DL', 'Dl', 'dL']);
    });
  });
});

describe('explode', () => {
  describe('d6', () => {
    test('!', () => {
      const modifier = Factory('!', mockDice([2, 3, 6], 6, [5, 4]), ['=', null]);
      expect(modifier).toBeInstanceOf(Explode);
      expect(modifier.count).toEqual(4);
      expect(modifier.values).toEqual([2, 3, 6, 5]);
      expect(modifier.originalValues).toEqual([2, 3, 6]);
      expect(modifier.extraValues).toEqual([5]);
      expect(modifier.value).toEqual(16);
    });

    test('!5', () => {
      const modifier = Factory('!', mockDice([2, 3, 5], 6, [6, 1, 2]), ['=', 5]);
      expect(modifier).toBeInstanceOf(Explode);
      expect(modifier.count).toEqual(4);
      expect(modifier.values).toEqual([2, 3, 5, 6]);
      expect(modifier.originalValues).toEqual([2, 3, 5]);
      expect(modifier.extraValues).toEqual([6]);
      expect(modifier.value).toEqual(16);
    });

    test('!>4', () => {
      const modifier = Factory('!', mockDice([3, 4, 5], 6, [6, 5, 4, 3]), ['>', 4]);
      expect(modifier).toBeInstanceOf(Explode);
      expect(modifier.count).toEqual(6);
      expect(modifier.values).toEqual([3, 4, 5, 6, 5, 4]);
      expect(modifier.originalValues).toEqual([3, 4, 5]);
      expect(modifier.extraValues).toEqual([6, 5, 4]);
      expect(modifier.value).toEqual(27);
    });
  });
  describe('d8', () => {
    test('!', () => {
      const modifier = Factory('!', mockDice([2, 8, 6], 8, [7, 4]), ['=', null]);
      expect(modifier).toBeInstanceOf(Explode);
      expect(modifier.count).toEqual(4);
      expect(modifier.values).toEqual([2, 8, 7, 6]);
      expect(modifier.originalValues).toEqual([2, 8, 6]);
      expect(modifier.extraValues).toEqual([7]);
      expect(modifier.value).toEqual(23);
    });
    test('<5', () => {
      const modifier = Factory('!', mockDice([2, 8, 4], 8, [7, 4, 3, 1, 5, 5]), ['<', 5]);
      expect(modifier).toBeInstanceOf(Explode);
      expect(modifier.count).toEqual(8);
      expect(modifier.values).toEqual([2, 7, 8, 4, 4, 3, 1, 5]);
      expect(modifier.originalValues).toEqual([2, 8, 4]);
      expect(modifier.extraValues).toEqual([7, 4, 3, 1, 5]);
      expect(modifier.value).toEqual(34);
    });
  });
});
