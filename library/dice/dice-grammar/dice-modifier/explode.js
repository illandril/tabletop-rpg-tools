/* SPDX-License-Identifier: MIT */

import { ObjectWithAutoID, TypeCheck } from '../../../utils';

function getTriggerValue(dice, triggerType, triggerValue) {
  if (triggerValue === null && triggerType === '=') {
    return dice.sides;
  }
  const min = triggerType == '<' ? 2 : 1;
  const max = triggerType == '>' ? dice.sides - 1 : dice.sides;
  TypeCheck.integerBetween('triggerValue', min, max, triggerValue);
  return triggerValue;
}

function getTriggerFunction(triggerValue, triggerType) {
  switch (triggerType) {
    case '>':
      return (value) => value > triggerValue;
    case '<':
      return (value) => value < triggerValue;
    case '=':
      return (value) => value === triggerValue;
    default:
      throw Error('Unexpected trigger type: ' + triggerType);
  }
}

export default class Explode extends ObjectWithAutoID {
  _PRIVATE_dice;
  _PRIVATE_triggerType;
  _PRIVATE_triggerValue;
  _PRIVATE_extraValues;
  _PRIVATE_value;
  isTriggerValue;
  constructor(dice, triggerType, triggerValue) {
    super();
    TypeCheck.string('triggerType', triggerType);
    this._PRIVATE_dice = dice;
    this._PRIVATE_triggerType = triggerType;
    this._PRIVATE_triggerValue = getTriggerValue(dice, triggerType, triggerValue);
    const triggerFN = getTriggerFunction(this._PRIVATE_triggerValue, this._PRIVATE_triggerType);
    this.isExploded = triggerFN;

    const values = [];
    const extraValues = [];
    let total = 0;
    function evaluate(value) {
      total += value;
      values.push(value);
      if (triggerFN(value)) {
        const explodedValue = dice.rollAgain();
        extraValues.push(explodedValue);
        evaluate(explodedValue);
      }
    }
    dice.values.forEach(evaluate);

    this._PRIVATE_values = Object.freeze(values);
    this._PRIVATE_extraValues = Object.freeze(extraValues);
    this._PRIVATE_value = total;
    Object.freeze(this);
  }

  get count() {
    return this.values.length;
  }

  get originalCount() {
    return this._PRIVATE_dice.count;
  }

  get sides() {
    return this._PRIVATE_dice.sides;
  }

  get values() {
    return this._PRIVATE_values;
  }

  get originalValues() {
    return this._PRIVATE_dice.values;
  }

  get extraValues() {
    return this._PRIVATE_extraValues;
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
      ' explode ' +
      this._PRIVATE_triggerType +
      ' ' +
      this._PRIVATE_triggerValue +
      ': o[' +
      this.originalValues +
      '] e[' +
      this.extraValues +
      ']}'
    );
  }
}
