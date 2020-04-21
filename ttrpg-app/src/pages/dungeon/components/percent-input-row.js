/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import SliderInputRow from './slider-input-row.js';

export default function PercentInputRow({ id, label, value, setValue }) {
  return (
    <SliderInputRow
      id={id}
      label={label}
      value={value}
      setValue={setValue}
      min={0}
      max={100}
      step={1}
      valueSuffix="%"
    />
  );
}

PercentInputRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};
