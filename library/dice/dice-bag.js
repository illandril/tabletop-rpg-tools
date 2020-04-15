/* SPDX-License-Identifier: MIT */

import RandomNumberGenerator from './random-number-generator.js';
import Parser from './dice-grammar/parser.js';

export default class DiceBag {
  _PRIVATE_parser;
  constructor(opt_rngOrParser) {
    if (opt_rngOrParser) {
      if (typeof opt_rngOrParser.parse === 'function') {
        this._PRIVATE_parser = opt_rngOrParser;
      } else if (typeof opt_rngOrParser.d === 'function') {
        this._PRIVATE_parser = new Parser(opt_rngOrParser);
      } else {
        throw Error(
          'DiceBag accepts only a random number generator with a d function, or a parser with a parse function'
        );
      }
    } else {
      this._PRIVATE_parser = new Parser(new RandomNumberGenerator());
    }
  }

  r(diceNotation) {
    return this.roll(diceNotation);
  }

  roll(diceNotation) {
    return this._PRIVATE_parser.parse(diceNotation);
  }

  rollValue(diceNotation) {
    return this.roll(diceNotation).value;
  }
}
