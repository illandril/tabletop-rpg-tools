/* SPDX-License-Identifier: MIT */

import React from 'react';

import DungeonIcon from '@material-ui/icons/Build';
import DiceIcon from '@material-ui/icons/Casino';
import CharacterCreationIcon from '@material-ui/icons/PersonAdd';
import SpellTablesIcon from '@material-ui/icons/MenuBook';

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
    path: '/5e/character-creation',
    name: '5e Character Creation Tools',
    description: 'Tools to help during character creation, using Fifth Edition D&D Basic Rules',
    icon: <CharacterCreationIcon />,
  },
  {
    path: '/5e/spell-tables',
    name: '5e Spell Tables Dice Roller',
    description: 'Roll dice for some spell tables in the Fifth Edition D&D Basic Rules',
    icon: <SpellTablesIcon />,
  },
];
