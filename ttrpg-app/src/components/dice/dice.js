/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import Types from './types.js';
import Die from './die.js';

export default function Dice({ sides, values, extraProvider }) {
  return (
    <>
      {values.map((value, i) => (
        <Die key={i} sides={sides} value={value} extraProvider={extraProvider} />
      ))}
    </>
  );
}

Dice.propTypes = {
  sides: Types.DiceSides,
  values: Types.DiceValues,
  extraProvider: PropTypes.func,
};
