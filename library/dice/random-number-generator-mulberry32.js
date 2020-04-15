/* SPDX-License-Identifier: MIT */

/*
 * This is a simple, seedable Random Number Generator.
 *
 * WARNING: DO NOT USE FOR SECURITY. Since this is predictable, it is NOT secure.
 * This is for use in situations where being able to perfectly reproduce a random result is important.
 *
 * Algorithm source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md_PRIVATE_mulberry32
 */

import RandomNumberGenerator from './random-number-generator.js';

/**
 * The actual Random Number Generator - mulberry32
 * Original mulberry32 c code: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * Javascript conversion source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md_PRIVATE_mulberry32
 * This function (mulberry32) is available in the Public Domain.
 */
function mulberry32(a) {
  a |= 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toMulberry32Seed(seed) {
  if (Number.isInteger(seed)) {
    return seed;
  } else if (typeof seed === 'undefined' || seed === null) {
    return Math.trunc(Math.random() * 4294967296);
  } else {
    throw new Error('Seed is expected to be an integer value');
  }
}

export default class RNGMulberry32 extends RandomNumberGenerator {
  constructor(optSeed) {
    super(mulberry32(toMulberry32Seed(optSeed)));
  }
}
