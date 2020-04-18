/* SPDX-License-Identifier: MIT */

import React from 'react';
import clsx from 'clsx';

import Roll from './roll.js';

import styles from './roll-with-value.module.scss';

export default function RollWithValue({ rollResult }) {
  return (
    <div className={styles.container}>
      <div className={styles.roll}>
        <Roll rollResult={rollResult} />
      </div>
      <div className={styles.value}>{rollResult.value}</div>
    </div>
  );
}
