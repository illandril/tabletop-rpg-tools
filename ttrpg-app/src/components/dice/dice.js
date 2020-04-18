/* SPDX-License-Identifier: MIT */

import React from 'react';

import Die from './die.js';

import styles from './dice.module.scss';

export default function Dice({ sides, values, extraProvider }) {
  return (
    <div className={styles.dice}>
      {values.map((value, i) => (
        <Die key={i} sides={sides} value={value} extraProvider={extraProvider} />
      ))}
    </div>
  );
}
