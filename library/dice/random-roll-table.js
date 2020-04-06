/* SPDX-License-Identifier: MIT */

/**
 * A single entry in a RandomRollTable
 */
class Entry {
  _PRIVATE_weight;
  _PRIVATE_value;
  constructor(weight, value) {
    this._PRIVATE_weight = weight;
    this._PRIVATE_value = value;
    Object.freeze(this);
  }
  get weight() {
    return this._PRIVATE_weight;
  }
  get value() {
    return this._PRIVATE_value;
  }
}

/**
 * A table of weighted options that can be randomly selected from.
 */
export default class RandomRollTable {
  _PRIVATE_name;
  _PRIVATE_totalWeight = 0;
  _PRIVATE_options = [];
  constructor(name) {
    this._PRIVATE_name = name;
  }

  get name() {
    return this._PRIVATE_name;
  }

  get totalWeight() {
    return this._PRIVATE_totalWeight;
  }

  get options() {
    const sealedOptions = [...this._PRIVATE_options];
    return sealedOptions;
  }

  addOption(value, opt_weight) {
    let weight;
    if (typeof opt_weight === 'undefined') {
      weight = 1;
    } else if (Number.isInteger(opt_weight)) {
      weight = opt_weight;
    } else {
      throw new Error('weight must be an integer');
    }
    this._PRIVATE_totalWeight = this._PRIVATE_totalWeight + weight;
    console.log(this._PRIVATE_totalWeight);
    this._PRIVATE_options.push(new Entry(weight, value));
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
    const rolledWeight = typeof dice === 'number' ? dice : dice.d(this._PRIVATE_totalWeight);
    let remainingWeight = rolledWeight;
    let result = null;
    this._PRIVATE_options.some((option) => {
      if (remainingWeight <= option.weight) {
        result = option.value;
        return true;
      }
      remainingWeight -= option.weight;
      return false;
    });
    return {
      diceSides: this._PRIVATE_totalWeight,
      diceValue: rolledWeight,
      tableResult: result,
    };
  }
}
