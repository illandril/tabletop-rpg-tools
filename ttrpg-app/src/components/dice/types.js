/* SPDX-License-Identifier: MIT */

import PropTypes from 'prop-types';

const Constant = PropTypes.shape({
  value: PropTypes.number.isRequired,
});

const SymbolicDiceSides = PropTypes.oneOf(['F']).isRequired;
const SymbolicDiceValue = PropTypes.string.isRequired;
const SymbolicDiceValues = PropTypes.arrayOf(SymbolicDiceValue);
const SymbolicDice = PropTypes.shape({
  sides: SymbolicDiceSides,
  values: SymbolicDiceValues,
});

const NumericDiceSides = PropTypes.number.isRequired;
const NumericDiceValue = PropTypes.number.isRequired;
const NumericDiceValues = PropTypes.arrayOf(NumericDiceValue);
const NumericDice = PropTypes.shape({
  sides: NumericDiceSides,
  values: NumericDiceValues,
});

const Dice = PropTypes.oneOfType([SymbolicDice, NumericDice]).isRequired;
const DiceSides = PropTypes.oneOfType([SymbolicDiceSides, NumericDiceSides]).isRequired;
const DiceValue = PropTypes.oneOfType([SymbolicDiceValue, NumericDiceValue]).isRequired;
const DiceValues = PropTypes.oneOfType([SymbolicDiceValues, NumericDiceValues]).isRequired;

const ExplodedDice = PropTypes.shape({
  sides: NumericDiceSides,
  values: NumericDiceValues,
  originalValues: NumericDiceValues,
  extraValues: NumericDiceValues,
  isExploded: PropTypes.func.isRequired,
}).isRequired;

const KeepSomeDice = PropTypes.shape({
  keepRule: PropTypes.string.isRequired,
  sides: NumericDiceSides,
  kept: NumericDiceValues,
  dropped: NumericDiceValues,
}).isRequired;

const Roll = PropTypes.oneOfType([Constant, Dice, ExplodedDice, KeepSomeDice]).isRequired;

const Rolls = PropTypes.shape({
  values: PropTypes.arrayOf(PropTypes.oneOfType([Roll, PropTypes.array])),
});

export default {
  Dice,
  DiceSides,
  DiceValue,
  DiceValues,
  ExplodedDice,
  Roll,
  Rolls,
};
