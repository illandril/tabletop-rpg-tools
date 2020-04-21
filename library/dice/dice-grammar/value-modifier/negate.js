/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID } from '../../../utils';

export default class Negate extends ObjectWithAutoID {
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(input) {
    super();
    this._PRIVATE_values = Object.freeze([input]);
    this._PRIVATE_value = -1 * input.value;
    Object.freeze(this);
  }

  get values() {
    return this._PRIVATE_values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  get modifier() {
    return '-';
  }

  get right() {
    return this._PRIVATE_values[0];
  }

  toString() {
    return this.value + '{-(' + this.values + ')}';
  }
}
