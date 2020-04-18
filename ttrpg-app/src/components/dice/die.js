/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import styles from './die.module.scss';

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
  const BGC = BG.get(sides) || DX;
  const classes = [styles.die, styles['d' + sides]];
  if (BGC === DX) {
    classes.push(styles.unknownSides);
  }

  return (
    <div className={clsx(classes)} data-sides={sides}>
      <BGC className={styles.bg} />
      <div className={styles.val}>{value}</div>
      {extraProvider && extraProvider(value)}
    </div>
  );
}
