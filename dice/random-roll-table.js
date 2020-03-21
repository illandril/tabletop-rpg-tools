/* SPDX-License-Identifier: MIT */

/**
 * A single entry in a RandomRollTable
 */
class Entry {
  #weight;
  #value;
  constructor(weight, value) {
    this.#weight = weight;
    this.#value = value;
    Object.freeze(this);
  }
  get weight() { return this.#weight; }
  get value() { return this.#value; }
}

/**
 * A table of weighted options that can be randomly selected from.
 */
class RandomRollTable {
  #totalWeight = 0;
  #options = [];

  addOption(value, opt_weight) {
    let weight;
    if (typeof opt_weight === 'undefined') {
      weight = 1;
    } else if (Number.isInteger(opt_weight)) {
      weight = opt_weight;
    } else {
      throw 'weight must be an integer';
    }
    this.#totalWeight += weight;
    this.#options.push(new Entry(weight, value));
  }

  /**
   * Picks an option from the table using the specified dice.
   * The dice can either be a fixed number or an object with a 'd' method that
   * simulates a dice roll when given a number of dice sides.
   */
  roll(dice) {
    return this.rollResult(dice).tableResult;
  }

  /**
   * Picks an option from the table using the specified dice.
   * The dice can either be a fixed number or an object with a 'd' method that
   * simulates a dice roll when given a number of dice sides.
   * Returns diceSides, diceValue, and tableResult.
   */
  rollResult(dice) {
    let rolledWeight = typeof dice === 'number' ? dice : dice.d(this.#totalWeight);
    let result = null;
    this.#options.some(option => {
      if (rolledWeight < option.weight) {
        result = option.value;
        return true;
      }
      rolledWeight -= option.weight;
    });
    return {
      diceSides: this.#totalWeight,
      diceValue: rolledWeight,
      tableResult: result,
    };
  }
}

export { RandomRollTable };
