/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputRow from './input-row.js';

const useStyles = makeStyles((theme) => ({
  labelCell: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

export default function SliderInputRow({
  id,
  label,
  value,
  setValue,
  min,
  max,
  step,
  valueSuffix,
}) {
  const classes = useStyles();
  const labelID = id + '-label';
  return (
    <InputRow>
      <InputLabel id={labelID} htmlFor={id} shrink>
        {label}
      </InputLabel>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={9} className={classes.labelCell}>
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
}

SliderInputRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  valueSuffix: PropTypes.string,
};
