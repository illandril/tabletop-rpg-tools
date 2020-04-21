/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID, TypeCheck } from '../../utils';

export default class Dice extends ObjectWithAutoID {
  _PRIVATE_rng;
  _PRIVATE_count;
  _PRIVATE_sides;
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(rng, count, sides) {
    super();
    TypeCheck.integerNotBelow('count', 1, count);
    TypeCheck.integerNotBelow('sides', 2, sides);
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
