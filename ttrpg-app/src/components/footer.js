/* SPDX-License-Identifier: MIT */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Link from './link-internal.js';

import metadata from '../metadata.js';

import styles from './footer.module.scss';

export default () => {
  return (
    <Container component="footer" className={styles.footer} maxWidth="lg">
      <Typography variant="body2" color="textPrimary" align="center">
        © 2020 {metadata.author}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Some content used under the <Link to="ogl">Open Gaming License</Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Inspired by <Link to="thanks">many other great tools</Link>
      </Typography>
    </Container>
  );
};
