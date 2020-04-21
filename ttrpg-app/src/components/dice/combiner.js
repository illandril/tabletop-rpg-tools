/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const PARENS = {
  '&::before': {
    content: `'('`,
  },
  '&::after': {
    content: `')'`,
  },
};

const useStyles = makeStyles({
  combiner: {},
  left: {},
  right: {},
  side: {},
  modifier: {
    padding: '0 0.2em',
  },
  negate: {
    '& > $modifier': {
      paddingRight: 0,
    },
    '& > $right': PARENS,
  },
  addSubtract: {},
  multiplyDivide: {
    '& > $side > $addSubtract': PARENS,
  },
  exponent: {
    '& > $modifier': {
      fontSize: 0,
    },
    '& > $right': {
      verticalAlign: 'super',
      fontSize: '80%',
    },
    '& > $left > $combiner': PARENS,
  },
});

function modifierToClass(left, modifier, classes) {
  switch (modifier) {
    case '-':
      if (!left) {
        return classes.negate;
      }
    // falls through
    case '+':
      return classes.addSubtract;
    case '*': // falls through
    case '/': // falls through
    case '%':
      return classes.multiplyDivide;
    case '^':
      return classes.exponent;
  }
}

function modifierSymbol(modifier) {
  switch (modifier) {
    case '*':
      return '×';
    case '/':
      return '÷';
    default:
      return modifier;
  }
}

export default function Combiner({ left, modifier, right }) {
  const classes = useStyles();
  const combinerClass = modifierToClass(left, modifier, classes);
  return (
    <span className={clsx(classes.combiner, combinerClass)}>
      {left && <span className={clsx(classes.side, classes.left)}>{left}</span>}
      <span className={classes.modifier}>{modifierSymbol(modifier)}</span>
      {right && <span className={clsx(classes.side, classes.right)}>{right}</span>}
    </span>
  );
}

Combiner.propTypes = {
  left: PropTypes.object,
  modifier: PropTypes.string.isRequired,
  right: PropTypes.object.isRequired,
};
