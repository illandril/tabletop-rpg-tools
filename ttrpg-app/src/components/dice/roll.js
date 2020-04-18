/* SPDX-License-Identifier: MIT */

import React from 'react';
import clsx from 'clsx';

import Combiner from './combiner.js';
import Dice from './dice.js';
import ExplodeDice from './explode-dice.js';
import KeepSomeDice from './keep-some-dice.js';

import styles from './roll.module.scss';

function isNumberOrString(value) {
  const type = typeof value;
  return type === 'number' || type === 'string';
}

export default function Roll({ rollResult }) {
  if (isNumberOrString(rollResult)) {
    return <div className={styles.value}>{rollResult}</div>;
  } else if (Array.isArray(rollResult.kept)) {
    return (
      <KeepSomeDice
        sides={rollResult.sides}
        keepRule={rollResult.keepRule}
        kept={rollResult.kept}
        dropped={rollResult.dropped}
      />
    );
  } else if (typeof rollResult.isExploded === 'function') {
    return <ExplodeDice explosion={rollResult} />;
  } else if (rollResult.modifier && (rollResult.left || rollResult.right)) {
    return (
      <Combiner
        left={rollResult.left && <Roll rollResult={rollResult.left} />}
        modifier={rollResult.modifier}
        right={rollResult.right && <Roll rollResult={rollResult.right} />}
      />
    );
  } else if (Array.isArray(rollResult.values)) {
    if (rollResult.sides) {
      return <Dice sides={rollResult.sides} values={rollResult.values} />;
    } else {
      return (
        <>
          {rollResult.values.map((value) => (
            <Roll key={value.id} rollResult={value} />
          ))}
        </>
      );
    }
  } else if (isNumberOrString(rollResult.value)) {
    return <Roll rollResult={rollResult.value} />;
  } else {
    throw Error('Unexpected rollResult type: ' + JSON.stringify(rollResult));
  }
}
