/* SPDX-License-Identifier: MIT */

import React from 'react';
import MaterialLink from '@material-ui/core/Link';

export default (props) => {
  return <MaterialLink target="_blank" rel="external" {...props} />;
};
