/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID, TypeCheck } from '../../../utils';

export default class KeepHighest extends ObjectWithAutoID {
  _PRIVATE_dice;
  _PRIVATE_count;
  _PRIVATE_kept;
  _PRIVATE_dropped;
  _PRIVATE_value;
  constructor(dice, count) {
    super();
    TypeCheck.integerBetween('count', 1, dice.count, count);
    this._PRIVATE_dice = dice;
    this._PRIVATE_count = count;

    const sorted = [...dice.values];
    sorted.sort((a, b) => a - b);

    const split = dice.count - count;
    this._PRIVATE_kept = Object.freeze(sorted.slice(split));
    this._PRIVATE_dropped = Object.freeze(sorted.slice(0, split));
    this._PRIVATE_value = this._PRIVATE_kept.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    Object.freeze(this);
  }

  get keepRule() {
    return 'highest';
  }

  get count() {
    return this._PRIVATE_count;
  }

  get originalCount() {
    return this._PRIVATE_dice.count;
  }

  get sides() {
    return this._PRIVATE_dice.sides;
  }

  get kept() {
    return this._PRIVATE_kept;
  }

  get dropped() {
    return this._PRIVATE_dropped;
  }

  get values() {
    return this.kept;
  }

  get originalValues() {
    return this._PRIVATE_dice.values;
  }

  get value() {
    return this._PRIVATE_value;
  }

  toString() {
    return (
      this.value +
      '{' +
      this.originalCount +
      'd' +
      this.sides +
      'kh' +
      this.count +
      ': k[' +
      this.kept +
      '] d[' +
      this.dropped +
      ']}'
    );
  }
}
