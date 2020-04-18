/* SPDX-License-Identifier: MIT */

import clsx from 'clsx';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Container from '@material-ui/core/Container';

import metadata from '../metadata.js';

import styles from './page.module.scss';

export default ({ title, maxWidth, className, children }) => {
  const routeMatch = useRouteMatch();
  let url = routeMatch.url;
  if (url == '/' && !routeMatch.isExact) {
    url = '/404';
  }
  return (
    <Container
      component="main"
      maxWidth={maxWidth || 'lg'}
      className={clsx(styles.content, className)}
    >
      <Helmet>
        <title>{`${title} - ${metadata.name}`}</title>
        <link rel="canonical" href={metadata.baseURL + url} />
      </Helmet>
      {children}
    </Container>
  );
};
