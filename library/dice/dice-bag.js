/* SPDX-License-Identifier: MIT */

import RandomNumberGenerator from './random-number-generator.js';

const X = /^ *(-?\d+) *$/i;
const NDX = /^ *(\d*)d(\d+) *$/i;
const NDXmodY = /^ *(\d*)d(\d+) *([+\-*/]) *(.*) *$/i;

function parse(diceNotation) {
  const xResults = X.exec(diceNotation);
  if (xResults) {
    const value = parseInt(xResults[1], 10);
    return new RollDescriptor(null, null, value < 0 ? '-' : '+', Math.abs(value));
  }
  const ndxResults = NDX.exec(diceNotation);
  if (ndxResults) {
    const nS = ndxResults[1];
    const n = nS === '' ? 1 : parseInt(nS, 10);
    const x = parseInt(ndxResults[2], 10);
    return new RollDescriptor(n, x, null, null);
  }
  const ndxModYResults = NDXmodY.exec(diceNotation);
  if (ndxModYResults) {
    const nS = ndxModYResults[1];
    const n = nS === '' ? 1 : parseInt(nS, 10);
    const x = parseInt(ndxModYResults[2], 10);
    const mod = ndxModYResults[3];
    const y = ndxModYResults[4];
    return new RollDescriptor(n, x, mod, parse(y));
  }
  return 'UNKNOWN';
}

class RollDescriptor {
  _PRIVATE_count;
  _PRIVATE_sides;
  _PRIVATE_modifierType;
  _PRIVATE_modifierValue;
  constructor(count, sides, modifierType, modifierValue) {
    this._PRIVATE_count = count;
    this._PRIVATE_sides = sides;
    this._PRIVATE_modifierType = modifierType;
    this._PRIVATE_modifierValue = modifierValue;
  }

  get count() {
    return this._PRIVATE_count;
  }
  get sides() {
    return this._PRIVATE_sides;
  }
  get modifierType() {
    return this._PRIVATE_modifierType;
  }
  get modifierValue() {
    return this._PRIVATE_modifierValue;
  }

  toString() {
    let str = '';
    if (this.count) {
      str += this.count + 'd' + this.sides;
    }
    if (this.modifierType) {
      str += this.modifierType + this.modifierValue;
    }
    return str;
  }
}

class DieResult {
  _PRIVATE_sides;
  _PRIVATE_value;
  _PRIVATE_modifier;
  constructor(sides, value, optModifier) {
    this._PRIVATE_sides = sides;
    this._PRIVATE_value = value;
    this._PRIVATE_modifier = optModifier || '';
  }

  get sides() {
    return this._PRIVATE_sides;
  }
  get value() {
    return this._PRIVATE_value;
  }
  get total() {
    return this._PRIVATE_value;
  }
  get modifier() {
    return this._PRIVATE_modifier;
  }

  toString() {
    if (this.sides) {
      return this.modifier + ' ' + this.value + '[d' + this.sides + '] ';
    } else {
      return this.modifier + ' ' + this.value + ' ';
    }
  }
}

class DieResultGroup {
  _PRIVATE_dieResults;
  _PRIVATE_modifier;
  constructor(dieResults, optModifier) {
    this._PRIVATE_dieResults = dieResults;
    this._PRIVATE_modifier = optModifier || '';
  }

  get dieResults() {
    return this._PRIVATE_dieResults;
  }
  get modifier() {
    return this._PRIVATE_modifier;
  }
  get total() {
    let total = 0;
    this.dieResults.forEach((result) => {
      if (result.modifier === '' || result.modifier === '+') {
        total += result.total;
      } else if (result.modifier === '-') {
        total -= result.total;
      } else if (result.modifier === '*') {
        total *= result.total;
      } else if (result.modifier === '/') {
        total /= result.total;
      }
    });
    return total;
  }

  toString() {
    let str = this.modifier + ' ( ';
    this.dieResults.forEach((dieResult) => (str += dieResult));
    str += ' ) ';
    return str;
  }
}

class Results {
  _PRIVATE_total;
  _PRIVATE_rolls;
  _PRIVATE_rollResults;
  constructor(total, rolls, rollResults) {
    this._PRIVATE_total = total;
    this._PRIVATE_rolls = rolls;
    this._PRIVATE_rollResults = rollResults;
  }

  get total() {
    return this._PRIVATE_rollResults.total;
  }
  get rolls() {
    return this._PRIVATE_rolls;
  }
  get rollResults() {
    return this._PRIVATE_rollResults;
  }

  toString() {
    return (
      'Total: ' + this.total + '; Rolls: ' + this.rolls + '; Roll Results: ' + this.rollResults
    );
  }
}

function collectResults(rng, rolls, nextModifier, dieResults) {
  rolls.forEach((roll) => {
    if (roll.sides) {
      if (roll.count > 1) {
        const subResults = [];
        let nextSubModifier = null;
        for (let i = 0; i < roll.count; i++) {
          subResults.push(new DieResult(roll.sides, rng.d(roll.sides), nextSubModifier));
          nextSubModifier = '+';
        }
        dieResults.push(new DieResultGroup(subResults, nextModifier));
      } else {
        dieResults.push(new DieResult(roll.sides, rng.d(roll.sides), nextModifier));
      }
    }
    nextModifier = '?';
    if (roll.modifierType) {
      console.dir(roll);
      nextModifier = roll.modifierType;
      if (roll.modifierValue instanceof RollDescriptor) {
        const subResults = [];
        collectResults(rng, [roll.modifierValue], null, subResults);
        dieResults.push(new DieResultGroup(subResults, nextModifier));
      } else {
        dieResults.push(new DieResult(null, roll.modifierValue, nextModifier));
      }
      nextModifier = '?';
    }
  });
}
/**
 * Rolls dice randomly using standard dice notation (https://en.wikipedia.org/wiki/Dice_notation)
 */
export default class DiceBag {
  _PRIVATE_rng;
  constructor(optRNG) {
    if (optRNG && !(optRNG instanceof RandomNumberGenerator)) {
      throw new Error('optRNG was not a RandomNumberGenerator');
    }
    this._PRIVATE_rng = optRNG || new RandomNumberGenerator();
  }

  r(diceNotation) {
    return this.roll(diceNotation);
  }

  roll(diceNotation) {
    const rolls = [parse(diceNotation)];
    const dieResults = [];
    collectResults(this._PRIVATE_rng, rolls, null, dieResults);
    const rollResults = new DieResultGroup(dieResults);

    const total = 0;
    return new Results(total, rolls, rollResults);
  }
}
