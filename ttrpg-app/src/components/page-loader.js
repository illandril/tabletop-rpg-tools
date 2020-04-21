/* SPDX-License-Identifier: MIT */

import React from 'react';

import Typography from '@material-ui/core/Typography';
import Page from './page.js';

export default function PageLoader() {
  return (
    <Page title="Loading..." noIndex={true}>
      <Typography color="textSecondary" variant="h3" align="center">
        Loading, please wait...
      </Typography>
    </Page>
  );
}
