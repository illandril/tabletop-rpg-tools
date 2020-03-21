/* SPDX-License-Identifier: MIT */

import { RandomNumberGenerator } from './random-number-generator.js';


const X = /^ *(-?\d+) *$/i;
const DX = /^ *d(\d+) *$/i;
const NDX = /^ *(\d*)d(\d+) *$/i;
const NDXmodY = /^ *(\d*)d(\d+) *([+\-*/]) *(.*) *$/i;
const NDXmodNDX = /^ *(\d*)d(\d+) *([+\-*/]) *(\d*)d(\d+) *$/i;

function parse(diceNotation) {
  const xResults = X.exec(diceNotation);
  if ( xResults ) {
    const value = parseInt(xResults[1],10);
    return new RollDescriptor(null, null, value < 0 ? '-' : '+', Math.abs(value));
  }
  const ndxResults = NDX.exec(diceNotation);
  if ( ndxResults ) {
    const nS = ndxResults[1];
    const n = nS === '' ? 1 : parseInt(nS,10);
    const x = parseInt(ndxResults[2],10);
    return new RollDescriptor(n, x, null, null);
  }
  const ndxModYResults = NDXmodY.exec(diceNotation);
  if ( ndxModYResults ) {
    const nS = ndxModYResults[1];
    const n = nS === '' ? 1 : parseInt(nS,10);
    const x = parseInt(ndxModYResults[2],10);
    const mod = ndxModYResults[3];
    const y = ndxModYResults[4];
    return new RollDescriptor(n, x, mod, parse(y));
  }
  /*
  const ndxModNDXResults = NDXmodNDX.exec(diceNotation);
  if ( ndxModNDXResults ) {
    const nS = ndxModNDXResults[1];
    const n = nS === '' ? 1 : parseInt(nS,10);
    const x = parseInt(ndxModNDXResults[2],10);
    const mod = ndxModNDXResults[3];
    const nS2 = ndxModNDXResults[4];
    const n2 = nS2 === '' ? 1 : parseInt(nS2,10);
    const x2 = parseInt(ndxModNDXResults[5],10);
    return new RollDescriptor(n, x, mod, new RollDescriptor(n2, x2, null, null));
  }
  */
  return 'UNKNOWN';
}

class RollDescriptor {
  #count;
  #sides;
  #modifierType;
  #modifierValue;
  constructor(count, sides, modifierType, modifierValue) {
    this.#count = count;
    this.#sides = sides;
    this.#modifierType = modifierType;
    this.#modifierValue = modifierValue;
  }

  get count() { return this.#count; };
  get sides() { return this.#sides; };
  get modifierType() { return this.#modifierType; };
  get modifierValue() { return this.#modifierValue; };

  toString() {
    let str = '';
    if ( this.count ) {
      str += this.count + 'd' + this.sides;
    }
    if ( this.modifierType ) {
      str += this.modifierType + this.modifierValue;
    }
    return str;
  }
}

class DieResult {
  #sides;
  #value;
  #modifier;
  constructor(sides, value, optModifier) {
    this.#sides = sides;
    this.#value = value;
    this.#modifier = optModifier || '';
  }

  get sides() { return this.#sides; };
  get value() { return this.#value; };
  get total() { return this.#value; };
  get modifier() { return this.#modifier; };

  toString() {
    if ( this.sides ) {
      return this.modifier + ' ' + this.value + '[d' + this.sides + '] ';
    } else {
      return this.modifier + ' ' + this.value + ' ';
    }
  }
}

class DieResultGroup {
  #dieResults;
  #modifier;
  constructor(dieResults, optModifier) {
    this.#dieResults = dieResults;
    this.#modifier = optModifier || '';
  }

  get dieResults() { return this.#dieResults; };
  get modifier() { return this.#modifier; };
  get total() {
    let total = 0;
    this.dieResults.forEach(result => {
      if ( result.modifier === '' || result.modifier === '+' ) {
        total += result.total;
      } else if ( result.modifier === '-' ) {
        total -= result.total;
      } else if ( result.modifier === '*' ) {
        total *= result.total;
      } else if ( result.modifier === '/' ) {
        total /= result.total;
      }
    });
    return total;
  }

  toString() {
    let str = this.modifier + ' ( ';
    this.dieResults.forEach(dieResult => str += dieResult);
    str += ' ) ';
    return str;
  }
}

class Results {
  #total;
  #rolls;
  #rollResults;
  constructor(total, rolls, rollResults) {
    this.#total = total;
    this.#rolls = rolls;
    this.#rollResults = rollResults;
  }

  get total() { return this.#rollResults.total; };
  get rolls() { return this.#rolls; };
  get rollResults() { return this.#rollResults; };

  toString() {
    return 'Total: ' + this.total + '; Rolls: ' + this.rolls + '; Roll Results: ' + this.rollResults;
  }
}

function collectResults(rng, rolls, nextModifier, dieResults) {
  rolls.forEach(roll => {
    if ( roll.sides ) {
      if ( roll.count > 1 ) {
        const subResults = [];
        let nextSubModifier = null;
        for ( let i = 0; i < roll.count; i++ ) {
          subResults.push(new DieResult( roll.sides, rng.d(roll.sides), nextSubModifier));
          nextSubModifier = '+';
        }
        dieResults.push(new DieResultGroup(subResults, nextModifier));
      } else {
        dieResults.push(new DieResult( roll.sides, rng.d(roll.sides), nextModifier));
      }
    }
    nextModifier = '?';
    if ( roll.modifierType ) {
      console.dir(roll);
      nextModifier = roll.modifierType;
      if ( roll.modifierValue instanceof RollDescriptor ) {
        const subResults = [];
        collectResults(rng, [roll.modifierValue], null, subResults );
        dieResults.push(new DieResultGroup(subResults, nextModifier));
      } else {
        dieResults.push(new DieResult( null, roll.modifierValue, nextModifier));
      }
      nextModifier = '?';
    }
  });
}
/**
 * Rolls dice randomly using standard dice notation (https://en.wikipedia.org/wiki/Dice_notation)
 */
class DiceBag {
  #rng;
  constructor(optRNG) {
    if ( optRNG && !(optRNG instanceof RandomNumberGenerator)) {
      throw 'optRNG was not a RandomNumberGenerator';
    }
    this.#rng = optRNG || new RandomNumberGenerator();
  }

  r(diceNotation) {
    return this.roll(diceNotation);
  }

  roll(diceNotation) {
    const rolls = [parse(diceNotation)];
    const dieResults = [];
    collectResults(this.#rng, rolls, null, dieResults);
    const rollResults = new DieResultGroup(dieResults);

    const total = 0;
    return new Results(total, rolls, rollResults);
  }
}

export { DiceBag };
