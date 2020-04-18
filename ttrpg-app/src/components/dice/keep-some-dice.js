/* SPDX-License-Identifier: MIT */

import React from 'react';
import clsx from 'clsx';

import DroppedIcon from '@material-ui/icons/Clear';

import Dice from './dice.js';

import styles from './keep-some-dice.module.scss';

function extraProvider(value) {
  return <DroppedIcon className={styles.droppedIcon} />;
}

export default function KeepSomeDice({ sides, keepRule, kept, dropped }) {
  const droppedFirst = keepRule === 'highest';
  return (
    <div className={clsx(styles.keptSome, styles['k-' + keepRule])}>
      {!droppedFirst && (
        <div className={styles.kept}>
          <Dice sides={sides} values={kept} />
        </div>
      )}
      <div className={styles.dropped}>
        <Dice sides={sides} values={dropped} extraProvider={extraProvider} />
      </div>
      {droppedFirst && (
        <div className={styles.kept}>
          <Dice sides={sides} values={kept} />
        </div>
      )}
    </div>
  );
}
