/* SPDX-License-Identifier: MIT */

/*
 * This is a simple class that takes a [0, 1) random number generator, and expands it with common
 * functions to generate numbers in other ranges or otherwise take advantage of the randomness.
 * If no random number generator function is provided, it uses Math.random
 *
 * WARNING: DO NOT USE FOR SECURITY. Math.random is NOT random enough for many security needs.
 * Even if you provide a secure random number generator to this class, security was NOT a
 * consideration when this class was created, so some of the functions provided may take an otherwise
 * secure random number and provide a result that is too predictable for security needs.
 */

function withMinMax(min, max, randomFunction) {
  if (!Number.isInteger(min)) {
    throw new Error('min and max must be integers');
  }
  if (typeof max === 'undefined') {
    return withMinMax(0, min, randomFunction);
  }
  if (!Number.isInteger(max)) {
    throw new Error('min and max must be integers');
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  return randomFunction(min, max);
}

function randomToInt(value, min, max) {
  return withMinMax(min, max, (min, max) => {
    return Math.trunc(value * (max - min)) + min;
  });
}

const TWO_PI = 2 * Math.PI;

export default class RandomNumberGenerator {
  _PRIVATE_next;
  constructor(optRNG) {
    this._PRIVATE_next = optRNG || Math.random;
  }

  /**
   * Generates a random int from min (inclusive) to max (exclusive)
   */
  int(min, max) {
    return randomToInt(this._PRIVATE_next(), min, max);
  }

  /**
   * Rolls a dice with the specified number of sides
   */
  d(sides) {
    return sides > 0 ? this.int(1, sides + 1) : 0;
  }

  nextNonZero() {
    let value;
    do {
      value = this._PRIVATE_next();
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
    return odds >= 1 || (odds > 0 && this._PRIVATE_next() < odds);
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
      const j = Math.trunc(this._PRIVATE_next() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
