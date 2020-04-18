/* SPDX-License-Identifier: MIT */

import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import Page from '../../components/page.js';
import MainPages from '../main-pages.js';

import styles from './page.module.scss';

export default () => {
  return (
    <Page className={styles.page}>
      <Grid container spacing={5}>
        {MainPages.map((item, index) => (
          <Grid key={item.path} item xs={12} sm={6} md={4}>
            <Card raised>
              <CardActionArea component={RouterLink} to={item.path}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.icon} {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};
