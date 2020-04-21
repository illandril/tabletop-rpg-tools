/* SPDX-License-Identifier: MIT */

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import metadata from '../metadata.js';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function Page({ title, maxWidth, className, children, noIndex }) {
  const classes = useStyles();
  const routeMatch = useRouteMatch();

  let url = routeMatch.url;
  if (url == '/' && !routeMatch.isExact) {
    url = '/404';
  }

  return (
    <Container
      component="main"
      maxWidth={maxWidth || 'lg'}
      className={clsx(classes.content, className)}
    >
      <Helmet>
        <title>{`${title} - ${metadata.name}`}</title>
        {(noIndex && <meta name="robots" content="noindex" />) || (
          <link rel="canonical" href={metadata.baseURL + url} />
        )}
      </Helmet>
      {children}
    </Container>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  noIndex: PropTypes.bool,
};
