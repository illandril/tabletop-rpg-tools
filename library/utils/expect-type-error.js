/* SPDX-License-Identifier: MIT */

const ExpectTypeError = {
  string: (name, fn) => {
    expect(fn).toThrow(new Error(name + ' must be a string'));
  },
  integer: (name, fn) => {
    expect(fn).toThrow(new Error(name + ' must be an integer'));
  },
  integerNotBelow: (name, min, fn) => {
    expect(fn).toThrow(new Error(name + ' must be an integer >= ' + min));
  },
  positiveInteger: (name, fn) => {
    ExpectTypeError.integerNotBelow(name, 1, fn);
  },
  integerBetween: (name, min, max, fn) => {
    expect(fn).toThrow(new Error(name + ' must be an integer between ' + min + ' and ' + max));
  },
  function: (name, fn) => {
    expect(fn).toThrow(new Error(name + ' must be a function'));
  },
  array: (name, fn) => {
    expect(fn).toThrow(new Error(name + ' must be an array'));
  },
};

export default ExpectTypeError;
