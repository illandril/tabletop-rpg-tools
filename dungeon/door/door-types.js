/* SPDX-License-Identifier: MIT */

import { DoorType } from './door-type.js';

const DoorTypes = [
  new DoorType('arch', 'Archway', null),
  new DoorType('unlocked', 'Unlocked Door', 'o'),
  new DoorType('locked', 'Locked Door', 'x'),
  new DoorType('trapped', 'Trapped Door', 't'),
  new DoorType('secret', 'Secret Door', 's'),
  new DoorType('portcullis', 'Portcullis', '#'),
];

export { DoorTypes };
