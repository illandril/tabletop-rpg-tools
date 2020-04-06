/* Some content licensed under OPEN GAME LICENSE Version 1.0a */

import RandomRollTable from '@illandril/tabletop-rpg-tools/dice/random-roll-table.js';
import Spell from './spell.js';

const RaceTable = new RandomRollTable('Race');
RaceTable.addOption('Dragonborn', 4);
RaceTable.addOption('Dwarf, hill', 9);
RaceTable.addOption('Dwarf, mountain', 8);
RaceTable.addOption('Elf, dark', 4);
RaceTable.addOption('Elf, high', 9);
RaceTable.addOption('Elf, wood', 8);
RaceTable.addOption('Gnome, forest', 4);
RaceTable.addOption('Gnome, rock', 6);
RaceTable.addOption('Half-elf', 4);
RaceTable.addOption('Half-orc', 4);
RaceTable.addOption('Halfling, lightfoot', 8);
RaceTable.addOption('Halfling, stout', 8);
RaceTable.addOption('Human', 20);
RaceTable.addOption('Tiefling', 4);
Object.freeze(RaceTable);

export default new Spell(
  'Reincarnate',
  '1 hour',
  'Touch',
  'V, S, M (rare oils and unguents worth at least 1,000 gp, which the spell consumes)',
  'Instantaneous',
  [
    'You touch a dead humanoid or a piece of a dead humanoid. Provided that the creature has been dead no longer than 10 days, the spell forms a new adult body for it and then calls the soul to enter that body. If the target’s soul isn’t free or willing to do so, the spell fails.',
    'The magic fashions a new body for the creature to inhabit, which likely causes the creature’s race to change. The GM rolls a d100 and consults the following table to determine what form the creature takes when restored to life, or the GM chooses a form.',
    RaceTable,
    'The reincarnated creature recalls its former life and experiences. It retains the capabilities it had in its original form, except it exchanges its original race for the new one and changes its racial traits accordingly.',
  ]
);

export { RaceTable };
