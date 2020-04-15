/* SPDX-License-Identifier: MIT */

import Ceil from './ceil.js';
import Floor from './floor.js';
import Round from './round.js';
import Negate from './negate.js';

export default function Factory(type, input) {
  switch (type) {
    case 'ceil':
      return new Ceil(input);
    case 'floor':
      return new Floor(input);
    case 'round':
      return new Round(input);
    case 'negate':
      return new Negate(input);
    default:
      throw Error('Unexpected value modifier type: ' + type);
  }
}
