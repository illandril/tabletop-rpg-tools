/* SPDX-License-Identifier: MIT */

import ObjectWithAutoID from '../../utils/object-with-auto-id.js';

const modifiers = new Map([
  [
    '+',
    function add(l, r) {
      return l + r;
    },
  ],
  [
    '-',
    function subtract(l, r) {
      return l - r;
    },
  ],
  [
    '*',
    function multiply(l, r) {
      return l * r;
    },
  ],
  [
    '/',
    function divide(l, r) {
      return l / r;
    },
  ],
  [
    '%',
    function mod(l, r) {
      return l % r;
    },
  ],
  [
    '^',
    function pow(l, r) {
      return Math.pow(l, r);
    },
  ],
]);

export default class Combiner extends ObjectWithAutoID {
  _PRIVATE_values;
  _PRIVATE_modifier;
  _PRIVATE_value;
  constructor(left, modifier, right) {
    super();
    this._PRIVATE_values = Object.freeze([left, right]);
    this._PRIVATE_modifier = modifier;
    const modify = modifiers.get(modifier);
    if (modify === null) {
      throw Error('Unknown modifier: ' + modifier);
    }
    this._PRIVATE_value = modify(left.value, right.value);
  }

  get left() {
    return this._PRIVATE_values[0];
  }

  get right() {
    return this._PRIVATE_values[1];
  }

  get modifier() {
    return this._PRIVATE_modifier;
  }

  get value() {
    return this._PRIVATE_value;
  }

  get values() {
    return this._PRIVATE_values;
  }

  toString() {
    return '(' + this.left + this.modifier + this.right + ')=' + this.value;
  }
}
