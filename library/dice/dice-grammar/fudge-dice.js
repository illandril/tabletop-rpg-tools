/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID, TypeCheck } from '../../utils';

export default class FudgeDice extends ObjectWithAutoID {
  _PRIVATE_count;
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(rng, count) {
    super();
    TypeCheck.integer('count', count);
    this._PRIVATE_count = count;
    const values = [];
    let total = 0;
    for (let i = 0; i < count; i++) {
      const roll = rng.d(3) - 2;
      total += roll;
      if (roll < 0) {
        values.push('-');
      } else if (roll > 0) {
        values.push('+');
      } else {
        values.push('=');
      }
    }
    this._PRIVATE_values = Object.freeze(values);
    this._PRIVATE_value = total;
    Object.freeze(this);
  }

  get count() {
    return this._PRIVATE_count;
  }

  get sides() {
    return 'F';
  }

  get values() {
    return this._PRIVATE_values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return this.value + '{' + this.count + 'dF: ' + this.values + '}';
  }
}
