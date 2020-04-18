/* SPDX-License-Identifier: MIT */

import React from 'react';
import clsx from 'clsx';

import styles from './combiner.module.scss';

const modToClass = new Map([
  ['+', styles.add],
  ['-', styles.subtract],
  ['*', styles.multiply],
  ['/', styles.divide],
  ['%', styles.modulus],
  ['^', styles.exponent],
]);

function modifierSymbol(modifier) {
  switch (modifier) {
    case '*':
      return '×';
    case '/':
      return '÷';
    case '^':
      return '';
    default:
      return modifier;
  }
}

export default function combiner({ left, modifier, right }) {
  return (
    <div className={clsx(styles.combiner, modToClass.get(modifier))}>
      {left && <div className={styles.left}>{left}</div>}
      <div className={styles.modifier}>{modifierSymbol(modifier)}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
}
