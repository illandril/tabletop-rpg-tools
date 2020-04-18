/* SPDX-License-Identifier: MIT */

import React from 'react';
import clsx from 'clsx';

import ExplosionIcon from '@material-ui/icons/Flare';

import Dice from './dice.js';

import styles from './explode-dice.module.scss';

const EXPLODED_FIRST = false;

export default function ExplodeDice({ explosion }) {
  function extraProvider(value) {
    if (explosion.isExploded(value)) {
      return (
        <div className={styles.exploded}>
          <ExplosionIcon />
        </div>
      );
    }
  }
  return (
    <div className={clsx(styles.explode)}>
      {(EXPLODED_FIRST && (
        <>
          <div className={styles.original}>
            <Dice
              sides={explosion.sides}
              values={explosion.originalValues}
              extraProvider={extraProvider}
            />
          </div>
          <div className={styles.extra}>
            <Dice
              sides={explosion.sides}
              values={explosion.extraValues}
              extraProvider={extraProvider}
            />
          </div>
        </>
      )) || (
        <div className={styles.values}>
          <Dice sides={explosion.sides} values={explosion.values} extraProvider={extraProvider} />
        </div>
      )}
    </div>
  );
}
