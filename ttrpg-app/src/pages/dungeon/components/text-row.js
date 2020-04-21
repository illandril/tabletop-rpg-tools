/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import InputRow from './input-row.js';

const TEXT_FIELD_VARIANT = 'standard';
const TEXT_FIELD_SIZE = 'small';

export default function TextRow({ id, label, type, value, setValue, InputProps }) {
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
}

TextRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setValue: PropTypes.func.isRequired,
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
  }),
};
