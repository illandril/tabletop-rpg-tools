/* SPDX-License-Identifier: MIT */

import ObjectWithAutoID from '../../../utils/object-with-auto-id.js';

export default class Round extends ObjectWithAutoID {
  _PRIVATE_values;
  _PRIVATE_value;
  constructor(input) {
    super();
    this._PRIVATE_values = Object.freeze([input]);
    this._PRIVATE_value = Math.round(input.value);
    Object.freeze(this);
  }

  get values() {
    return this._PRIVATE_values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return this.value + '{round(' + this.values + ')}';
  }
}
