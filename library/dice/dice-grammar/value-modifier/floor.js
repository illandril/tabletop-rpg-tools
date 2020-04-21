/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID } from '../../../utils';

export default class Floor extends ObjectWithAutoID {
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(input) {
    super();
    this._PRIVATE_values = Object.freeze([input]);
    this._PRIVATE_value = Math.floor(input.value);
    Object.freeze(this);
  }

  get values() {
    return this._PRIVATE_values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return this.value + '{floor(' + this.values + ')}';
  }
}
