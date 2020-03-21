/* SPDX-License-Identifier: MIT */

/*
 * This is a simple, seedable Random Number Generator.
 *
 * WARNING: DO NOT USE FOR SECURITY. Since this is predictable, it is NOT secure.
 * This is for use in situations where being able to perfectly reproduce a random result is important.
 *
 * Algorithm source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
 */

/**
 * The actual Random Number Generator - mulberry32
 * Original mulberry32 c code: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * Javascript conversion source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
 * This function (mulberry32) is available in the Public Domain.
 */
function mulberry32(a) {
  return function() {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function withMinMax(min, max, randomFunction) {
  if (!Number.isInteger(min)) {
    throw 'min and max must be integers';
  }
  if (typeof max === 'undefined') {
    return withMinMax(0, min, randomFunction);
  }
  if (!Number.isInteger(max)) {
    throw 'min and max must be integers';
  }
  if (min > max) {
    throw 'min must be less than or equal to max';
  }
  return randomFunction(min, max);
}

function randomToInt(value, min, max) {
  return withMinMax(min, max, (min, max) => {
    return Math.trunc(value * (max - min)) + min;
  });
}

const TWO_PI = 2 * Math.PI;
let resamples = 0;

class RandomNumberGenerator {
  #seed;
  #next;
  constructor(seed) {
    this.#seed = Number.isInteger(seed) ? seed : Math.floor(Math.random() * 4294967296);
    this.#next = mulberry32(this.#seed);
    Object.freeze(this);
  }

  get seed() { return this.#seed; }

  /**
   * Generates a random int from min (inclusive) to max (exclusive)
   */
  int(min, max) {
    return randomToInt(this.#next(), min, max);
  }

  /**
   * Rolls a dice with the specified number of sides
   */
  d(sides) {
    return sides > 0 ? this.int(1, sides) : 0;
  }

  nextNonZero() {
    let value;
    do {
      value = this.#next();
    } while (value === 0);
    return value;
  }

  /**
   * Generates a random int from min (inclusive) to max (exclusive) with an approximately
   * normal distribution (counting only the middle ~99% of results and re-rolling the outliers)
   */
  normalInt(min, max) {
    // Using Box-Muller, find a normally distributed random number,
    // with a mean of 0 and a standard deviation of 1
    const u1 = this.nextNonZero();
    const u2 = this.nextNonZero();
    const r = Math.sqrt(-2 * Math.log(u1));
    const theta = TWO_PI * u2;
    const z0 = r * Math.cos(theta);

    // Adjust the value to fit between 0 and 1
    // Approximately 95.4% of z0's will be within 2 standard deviation of 0 (z0/4 + 0.5)
    // Approximately 98.8% of z0's will be within 2.5 standard deviation of 0 (z0/5 + 0.5)
    // Approximately 99.7% of z0's will be within 3 standard deviation of 0 (z0/6 + 0.5)
    // We want min and max-1 to still occur with reasonable frequency, so we use the middle
    // 98.8% of the results only, and re-roll anything outside that range.
    const scaledZ0 = z0 / 5 + 0.5;
    if (scaledZ0 < 0 || scaledZ0 >= 1) {
      // If the value was in the far edges of the normal distribution, find a new value
      return this.normalInt(min, max);
    }
    // Scale the value up to the min-max range
    return randomToInt(scaledZ0, min, max);
  }

  /**
   * Has an (odds * 100)% chance of returning true.
   */
  chance(odds) {
    return odds >= 1 || odds > 0 && this.#next() < odds;
  }

  /**
   * Randomly shuffles a shallow copy of an array
   */
  shuffle(arr) {
    const ret = arr.slice();
    this.shuffleInPlace(ret);
    return ret;
  }

  /**
   * Randomly shuffles an array
   */
  shuffleInPlace(arr) {
    if (!arr || arr.length <= 0) {
      return;
    }
    // Knuth-Fisher-Yates shuffle algorithm
    let i = arr.length;
    while (--i) {
      const j = Math.trunc(this.#next() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  get resamples() {
    return resamples;
  }
}

export { RandomNumberGenerator };
