/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import DroppedIcon from '@material-ui/icons/Clear';

import Types from './types.js';
import Dice from './dice.js';

const useStyles = makeStyles({
  dropped: {
    color: 'rgb(100, 0, 0)',
  },
  droppedIcon: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
    color: 'rgba(255, 0, 0, 0.25)',
  },
});

// @flow
function affixes(keepRule: number) {
  let prefix;
  let postfix;
  switch (keepRule) {
    case 'highest':
      prefix = '⌈';
      postfix = '⌉';
      break;
    case 'lowest':
      prefix = '⌊';
      postfix = '⌋';
      break;
    default:
      prefix = '[';
      postfix = ']';
      break;
  }
  return [prefix, postfix];
}

export default function KeepSomeDice({ sides, keepRule, kept, dropped }) {
  const classes = useStyles();

  const droppedFirst = keepRule === 'highest';
  const [prefix, postfix] = affixes(keepRule);

  const keptElem = (
    <div>
      <Dice sides={sides} values={kept} />
    </div>
  );

  function extraProvider() {
    return <DroppedIcon className={classes.droppedIcon} />;
  }

  return (
    <div>
      <div>{prefix}</div>
      {!droppedFirst && keptElem}
      <div className={classes.dropped}>
        <Dice sides={sides} values={dropped} extraProvider={extraProvider} />
      </div>
      {droppedFirst && keptElem}
      <div>{postfix}</div>
    </div>
  );
}

KeepSomeDice.propTypes = {
  keepRule: PropTypes.string.isRequired,
  sides: Types.DiceSides,
  kept: Types.DiceValues,
  dropped: Types.DiceValues,
};
