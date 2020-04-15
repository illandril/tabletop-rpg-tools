/* SPDX-License-Identifier: MIT */

import { TypeCheck } from '../../../utils';

import Explode from './explode.js';
import KeepLowest from './keep-lowest.js';
import KeepHighest from './keep-highest.js';

export default function Factory(type, dice, args) {
  TypeCheck.string('type', type);
  TypeCheck.array('args', args);
  switch (type) {
    case 'kl':
      return new KeepLowest(dice, args[0]);
    case 'kh':
      return new KeepHighest(dice, args[0]);
    case 'dl':
      return new KeepHighest(dice, dice.count - args[0]);
    case 'dh':
      return new KeepLowest(dice, dice.count - args[0]);
    case '!':
      return new Explode(dice, args[0], args[1]);
    default:
      throw Error('Unexpected dice modifier type: ' + type);
  }
}
