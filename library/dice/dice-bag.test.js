/* SPDX-License-Identifier: MIT */

import shortid from 'shortid';

import RNGMulberry32 from './random-number-generator-mulberry32.js';
import DiceBag from './dice-bag.js';

beforeEach(() => {
  let nextShortID = 1;
  jest.spyOn(shortid, 'generate').mockImplementation(() => 'MOCK-' + nextShortID++);
});

afterEach(() => {
  shortid.generate.mockRestore();
});

test('default parser and rng', () => {
  // Make sure the default parser works and uses Math.random
  const diceBag = new DiceBag();
  try {
    for (let i = 0; i < 12; i++) {
      jest.spyOn(Math, 'random').mockReturnValue(i / 12);
      expect(diceBag.rollValue('1d6')).toEqual(Math.ceil((i + 1) / 2));
      expect(diceBag.rollValue('1d12')).toEqual(i + 1);
    }
  } finally {
    Math.random.mockRestore();
  }
  expect(diceBag.rollValue('125/25*3+16/8-33/11+10/5')).toEqual(16);
});

test('invalid arguments', () => {
  // prettier-ignore
  const invalidRNGOrParserMessage = 'DiceBag accepts only a random number generator with a d function, or a parser with a parse function';
  expect(() => new DiceBag('pastry')).toThrowError(invalidRNGOrParserMessage);
  expect(() => new DiceBag({})).toThrowError(invalidRNGOrParserMessage);
  expect(() => new DiceBag({ d: 5 })).toThrowError(invalidRNGOrParserMessage);
  expect(() => new DiceBag({ parse: '17' })).toThrowError(invalidRNGOrParserMessage);
});

test('custom rng', () => {
  const dValues = [1, 2, 3, 4, 5, 6, 1, 20];
  const mockD = jest.fn(() => dValues.shift());
  const rng = {
    d: mockD,
  };
  const diceBag = new DiceBag(rng);
  expect(mockD.mock.calls.length).toEqual(0);
  expect(diceBag.rollValue('6d6kl2')).toEqual(3);
  expect(mockD.mock.calls.length).toEqual(6);
  expect(mockD.mock.calls[0][0]).toEqual(6);
  expect(mockD.mock.calls[1][0]).toEqual(6);
  expect(mockD.mock.calls[2][0]).toEqual(6);
  expect(mockD.mock.calls[3][0]).toEqual(6);
  expect(mockD.mock.calls[4][0]).toEqual(6);
  expect(mockD.mock.calls[5][0]).toEqual(6);
  mockD.mockClear();

  expect(diceBag.rollValue('125/25*3+16/8-33/11+10/5')).toEqual(16);
  expect(mockD.mock.calls.length).toEqual(0);
  expect(diceBag.rollValue('1d20')).toEqual(1);
  expect(diceBag.rollValue('1d20')).toEqual(20);
  expect(mockD.mock.calls.length).toEqual(2);
  expect(mockD.mock.calls[0][0]).toEqual(20);
  expect(mockD.mock.calls[1][0]).toEqual(20);
  mockD.mockClear();
});

test('custom parser', () => {
  const parseValues = [{ value: 1 }, { value: 8 }];
  const mockParse = jest.fn(() => parseValues.shift());
  const parser = {
    parse: mockParse,
  };
  const diceBag = new DiceBag(parser);
  expect(mockParse.mock.calls.length).toEqual(0);
  expect(diceBag.rollValue('fishsticks')).toEqual(1);
  expect(mockParse.mock.calls.length).toEqual(1);
  expect(mockParse.mock.calls[0][0]).toEqual('fishsticks');
  mockParse.mockClear();

  expect(diceBag.rollValue('2d20kl1')).toEqual(8);
  expect(mockParse.mock.calls.length).toEqual(1);
  expect(mockParse.mock.calls[0][0]).toEqual('2d20kl1');
  mockParse.mockClear();
});

test('rollValue', () => {
  const rng = new RNGMulberry32(0);
  const diceBag = new DiceBag(rng);
  [1, 2, 4].forEach((count) => {
    [6, 10, 20].forEach((sides) => {
      for (let i = 0; i < 5; i++) {
        const dn = count + 'd' + sides;
        expect(diceBag.rollValue(dn)).toMatchSnapshot(dn);
      }
    });
  });
});

test('r', () => {
  const rng = new RNGMulberry32(0);
  const diceBag = new DiceBag(rng);
  [1, 2, 4].forEach((count) => {
    [6, 10, 20].forEach((sides) => {
      for (let i = 0; i < 5; i++) {
        const dn = count + 'd' + sides;
        expect(diceBag.rollValue(dn)).toMatchSnapshot(dn);
      }
    });
  });
});

test('roll', () => {
  const rng = new RNGMulberry32(0);
  const diceBag = new DiceBag(rng);
  [1, 2, 4].forEach((count) => {
    [6, 10, 20].forEach((sides) => {
      for (let i = 0; i < 5; i++) {
        const dn = count + 'd' + sides;
        expect(diceBag.rollValue(dn)).toMatchSnapshot(dn);
      }
    });
  });
});
