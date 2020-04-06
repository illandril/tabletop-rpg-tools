/* SPDX-License-Identifier: MIT */

import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import ExternalLink from '../../components/link-external.js';
import Page from '../../components/page.js';
import MainPages from '../main-pages.js';

import './page.scss';

export default () => {
  return (
    <Page className="home">
      <Paper elevation={4} className="home-notice">
      This site is currently under construction, and is an "as time permits" side project. Expect intermittent, unannounced updates with substantial changes, occasionally completely breaking everything.
      Feel free to create new issues in <ExternalLink color="inherit" href="https://github.com/illandril/tabletop-rpg-tools">this site's GitHub repository</ExternalLink> if you encounter any issues or have feature requests.
      </Paper>
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
