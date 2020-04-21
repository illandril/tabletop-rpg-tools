/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputRow: {
    '& + &': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function InputRow({ children, className }) {
  const classes = useStyles();
  return <div className={clsx(classes.inputRow, className)}>{children}</div>;
}

InputRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
