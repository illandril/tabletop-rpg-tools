/* SPDX-License-Identifier: MIT */

import React from 'react';

import Typography from '@material-ui/core/Typography';

import Page from '../../components/page.js';

export default function PageNotFound() {
  return (
    <Page title="Page Not Found">
      <Typography variant="h4" align="center">
        404!
      </Typography>
      <Typography align="center">Page not found</Typography>
    </Page>
  );
}
