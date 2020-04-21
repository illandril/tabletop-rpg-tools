/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import Types from './types.js';

import D2 from './images/d2.svg';
import D4 from './images/d4.svg';
import D6 from './images/d6.svg';
import D8 from './images/d8.svg';
import D10 from './images/d10.svg';
import D12 from './images/d12.svg';
import D20 from './images/d20.svg';
import D100 from './images/d100.svg';
import DF from './images/dF.svg';
import DX from './images/dX.svg';

const DIE_HEIGHT = 2.4;
const useStyles = makeStyles({
  die: {
    backgroundPosition: 'top left',
    backgroundSize: 'contain',
    width: DIE_HEIGHT + 'em',
    height: DIE_HEIGHT + 'em',
    lineHeight: DIE_HEIGHT + 'em',
    verticalAlign: '-' + (DIE_HEIGHT - 1) / 2 + 'em',
    textAlign: 'center',
    position: 'relative',
    fontSize: '0.75em',
    fontWeight: 'bold',
    display: 'inline-block',
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  d100Value: {
    paddingRight: '0.3em',
  },
  sidesCount: {
    top: '0.2em',
    left: 'auto',
    right: '0.2em',
    width: '1.8em',
    height: '1.3em',
    lineHeight: '1.3em',
    fontSize: '0.5em',
    userSelect: 'none',
  },
});

const BG = new Map([
  [2, D2],
  [4, D4],
  [6, D6],
  [8, D8],
  [10, D10],
  [12, D12],
  [20, D20],
  [100, D100],
  ['F', DF],
]);

export default function Die({ sides, value, extraProvider }) {
  const classes = useStyles();

  const BGC = BG.get(sides) || DX;
  const valueClass = sides === 100 ? classes.d100Value : null;
  const sidesCount = BGC === DX ? <span className={classes.sidesCount}>{sides}</span> : null;

  return (
    <span className={clsx(classes.die)}>
      <BGC />
      <span className={valueClass}>{value}</span>
      {sidesCount}
      <span>{extraProvider && extraProvider(value)}</span>
    </span>
  );
}

Die.propTypes = {
  sides: Types.DiceSides,
  value: Types.DiceValue,
  extraProvider: PropTypes.func,
};
