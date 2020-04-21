/* SPDX-License-Identifier: MIT */

import React from 'react';
import MaterialLink from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function LinkInternal(props) {
  return <MaterialLink component={RouterLink} {...props} />;
}
