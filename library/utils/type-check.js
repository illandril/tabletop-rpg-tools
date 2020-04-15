/* SPDX-License-Identifier: MIT */

const TypeCheck = {
  string: (name, value) => {
    if (typeof name !== 'string') {
      throw Error('name must be a string');
    }
    if (typeof value !== 'string') {
      throw Error(name + ' must be a string');
    }
  },
  integer: (name, value) => {
    TypeCheck.string('name', name);
    if (!Number.isInteger(value)) {
      throw Error(name + ' must be an integer');
    }
  },
  integerNotBelow: (name, min, value) => {
    TypeCheck.string('name', name);
    TypeCheck.integer('min', min);
    if (!Number.isInteger(value) || value < min) {
      throw Error(name + ' must be an integer >= ' + min);
    }
  },
  positiveInteger: (name, value) => {
    TypeCheck.integerNotBelow(name, 1, value);
  },
  integerBetween: (name, min, max, value) => {
    TypeCheck.string('name', name);
    TypeCheck.integer('min', min);
    TypeCheck.integerNotBelow('max', min, max);
    if (!Number.isInteger(value) || value < min || value > max) {
      throw Error(name + ' must be an integer between ' + min + ' and ' + max);
    }
  },
  function: (name, value) => {
    TypeCheck.string('name', name);
    if (typeof value !== 'function') {
      throw Error(name + ' must be a function');
    }
  },
  array: (name, value) => {
    TypeCheck.string('name', name);
    if (!Array.isArray(value)) {
      throw Error(name + ' must be an array');
    }
  },
};

export default TypeCheck;
