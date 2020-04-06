/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import Container from '@material-ui/core/Container';

import './page.scss';

export default ({ maxWidth, className, children }) => (
  <Container component="main" maxWidth={maxWidth || 'lg'} className={clsx('page-content', className)}>
    {children}
  </Container>
);
