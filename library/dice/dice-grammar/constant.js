/* SPDX-License-Identifier: MIT */

import ObjectWithAutoID from '../../utils/object-with-auto-id.js';

export default class Constant extends ObjectWithAutoID {
  _PRIVATE_value;
  constructor(value) {
    super();
    if (!Number.isInteger(value)) {
      throw Error('value must be an integer');
    }
    this._PRIVATE_value = value;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return this.value;
  }
}
