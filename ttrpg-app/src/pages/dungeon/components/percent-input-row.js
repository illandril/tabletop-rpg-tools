/* SPDX-License-Identifier: MIT */

import React from 'react';

import SliderInputRow from './slider-input-row.js';

export default ({ id, label, value, setValue }) => {
  return (
    <SliderInputRow
      id={id}
      label={label}
      value={value}
      setValue={setValue}
      min={0}
      max={100}
      valueSuffix="%"
    />
  );
};
