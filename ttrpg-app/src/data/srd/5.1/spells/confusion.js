/* Some content licensed under OPEN GAME LICENSE Version 1.0a */

import RandomRollTable from '@illandril/tabletop-rpg-tools/dice/random-roll-table.js';
import Spell from './spell.js';

const BehaviorTable = new RandomRollTable('Behavior');
BehaviorTable.addOption('The creature uses all its movement to move in a random direction. To determine the direction, roll a d8 and assign a direction to each die face. The creature doesn’t take an action this turn.', 1);
BehaviorTable.addOption('The creature doesn’t move or take actions this turn.', 5);
BehaviorTable.addOption('The creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn.', 2);
BehaviorTable.addOption('The creature can act and move normally.', 2);
Object.freeze(BehaviorTable);

export default new Spell(
  'Confusion',
  '1 action',
  '90 feet',
  'V, S, M (three nut shells)',
  'Concentration, up to 1 minute',
  [
    'This spell assaults and twists creatures’ minds, spawning delusions and provoking uncontrolled action. Each creature in a 10-foot-radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it.',
    'An affected target can’t take reactions and must roll a d10 at the start of each of its turns to determine its behavior for that turn',
    BehaviorTable,
    'At the end of each of its turns, an affected target can make a Wisdom saving throw. If it succeeds, this effect ends for that target.',
    'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the radius of the sphere increases by 5 feet for each slot level above 4th.',
  ]
);

export { BehaviorTable };
