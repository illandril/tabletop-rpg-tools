/* SPDX-License-Identifier: MIT */

import React from 'react';
import MaterialLink from '@material-ui/core/Link';

export default function LinkExternal(props) {
  return <MaterialLink target="_blank" rel="external" {...props} />;
}
