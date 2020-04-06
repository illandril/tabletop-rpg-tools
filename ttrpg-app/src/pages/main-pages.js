/* SPDX-License-Identifier: MIT */

import React from 'react';
import DungeonIcon from '@material-ui/icons/Build';
import DiceIcon from '@material-ui/icons/Casino';
import SpellTablesIcon from '@material-ui/icons/MenuBook';
import ErrorIcon from '@material-ui/icons/Error';

export default [
  {
    path: '/dungeon',
    name: 'Dungeon Builder',
    description: 'Generate simple dungeons',
    icon: <DungeonIcon />,
  },
  {
    path: '/dice',
    name: 'Dice Roller',
    description: 'Roll some dice',
    icon: <DiceIcon />,
  },
  {
    path: '/5e/spell-tables',
    name: '5e Spell Tables Dice Roller',
    description: 'Roll dice for some of the tables used by spells in the Fifth Edition D&D Basic Rules',
    icon: <SpellTablesIcon />,
  },
  /*
  {
    path: '/dne',
    name: 'Test 404 Page',
    description: 'Test the 404 page',
    icon: <ErrorIcon />,
  },
  */
];
