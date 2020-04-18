/* SPDX-License-Identifier: MIT */

import React from 'react';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import InputRow from './input-row.js';

import styles from './slider-input-row.module.scss';

export default ({ id, label, value, setValue, min, max, step, valueSuffix }) => {
  const labelID = id + '-label';
  return (
    <InputRow className={styles.sliderRow}>
      <InputLabel id={labelID} htmlFor={id} shrink>
        {label}
      </InputLabel>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={9}>
          <Slider
            id={id}
            aria-labelledby={labelID}
            value={value}
            min={min}
            max={max}
            step={step}
            valueLabelDisplay="off"
            onChange={(event, newValue) => setValue(newValue)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="center">
            {value}
            {valueSuffix}
          </Typography>
        </Grid>
      </Grid>
    </InputRow>
  );
};
