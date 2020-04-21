/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import InputRow from './input-row.js';

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
});

export default function SelectRow({ id, label, options, value, setValue }) {
  const classes = useStyles();
  return (
    <InputRow>
      <TextField
        select
        id={id}
        label={label}
        value={value}
        className={classes.input}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </InputRow>
  );
}

SelectRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setValue: PropTypes.func.isRequired,
};
