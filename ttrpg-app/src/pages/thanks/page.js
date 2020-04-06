/* SPDX-License-Identifier: MIT */

import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemLink from '../../components/list-item-link-external.js';
import ListItemText from '@material-ui/core/ListItemText';

import Page from '../../components/page.js';
import ExternalLink from '../../components/link-external.js';

import './page.scss';

const thanks = [
  {
    url: 'https://donjon.bin.sh',
    name: "drow's donjon",
    secondary: 'dungeon.pl in particular heavily influenced my dungeon builder',
  },
  {
    url: 'https://www.fantasynamegenerators.com',
    name: 'Fantasy Name Generators',
  },
  {
    url: 'https://www.dndbeyond.com',
    name: 'D&D Beyond',
  },
  {
    url: 'https://azgaar.github.io/Fantasy-Map-Generator/',
    name: "Azgaar's Fantasy Map Generator",
  },
  {
    url: 'https://watabou.itch.io/medieval-fantasy-city-generator',
    name: "Watabou's Medieval Fantasy City Generator",
  },
];
export default () => {
  return (
    <Page className="thanks-page" maxWidth="sm">
      <Typography variant="h4">
        Inspired by...
      </Typography>
      <List>
        {thanks.map((link) => (
          <ListItemLink key={link.url} href={link.url}>
            <ListItemText primary={link.name} secondary={link.secondary} />
          </ListItemLink>
        ))}
      </List>
    </Page>
  );
};
