/* SPDX-License-Identifier: MIT */

import shortid from 'shortid';

import RNGMulberry32 from '../random-number-generator-mulberry32.js';
import Parser from './parser.js';
import Constant from './constant.js';

const COMMON_DICE_SIDES = [2, 4, 6, 8, 10, 12, 20, 100];
const COMMON_DICE_COUNTS = ['', 1, 2, 3, 4, 5, 6, 8];

beforeEach(() => {
  let nextShortID = 1;
  jest.spyOn(shortid, 'generate').mockImplementation(() => 'MOCK-' + nextShortID++);
});

afterEach(() => {
  shortid.generate.mockRestore();
});

test.todo('No exploding or keep high/low/etc for symbolic dice');
test.todo('Color dice?');
test.todo('Heads/Tails Coins?');
test.todo('Other symbolic dice?');
test.todo('Rerolling dice?');

test('NdX', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  COMMON_DICE_COUNTS.forEach((count) => {
    COMMON_DICE_SIDES.forEach((sides) => {
      for (let i = 0; i < 5; i++) {
        const dn = count + 'd' + sides;
        expect(parser.parse(dn)).toMatchSnapshot(dn);
      }
    });
  });
});

test('Nd%', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  COMMON_DICE_COUNTS.forEach((count) => {
    for (let i = 0; i < 5; i++) {
      const dn = count + 'd%';
      expect(parser.parse(dn)).toMatchSnapshot(dn);
    }
  });
});

test('NdF', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  COMMON_DICE_COUNTS.forEach((count) => {
    for (let i = 0; i < 5; i++) {
      const dn = count + 'dF';
      expect(parser.parse(dn)).toMatchSnapshot(dn);
    }
  });
});

test('constants', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  for (let i = 0; i < 1000; i++) {
    const value = parser.parse('' + i);
    expect(value instanceof Constant).toEqual(true);
    expect(value.value).toEqual(i);
    expect(value.id).toEqual(expect.any(String));
  }
});

test('case sensitivity', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  const inputs = [
    // Standard dice
    '1d20',
    '1D20',

    // Dice Modifiers
    '2d20kl1',
    '2d20kL1',
    '2d20Kl1',
    '2D20KL1',
    '2d20kh1',
    '2d20kH1',
    '2d20Kh1',
    '2D20KH1',
    '2d20k1',
    '2D20K1',
    '2d20dl1',
    '2d20dL1',
    '2d20Dl1',
    '2D20DL1',
    '2d20dh1',
    '2d20dH1',
    '2d20Dh1',
    '2D20DH1',

    // Fudge Dice
    '1df',
    '1dF',
    '1Df',
    '1DF',
  ];
  inputs.forEach((input) => {
    expect(parser.parse(input)).toMatchSnapshot(input);
  });
});

test('whitespace', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('  (  floor(   1 /  2   ) + 7-2 *(  3) )   ')).toHaveProperty('value', 1);
});

test('floor', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('floor(1/2)')).toHaveProperty('value', 0);
  expect(parser.parse('floor(2/2)')).toHaveProperty('value', 1);
  expect(parser.parse('floor(3/2)')).toHaveProperty('value', 1);
  expect(parser.parse('floor(4/2)')).toHaveProperty('value', 2);

  expect(parser.parse('floor(1/4)')).toHaveProperty('value', 0);
  expect(parser.parse('floor(2/4)')).toHaveProperty('value', 0);
  expect(parser.parse('floor(3/4)')).toHaveProperty('value', 0);
  expect(parser.parse('floor(4/4)')).toHaveProperty('value', 1);
});

test('ceil', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('ceil(1/2)')).toHaveProperty('value', 1);
  expect(parser.parse('ceil(2/2)')).toHaveProperty('value', 1);
  expect(parser.parse('ceil(3/2)')).toHaveProperty('value', 2);
  expect(parser.parse('ceil(4/2)')).toHaveProperty('value', 2);

  expect(parser.parse('ceil(1/4)')).toHaveProperty('value', 1);
  expect(parser.parse('ceil(2/4)')).toHaveProperty('value', 1);
  expect(parser.parse('ceil(3/4)')).toHaveProperty('value', 1);
  expect(parser.parse('ceil(4/4)')).toHaveProperty('value', 1);
});

test('round', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('round(1/2)')).toHaveProperty('value', 1);
  expect(parser.parse('round(2/2)')).toHaveProperty('value', 1);
  expect(parser.parse('round(3/2)')).toHaveProperty('value', 2);
  expect(parser.parse('round(4/2)')).toHaveProperty('value', 2);

  expect(parser.parse('round(1/4)')).toHaveProperty('value', 0);
  expect(parser.parse('round(2/4)')).toHaveProperty('value', 1);
  expect(parser.parse('round(3/4)')).toHaveProperty('value', 1);
  expect(parser.parse('round(4/4)')).toHaveProperty('value', 1);
});

test('addition', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('3+3')).toHaveProperty('value', 6);
  expect(parser.parse('3 +3')).toHaveProperty('value', 6);
  expect(parser.parse('3 + 3')).toHaveProperty('value', 6);
  expect(parser.parse('3+ 3')).toHaveProperty('value', 6);
  expect(parser.parse('3+7')).toHaveProperty('value', 10);
  expect(parser.parse('7+3')).toHaveProperty('value', 10);
  expect(parser.parse('123+456')).toHaveProperty('value', 579);
});

test('subtraction', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  ['-', '–', '—'].forEach((symbol) => {
    expect(parser.parse('3' + symbol + '3')).toHaveProperty('value', 0);
    expect(parser.parse('3 ' + symbol + '3')).toHaveProperty('value', 0);
    expect(parser.parse('3 ' + symbol + ' 3')).toHaveProperty('value', 0);
    expect(parser.parse('3' + symbol + ' 3')).toHaveProperty('value', 0);
    expect(parser.parse('3' + symbol + '7')).toHaveProperty('value', -4);
    expect(parser.parse('7' + symbol + '3')).toHaveProperty('value', 4);
    expect(parser.parse('123' + symbol + '456')).toHaveProperty('value', -333);
  });
});

test('multiplication', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  ['*', 'x', '×'].forEach((symbol) => {
    expect(parser.parse('3' + symbol + '3')).toHaveProperty('value', 9);
    expect(parser.parse('3 ' + symbol + '3')).toHaveProperty('value', 9);
    expect(parser.parse('3 ' + symbol + ' 3')).toHaveProperty('value', 9);
    expect(parser.parse('3' + symbol + ' 3')).toHaveProperty('value', 9);
    expect(parser.parse('3' + symbol + '7')).toHaveProperty('value', 21);
    expect(parser.parse('7' + symbol + '3')).toHaveProperty('value', 21);
    expect(parser.parse('123' + symbol + '456')).toHaveProperty('value', 56088);
  });
});

test('division', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  ['/', '÷'].forEach((symbol) => {
    expect(parser.parse('3' + symbol + '3')).toHaveProperty('value', 1);
    expect(parser.parse('3 ' + symbol + '3')).toHaveProperty('value', 1);
    expect(parser.parse('3 ' + symbol + ' 3')).toHaveProperty('value', 1);
    expect(parser.parse('3' + symbol + ' 3')).toHaveProperty('value', 1);
    expect(parser.parse('21' + symbol + '7')).toHaveProperty('value', 3);
    expect(parser.parse('21' + symbol + '3')).toHaveProperty('value', 7);
    expect(parser.parse('300' + symbol + '25')).toHaveProperty('value', 12);
    expect(parser.parse('1' + symbol + '4')).toHaveProperty('value', 0.25);
    expect(parser.parse('4' + symbol + '1')).toHaveProperty('value', 4);
  });
});

test('power', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  ['^', '**'].forEach((symbol) => {
    expect(parser.parse('3' + symbol + '3')).toHaveProperty('value', 27);
    expect(parser.parse('3 ' + symbol + '3')).toHaveProperty('value', 27);
    expect(parser.parse('3 ' + symbol + ' 3')).toHaveProperty('value', 27);
    expect(parser.parse('3' + symbol + ' 3')).toHaveProperty('value', 27);
    expect(parser.parse('3' + symbol + '7')).toHaveProperty('value', 2187);
    expect(parser.parse('7' + symbol + '3')).toHaveProperty('value', 343);
  });
});

test('modulus', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('3%3')).toHaveProperty('value', 0);
  expect(parser.parse('3 %3')).toHaveProperty('value', 0);
  expect(parser.parse('3 % 3')).toHaveProperty('value', 0);
  expect(parser.parse('3% 3')).toHaveProperty('value', 0);
  expect(parser.parse('3%7')).toHaveProperty('value', 3);
  expect(parser.parse('7%3')).toHaveProperty('value', 1);
});

test('negation', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('-2')).toHaveProperty('value', -2);
  expect(parser.parse('1+-2')).toHaveProperty('value', -1);
  expect(parser.parse('5*-2')).toHaveProperty('value', -10);
  expect(parser.parse('-2+3')).toHaveProperty('value', 1);
  expect(parser.parse('-(-5+2*-2)')).toHaveProperty('value', 9);

  // I'm not sure if I want this to throw an error or not... it's predictable and "correct" but
  // extremely unlikely that anybody would ever do this intentionally
  expect(parser.parse('--2')).toHaveProperty('value', 2);
});

test('pemdas', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  expect(parser.parse('4*(5+3)')).toHaveProperty('value', 32);
  expect(parser.parse('5*2^2')).toHaveProperty('value', 20);
  expect(parser.parse('2+5*3')).toHaveProperty('value', 17);
  expect(parser.parse('30/5*3')).toHaveProperty('value', 18);
  expect(parser.parse('(1+1 / 2) * 2')).toHaveProperty('value', 3);
  expect(parser.parse('3 + 6 * 2')).toHaveProperty('value', 15);
  expect(parser.parse('(3+6) * 2')).toHaveProperty('value', 18);
  expect(parser.parse('12 / 6 * 3 / 2')).toHaveProperty('value', 3);
  expect(parser.parse('4^3^2')).toHaveProperty('value', 262144);
  expect(parser.parse('7 + (6 * 5 ^ 2 + 3)')).toHaveProperty('value', 160);
  expect(parser.parse('12/3%3')).toHaveProperty('value', 1);
  expect(parser.parse('12/3%3*4+7')).toHaveProperty('value', 11);

  expect(parser.parse('42/14+25*3/15')).toHaveProperty('value', 8);
  expect(parser.parse('30+(-28)/2*3+12/2+6')).toHaveProperty('value', 0);
  expect(parser.parse('125/25*3+16/8-33/11+10/5')).toHaveProperty('value', 16);
  expect(parser.parse('3*(-4+5)+(12*3-6)/5')).toHaveProperty('value', 9);
  expect(parser.parse('30-12/(6-2)+6*2^3')).toHaveProperty('value', 75);
  expect(parser.parse('5+12/(8-3*2)-18/3+6')).toHaveProperty('value', 11);
});

test('dice math', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);

  const inputs = [
    '2d20kl1+5',
    '2d20kh1+5',
    '2d6*2+5',
    '2d6+4d4',
    'd20-d4',
    'd20+d4',
    'd10*d10',
    'floor(2d20/(d2+1))',
  ];
  inputs.forEach((input) => {
    expect(parser.parse(input)).toMatchSnapshot(input);
  });
});

test('graceful errors', () => {
  const rng = new RNGMulberry32(0);
  const parser = new Parser(rng);
  function expectParseError(fn, message, causeMessagePrefix) {
    try {
      fn();
      throw Error('ParseError was not thrown');
    } catch (e) {
      if (e.name !== 'ParseError') {
        throw e;
      }
      expect(e.message).toEqual(message);
      if (causeMessagePrefix) {
        expect(e.cause.message.substring(0, causeMessagePrefix.length)).toEqual(causeMessagePrefix);
      }
    }
  }
  expectParseError(() => parser.parse(null), 'input must be a non-empty string');
  expectParseError(() => parser.parse(5), 'input must be a non-empty string');
  expectParseError(() => parser.parse({}), 'input must be a non-empty string');
  expectParseError(() => parser.parse(''), 'input must be a non-empty string');
  expectParseError(
    () => parser.parse('1e20'),
    'Error parsing input',
    `Syntax error at line 1 col 2:

  1e20
   ^
Unexpected "e".`
  );
  expectParseError(
    () => parser.parse('3d3d3'),
    'Error parsing input',
    `Syntax error at line 1 col 5:

  3d3d3
      ^
Unexpected "3".`
  );
  expectParseError(
    () => parser.parse('3dx'),
    'Error parsing input',
    `Syntax error at line 1 col 3:

  3dx
    ^
Unexpected "x".`
  );
  expectParseError(
    () => parser.parse('x3d'),
    'Error parsing input',
    `Syntax error at line 1 col 1:

  x3d
  ^
Unexpected "x".`
  );
  expectParseError(
    () => parser.parse('1-+2'),
    'Error parsing input',
    `Syntax error at line 1 col 3:

  1-+2
    ^
Unexpected "+".`
  );
});
