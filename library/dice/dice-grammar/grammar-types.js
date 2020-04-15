/* SPDX-License-Identifier: MIT */

function Combiner(left, modifier, right) {
  return {
    type: 'Combiner',
    left: left,
    modifier: modifier,
    right: right,
  };
}

function Constant(value) {
  return {
    type: 'Constant',
    value: value,
  };
}

function Dice(n, x) {
  return {
    type: 'Dice',
    n: n,
    x: x,
  };
}

function DiceModifier(modifierType, dice, ...args) {
  return {
    type: 'DiceModifier',
    modifierType: modifierType,
    dice: dice,
    args: args,
  };
}

function ValueModifier(modifierType, value) {
  return {
    type: 'ValueModifier',
    modifierType: modifierType,
    value: value,
  };
}

export { Combiner, Constant, Dice, DiceModifier, ValueModifier };
