/* SPDX-License-Identifier: MIT */

import ObjectWithAutoID from '../../utils/object-with-auto-id.js';

export default class Dice extends ObjectWithAutoID {
  _PRIVATE_rng;
  _PRIVATE_count;
  _PRIVATE_sides;
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(rng, count, sides) {
    super();
    if (!Number.isInteger(count)) {
      throw Error('count must be an integer');
    }
    if (count < 1) {
      throw Error('sides must be greater than 0');
    }
    if (!Number.isInteger(sides)) {
      throw Error('sides must be an integer');
    }
    if (sides < 2) {
      throw Error('sides must be greater than 1');
    }
    this._PRIVATE_rng = rng;
    this._PRIVATE_count = count;
    this._PRIVATE_sides = sides;
    const values = [];
    let total = 0;
    for (let i = 0; i < count; i++) {
      const roll = rng.d(sides);
      total += roll;
      values.push(roll);
    }
    this._PRIVATE_values = Object.freeze(values);
    this._PRIVATE_value = total;
    Object.freeze(this);
  }

  get count() {
    return this._PRIVATE_count;
  }

  get sides() {
    return this._PRIVATE_sides;
  }

  get values() {
    return this._PRIVATE_values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  rollAgain() {
    return this._PRIVATE_rng.d(this.sides);
  }

  toString() {
    return this.value + '{' + this.count + 'd' + this.sides + ': ' + this.values + '}';
  }
}
