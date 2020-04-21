/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Roll from './roll.js';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    fontSize: '1.75em',
    '& div': {
      display: 'inline-block',
    },
  },
  equals: {
    padding: '0 0.25em',
  },
  value: {
    fontWeight: 'bold',
  },
}));

export default function RollWithValue({ rollResult }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span className={classes.roll}>
        <Roll rollResult={rollResult} />
      </span>
      <span className={classes.equals}>=</span>
      <span className={classes.value}>{rollResult.value}</span>
    </div>
  );
}

RollWithValue.propTypes = {
  rollResult: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
};
