/* SPDX-License-Identifier: MIT */

import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import InputRow from './input-row.js';

import './select-row.scss';

export default ({ id, label, options, value, setValue }) => {
  return (
    <InputRow className="dungeon-selectRow">
      <TextField select id={id} label={label} value={value} onChange={(event) => setValue(event.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </InputRow>
  );
};
