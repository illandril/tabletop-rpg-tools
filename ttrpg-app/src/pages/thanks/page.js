/* SPDX-License-Identifier: MIT */

import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemLinkExternal from '../../components/list-item-link-external.js';

import Page from '../../components/page.js';

const thanks = [
  {
    url: 'https://dnd.wizards.com/',
    name: 'Dugeons and Dragons 5th Edition',
  },
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
export default function ThanksPage() {
  return (
    <Page maxWidth="sm" title="Inspired by...">
      <Typography variant="h4">Inspired by...</Typography>
      <List>
        {thanks.map((link) => (
          <ListItemLinkExternal key={link.url} href={link.url}>
            <ListItemText primary={link.name} secondary={link.secondary} />
          </ListItemLinkExternal>
        ))}
      </List>
    </Page>
  );
}
