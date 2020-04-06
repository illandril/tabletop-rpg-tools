/* SPDX-License-Identifier: MIT */

import RandomRollTable from '../../dice/random-roll-table.js';
import DoorTypes from './door-types.js';

const DoorTypesTable = new RandomRollTable('Door Type');
DoorTypesTable.addOption(DoorTypes[0] /* arch */, 15);
DoorTypesTable.addOption(DoorTypes[1] /* unlocked */, 45);
DoorTypesTable.addOption(DoorTypes[2] /* locked */, 15);
DoorTypesTable.addOption(DoorTypes[3] /* trapped */, 15);
DoorTypesTable.addOption(DoorTypes[4] /* secret */, 10);
DoorTypesTable.addOption(DoorTypes[5] /* portcullis */, 10);
Object.freeze(DoorTypesTable);

export default DoorTypesTable;
