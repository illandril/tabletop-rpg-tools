/* SPDX-License-Identifier: MIT */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExplosionIcon from '@material-ui/icons/Flare';

import Types from './types.js';
import Dice from './dice.js';

const EXPLODED_FIRST = false;

const useStyles = makeStyles({
  explodeIcon: {
    position: 'absolute',
    left: '10%',
    top: '10%',
    height: '80%',
    width: '80%',
    color: 'rgba(255, 125, 0, 0.33)',
    zIndex: -1,
  },
});

export default function ExplodeDice({ explosion }) {
  const classes = useStyles();

  function extraProvider(value) {
    if (explosion.isExploded(value)) {
      return <ExplosionIcon className={classes.explodeIcon} />;
    }
  }
  return (
    <span>
      {(EXPLODED_FIRST && (
        <>
          <Dice
            sides={explosion.sides}
            values={explosion.originalValues}
            extraProvider={extraProvider}
          />
          <Dice
            sides={explosion.sides}
            values={explosion.extraValues}
            extraProvider={extraProvider}
          />
        </>
      )) || (
        <Dice sides={explosion.sides} values={explosion.values} extraProvider={extraProvider} />
      )}
    </span>
  );
}

ExplodeDice.propTypes = {
  explosion: Types.ExplodedDice,
};
