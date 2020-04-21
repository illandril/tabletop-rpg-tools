/* SPDX-License-Identifier: MIT */

import { ExpectTypeError } from '../../../utils';

import Explode from './explode.js';

function mockDice(values, sides, extras) {
  let nextExtra = 0;
  return {
    count: values.length,
    values: values,
    sides: sides,
    rollAgain: () => extras[nextExtra++],
  };
}

describe('invalid types', () => {
  test('undefined', () => {
    ExpectTypeError.string('triggerType', () => new Explode(mockDice([6], 6, [6, 5, 4])));
  });
  test('null', () => {
    ExpectTypeError.string('triggerType', () => new Explode(mockDice([6], 6, [6, 5, 4]), null));
  });
  test('non strings', () => {
    [1, 2.5, () => '=', { toString: () => '=' }, ['=']].forEach((nonString) => {
      ExpectTypeError.string(
        'triggerType',
        () => new Explode(mockDice([6], 6, [6, 5, 4]), nonString)
      );
    });
  });
});

describe('type: =', () => {
  describe('invalid values', () => {
    function badValueAnySides(value) {
      [4, 6, 20].forEach((sides) => {
        badValue(sides, value);
      });
    }

    function badValue(sides, value) {
      const dice = mockDice([], sides, []);
      ExpectTypeError.integerBetween('triggerValue', 1, sides, () => new Explode(dice, '=', value));
    }

    test('undefined', () => {
      badValueAnySides(undefined);
    });

    test('non integer', () => {
      ['1', 2.5, () => 1, { valueOf: () => 1 }, [1]].forEach((nonInteger) => {
        badValueAnySides(nonInteger);
      });
    });

    test('too low', () => {
      [-10, -5, -1, 0].forEach((tooLowInteger) => {
        badValueAnySides(tooLowInteger);
      });
    });

    test('too high', () => {
      badValue(4, 5);
      badValue(4, 40);
      badValue(6, 7);
      badValue(20, 21);
    });
  });

  describe('valid values', () => {
    describe('null', () => {
      test('d6 4,5,6 : 6,5,4', () => {
        const exp = new Explode(mockDice([4, 5, 6], 6, [6, 5, 4]), '=', null);
        expect(exp.count).toEqual(5);
        expect(exp.originalCount).toEqual(3);
        expect(exp.sides).toEqual(6);
        expect(exp.values).toEqual([4, 5, 6, 6, 5]);
        expect(exp.originalValues).toEqual([4, 5, 6]);
        expect(exp.extraValues).toEqual([6, 5]);
        expect(exp.value).toEqual(26);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(false);
        expect(exp.isExploded(5)).toEqual(false);
        expect(exp.isExploded(6)).toEqual(true);
      });

      test('d8 8,7,6,8,1 : 5,8,2,3', () => {
        const exp = new Explode(mockDice([8, 7, 6, 8, 1], 8, [5, 8, 2, 3]), '=', null);
        expect(exp.count).toEqual(8);
        expect(exp.originalCount).toEqual(5);
        expect(exp.sides).toEqual(8);
        expect(exp.values).toEqual([8, 5, 7, 6, 8, 8, 2, 1]);
        expect(exp.originalValues).toEqual([8, 7, 6, 8, 1]);
        expect(exp.extraValues).toEqual([5, 8, 2]);
        expect(exp.value).toEqual(45);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(false);
        expect(exp.isExploded(5)).toEqual(false);
        expect(exp.isExploded(6)).toEqual(false);
        expect(exp.isExploded(7)).toEqual(false);
        expect(exp.isExploded(8)).toEqual(true);
      });
    });

    test('1: d6 1,2,3 : 1,2,3', () => {
      const exp = new Explode(mockDice([1, 2, 3], 6, [1, 2, 3]), '=', 1);
      expect(exp.count).toEqual(5);
      expect(exp.originalCount).toEqual(3);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([1, 1, 2, 2, 3]);
      expect(exp.originalValues).toEqual([1, 2, 3]);
      expect(exp.extraValues).toEqual([1, 2]);
      expect(exp.value).toEqual(9);
      expect(exp.isExploded(1)).toEqual(true);
      expect(exp.isExploded(2)).toEqual(false);
      expect(exp.isExploded(3)).toEqual(false);
      expect(exp.isExploded(4)).toEqual(false);
      expect(exp.isExploded(5)).toEqual(false);
      expect(exp.isExploded(6)).toEqual(false);
    });

    test('8: d8 8,7,6,8,1 : 5,8,2,3', () => {
      const exp = new Explode(mockDice([8, 7, 6, 8, 1], 8, [5, 8, 2, 3]), '=', 8);
      expect(exp.count).toEqual(8);
      expect(exp.originalCount).toEqual(5);
      expect(exp.sides).toEqual(8);
      expect(exp.values).toEqual([8, 5, 7, 6, 8, 8, 2, 1]);
      expect(exp.originalValues).toEqual([8, 7, 6, 8, 1]);
      expect(exp.extraValues).toEqual([5, 8, 2]);
      expect(exp.value).toEqual(45);
      expect(exp.isExploded(1)).toEqual(false);
      expect(exp.isExploded(2)).toEqual(false);
      expect(exp.isExploded(3)).toEqual(false);
      expect(exp.isExploded(4)).toEqual(false);
      expect(exp.isExploded(5)).toEqual(false);
      expect(exp.isExploded(6)).toEqual(false);
      expect(exp.isExploded(7)).toEqual(false);
      expect(exp.isExploded(8)).toEqual(true);
    });

    describe('4', () => {
      test('d6 4,5,6 : 3,5', () => {
        const exp = new Explode(mockDice([4, 5, 6], 6, [3, 5]), '=', 4);
        expect(exp.count).toEqual(4);
        expect(exp.originalCount).toEqual(3);
        expect(exp.sides).toEqual(6);
        expect(exp.values).toEqual([4, 3, 5, 6]);
        expect(exp.originalValues).toEqual([4, 5, 6]);
        expect(exp.extraValues).toEqual([3]);
        expect(exp.value).toEqual(18);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(true);
        expect(exp.isExploded(5)).toEqual(false);
        expect(exp.isExploded(6)).toEqual(false);
      });

      test('d8 8,7,4,8,1 : 4,4,2,3', () => {
        const exp = new Explode(mockDice([8, 7, 4, 8, 1], 8, [4, 4, 2, 3]), '=', 4);
        expect(exp.count).toEqual(8);
        expect(exp.originalCount).toEqual(5);
        expect(exp.sides).toEqual(8);
        expect(exp.values).toEqual([8, 7, 4, 4, 4, 2, 8, 1]);
        expect(exp.originalValues).toEqual([8, 7, 4, 8, 1]);
        expect(exp.extraValues).toEqual([4, 4, 2]);
        expect(exp.value).toEqual(38);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(true);
        expect(exp.isExploded(5)).toEqual(false);
        expect(exp.isExploded(6)).toEqual(false);
        expect(exp.isExploded(7)).toEqual(false);
        expect(exp.isExploded(8)).toEqual(false);
      });
    });
  });
});

describe('type: >', () => {
  describe('invalid values', () => {
    function badValueAnySides(value) {
      [4, 6, 20].forEach((sides) => {
        badValue(sides, value);
      });
    }

    function badValue(sides, value) {
      const dice = mockDice([], sides, []);
      ExpectTypeError.integerBetween(
        'triggerValue',
        1,
        sides - 1,
        () => new Explode(dice, '>', value)
      );
    }

    test('undefined', () => {
      badValueAnySides(undefined);
    });

    test('null', () => {
      badValueAnySides(null);
    });

    test('non integer', () => {
      ['1', 2.5, () => 1, { valueOf: () => 1 }, [1]].forEach((nonInteger) => {
        badValueAnySides(nonInteger);
      });
    });

    test('too low', () => {
      [-10, -5, -1, 0].forEach((tooLowInteger) => {
        badValueAnySides(tooLowInteger);
      });
    });

    test('too high', () => {
      badValue(4, 4);
      badValue(4, 5);
      badValue(6, 6);
      badValue(20, 20);
    });
  });

  describe('valid values', () => {
    test('1: d6 1,2,3 : 1,2,3,1,2', () => {
      const exp = new Explode(mockDice([1, 2, 3], 6, [1, 2, 3, 1, 2]), '>', 1);
      expect(exp.count).toEqual(7);
      expect(exp.originalCount).toEqual(3);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([1, 2, 1, 3, 2, 3, 1]);
      expect(exp.originalValues).toEqual([1, 2, 3]);
      expect(exp.extraValues).toEqual([1, 2, 3, 1]);
      expect(exp.value).toEqual(13);
      expect(exp.isExploded(1)).toEqual(false);
      expect(exp.isExploded(2)).toEqual(true);
      expect(exp.isExploded(3)).toEqual(true);
      expect(exp.isExploded(4)).toEqual(true);
      expect(exp.isExploded(5)).toEqual(true);
      expect(exp.isExploded(6)).toEqual(true);
    });

    test('2: d6 1,2,3 : 1,3', () => {
      const exp = new Explode(mockDice([1, 2, 3], 6, [1, 3]), '>', 2);
      expect(exp.count).toEqual(4);
      expect(exp.originalCount).toEqual(3);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([1, 2, 3, 1]);
      expect(exp.originalValues).toEqual([1, 2, 3]);
      expect(exp.extraValues).toEqual([1]);
      expect(exp.value).toEqual(7);
      expect(exp.isExploded(1)).toEqual(false);
      expect(exp.isExploded(2)).toEqual(false);
      expect(exp.isExploded(3)).toEqual(true);
      expect(exp.isExploded(4)).toEqual(true);
      expect(exp.isExploded(5)).toEqual(true);
      expect(exp.isExploded(6)).toEqual(true);
    });

    test('3: d6 6,5,4,3,2,1 : 3,2,1,2,1,3', () => {
      const exp = new Explode(mockDice([6, 5, 4, 3, 2, 1], 6, [3, 2, 1, 2, 1, 3]), '>', 3);
      expect(exp.count).toEqual(9);
      expect(exp.originalCount).toEqual(6);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([6, 3, 5, 2, 4, 1, 3, 2, 1]);
      expect(exp.originalValues).toEqual([6, 5, 4, 3, 2, 1]);
      expect(exp.extraValues).toEqual([3, 2, 1]);
      expect(exp.value).toEqual(27);
      expect(exp.isExploded(1)).toEqual(false);
      expect(exp.isExploded(2)).toEqual(false);
      expect(exp.isExploded(3)).toEqual(false);
      expect(exp.isExploded(4)).toEqual(true);
      expect(exp.isExploded(5)).toEqual(true);
      expect(exp.isExploded(6)).toEqual(true);
    });

    describe('4', () => {
      test('d6 4,5,6 : 3,5,4,2', () => {
        const exp = new Explode(mockDice([4, 5, 6], 6, [3, 5, 4, 2]), '>', 4);
        expect(exp.count).toEqual(6);
        expect(exp.originalCount).toEqual(3);
        expect(exp.sides).toEqual(6);
        expect(exp.values).toEqual([4, 5, 3, 6, 5, 4]);
        expect(exp.originalValues).toEqual([4, 5, 6]);
        expect(exp.extraValues).toEqual([3, 5, 4]);
        expect(exp.value).toEqual(27);
        expect(exp.isExploded(-6)).toEqual(false);
        expect(exp.isExploded(0)).toEqual(false);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(false);
        expect(exp.isExploded(5)).toEqual(true);
        expect(exp.isExploded(6)).toEqual(true);
        expect(exp.isExploded(7)).toEqual(true);
      });

      test('d8 8,7,4,8,1 : 4,4,5,5,3,4', () => {
        const exp = new Explode(mockDice([8, 7, 4, 8, 1], 8, [4, 4, 5, 5, 3, 4]), '>', 4);
        expect(exp.count).toEqual(10);
        expect(exp.originalCount).toEqual(5);
        expect(exp.sides).toEqual(8);
        expect(exp.values).toEqual([8, 4, 7, 4, 4, 8, 5, 5, 3, 1]);
        expect(exp.originalValues).toEqual([8, 7, 4, 8, 1]);
        expect(exp.extraValues).toEqual([4, 4, 5, 5, 3]);
        expect(exp.value).toEqual(49);
        expect(exp.isExploded(-8)).toEqual(false);
        expect(exp.isExploded(0)).toEqual(false);
        expect(exp.isExploded(1)).toEqual(false);
        expect(exp.isExploded(2)).toEqual(false);
        expect(exp.isExploded(3)).toEqual(false);
        expect(exp.isExploded(4)).toEqual(false);
        expect(exp.isExploded(5)).toEqual(true);
        expect(exp.isExploded(6)).toEqual(true);
        expect(exp.isExploded(7)).toEqual(true);
        expect(exp.isExploded(8)).toEqual(true);
        expect(exp.isExploded(9)).toEqual(true);
      });
    });
  });
});

describe('type: <', () => {
  describe('invalid values', () => {
    function badValueAnySides(value) {
      [4, 6, 20].forEach((sides) => {
        badValue(sides, value);
      });
    }

    function badValue(sides, value) {
      const dice = mockDice([], sides, []);
      ExpectTypeError.integerBetween('triggerValue', 2, sides, () => new Explode(dice, '<', value));
    }

    test('undefined', () => {
      badValueAnySides(undefined);
    });

    test('null', () => {
      badValueAnySides(null);
    });

    test('non integer', () => {
      ['2', 2.5, () => 2, { valueOf: () => 2 }, [2]].forEach((nonInteger) => {
        badValueAnySides(nonInteger);
      });
    });

    test('too low', () => {
      [-10, -5, -1, 0, 1].forEach((tooLowInteger) => {
        badValueAnySides(tooLowInteger);
      });
    });

    test('too high', () => {
      badValue(4, 5);
      badValue(4, 20);
      badValue(6, 7);
      badValue(20, 21);
    });
  });

  describe('valid values', () => {
    test('2: d6 1,3,2 : 1,2,3', () => {
      const exp = new Explode(mockDice([1, 3, 2], 6, [1, 2, 3]), '<', 2);
      expect(exp.count).toEqual(5);
      expect(exp.originalCount).toEqual(3);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([1, 1, 2, 3, 2]);
      expect(exp.originalValues).toEqual([1, 3, 2]);
      expect(exp.extraValues).toEqual([1, 2]);
      expect(exp.value).toEqual(9);
      expect(exp.isExploded(1)).toEqual(true);
      expect(exp.isExploded(2)).toEqual(false);
      expect(exp.isExploded(3)).toEqual(false);
      expect(exp.isExploded(4)).toEqual(false);
      expect(exp.isExploded(5)).toEqual(false);
      expect(exp.isExploded(6)).toEqual(false);
    });

    test('3: d6 6,5,4,3,2,1 : 3,2,1,2,3,1', () => {
      const exp = new Explode(mockDice([6, 5, 4, 3, 2, 1], 6, [3, 2, 1, 2, 3, 1]), '<', 3);
      expect(exp.count).toEqual(11);
      expect(exp.originalCount).toEqual(6);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([6, 5, 4, 3, 2, 3, 1, 2, 1, 2, 3]);
      expect(exp.originalValues).toEqual([6, 5, 4, 3, 2, 1]);
      expect(exp.extraValues).toEqual([3, 2, 1, 2, 3]);
      expect(exp.value).toEqual(32);
      expect(exp.isExploded(1)).toEqual(true);
      expect(exp.isExploded(2)).toEqual(true);
      expect(exp.isExploded(3)).toEqual(false);
      expect(exp.isExploded(4)).toEqual(false);
      expect(exp.isExploded(5)).toEqual(false);
      expect(exp.isExploded(6)).toEqual(false);
    });

    test('4: d4 1,2,3,4 : 3,4,2,4,1,4,1', () => {
      const exp = new Explode(mockDice([1, 2, 3, 4], 4, [3, 4, 2, 4, 1, 4, 1]), '<', 4);
      expect(exp.count).toEqual(10);
      expect(exp.originalCount).toEqual(4);
      expect(exp.sides).toEqual(4);
      expect(exp.values).toEqual([1, 3, 4, 2, 2, 4, 3, 1, 4, 4]);
      expect(exp.originalValues).toEqual([1, 2, 3, 4]);
      expect(exp.extraValues).toEqual([3, 4, 2, 4, 1, 4]);
      expect(exp.value).toEqual(28);
      expect(exp.isExploded(1)).toEqual(true);
      expect(exp.isExploded(2)).toEqual(true);
      expect(exp.isExploded(3)).toEqual(true);
      expect(exp.isExploded(4)).toEqual(false);
    });

    test('6: d6 1,2,3 : 6,5,6,2,6,3,6,3,6,1,6,2', () => {
      const exp = new Explode(mockDice([1, 2, 3], 6, [6, 5, 6, 2, 6, 3]), '<', 6);
      expect(exp.count).toEqual(8);
      expect(exp.originalCount).toEqual(3);
      expect(exp.sides).toEqual(6);
      expect(exp.values).toEqual([1, 6, 2, 5, 6, 3, 2, 6]);
      expect(exp.originalValues).toEqual([1, 2, 3]);
      expect(exp.extraValues).toEqual([6, 5, 6, 2, 6]);
      expect(exp.value).toEqual(31);
      expect(exp.isExploded(1)).toEqual(true);
      expect(exp.isExploded(2)).toEqual(true);
      expect(exp.isExploded(3)).toEqual(true);
      expect(exp.isExploded(4)).toEqual(true);
      expect(exp.isExploded(5)).toEqual(true);
      expect(exp.isExploded(6)).toEqual(false);
    });
  });
});
