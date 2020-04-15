/* SPDX-License-Identifier: MIT */
import nearley from 'nearley';

import Combiner from './combiner.js';
import Constant from './constant.js';
import Dice from './dice.js';
import FudgeDice from './fudge-dice.js';
import DiceModifierFactory from './dice-modifier/factory.js';
import ValueModifierFactory from './value-modifier/factory.js';

import grammar from './grammar.js';

class ParseError extends Error {
  _PRIVATE_cause;
  constructor(message, cause) {
    super(message);
    this._PRIVATE_cause = cause;
  }

  get cause() {
    return this._PRIVATE_cause;
  }

  get name() {
    return 'ParseError';
  }
}

export default class Parser {
  _PRIVATE_rng;

  constructor(rng) {
    if (typeof rng.d !== 'function') {
      throw Error('rng must support the d function');
    }
    this._PRIVATE_rng = rng;
    Object.freeze(this);
  }

  _convert(nearleyOutput) {
    switch (nearleyOutput.type) {
      case 'Combiner':
        return new Combiner(
          this._convert(nearleyOutput.left),
          nearleyOutput.modifier,
          this._convert(nearleyOutput.right)
        );
      case 'Constant':
        return new Constant(nearleyOutput.value);
      case 'Dice':
        if (nearleyOutput.x === 'f') {
          return new FudgeDice(this._PRIVATE_rng, nearleyOutput.n);
        } else {
          return new Dice(this._PRIVATE_rng, nearleyOutput.n, nearleyOutput.x);
        }
      case 'DiceModifier':
        return DiceModifierFactory(
          nearleyOutput.modifierType,
          this._convert(nearleyOutput.dice),
          nearleyOutput.args
        );
      case 'ValueModifier':
        return ValueModifierFactory(nearleyOutput.modifierType, this._convert(nearleyOutput.value));
      default:
        throw Error('Unexpected type: ' + nearleyOutput.type);
    }
  }

  parse(input) {
    if (typeof input !== 'string' || input.length < 1) {
      throw new ParseError('input must be a non-empty string');
    }
    try {
      const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
      const result = parser.feed(input.toLowerCase());
      if (result.results.length === 1) {
        return this._convert(result.results[0]);
      } else if (result.results.length > 1) {
        throw new ParseError('Multiple results?');
      } else {
        throw new ParseError('Empty results?');
      }
    } catch (e) {
      //console.error(e);
      throw new ParseError('Error parsing input', e);
    }
  }
}
