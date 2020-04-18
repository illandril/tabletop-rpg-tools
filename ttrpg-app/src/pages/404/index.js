/* SPDX-License-Identifier: MIT */

import React from 'react';

import Typography from '@material-ui/core/Typography';

import Page from '../../components/page.js';

export default () => {
  return (
    <Page title="Page Not Found">
      <Typography variant="h4" align="Center">
        404!
      </Typography>
      <Typography align="center">Page not found</Typography>
    </Page>
  );
};
