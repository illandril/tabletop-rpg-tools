/* SPDX-License-Identifier: MIT */

import React from 'react';

import TextField from '@material-ui/core/TextField';

import InputRow from './input-row.js';

const TEXT_FIELD_VARIANT = 'standard';
const TEXT_FIELD_SIZE = 'small';

export default ({ id, label, type, value, setValue, InputProps }) => {
  return (
    <InputRow className="dungeon-textRow">
      <TextField
        id={id}
        variant={TEXT_FIELD_VARIANT}
        size={TEXT_FIELD_SIZE}
        label={label}
        type={type}
        value={value}
        onInput={(event) => setValue(event.target.value)}
        InputProps={InputProps}
      />
    </InputRow>
  );
};
