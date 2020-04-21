/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID, TypeCheck } from '../../utils';

export default class Constant extends ObjectWithAutoID {
  _PRIVATE_value;
  constructor(value) {
    super();
    TypeCheck.integer('value', value);
    this._PRIVATE_value = value;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return this.value;
  }
}
