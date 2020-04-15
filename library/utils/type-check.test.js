/* SPDX-License-Identifier: MIT */

import shortid from 'shortid';
import TypeCheck from './type-check.js';
import ExpectTypeError from './expect-type-error.js';

function randomString() {
  return shortid.generate();
}

function badName(fn) {
  NON_STRINGS.forEach((nonString) => {
    ExpectTypeError.string('name', () => fn(nonString));
  });
}

const NON_STRINGS = [null, false, 0, 1.5, {}, { toString: () => 'value' }, ['value'], randomString];
const NON_INTEGERS = [null, false, '1', 1.5, {}, { valueOf: () => 1 }, [1], () => 1];
const NON_FUNCTIONS = [null, false, 'function', 10, 1.5, {}, { valueOf: () => () => 1 }, [() => 1]];
const NON_ARRAYS = [null, false, 'array', '[]', 10, 1.5, {}, { valueOf: () => [] }];

describe('TypeCheck.string', () => {
  test('bad name', () => {
    badName(TypeCheck.string);
  });

  test('good input', () => {
    const name = randomString();
    TypeCheck.string(name, 'value');
    TypeCheck.string(name, '');
    TypeCheck.string(name, 'abcdef');
  });

  test('bad input', () => {
    NON_STRINGS.forEach((nonString) => {
      const name = randomString();
      ExpectTypeError.string(name, () => TypeCheck.string(name, nonString));
    });
  });
});

describe('TypeCheck.integer', () => {
  test('bad name', () => {
    badName(TypeCheck.integer);
  });

  test('good input', () => {
    TypeCheck.integer('input1', -1);
    TypeCheck.integer('input2', 0);
    TypeCheck.integer('input3', 1);
  });

  test('bad input', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      const name = randomString();
      ExpectTypeError.integer(name, () => TypeCheck.integer(name, nonInteger));
    });
  });
});

describe('TypeCheck.integerNotBelow', () => {
  test('bad name', () => {
    badName(TypeCheck.integerNotBelow);
  });

  test('bad min', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      ExpectTypeError.integer('min', () => TypeCheck.integerNotBelow('input', nonInteger));
    });
  });

  test('good input', () => {
    TypeCheck.integerNotBelow('input3', 9, 9);
    TypeCheck.integerNotBelow('input1', 10, 10);
    TypeCheck.integerNotBelow('input2', 10, 11);
  });

  function badInput(min, value) {
    const name = randomString();
    ExpectTypeError.integerNotBelow(name, min, () => TypeCheck.integerNotBelow(name, min, value));
  }

  test('bad input: too low', () => {
    badInput(10, 9);
    badInput(15, 10);
    badInput(15, 11);
  });

  test('bad input: non integers', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      badInput(0, nonInteger);
    });
  });
});

describe('TypeCheck.positiveInteger', () => {
  test('bad name', () => {
    badName(TypeCheck.positiveInteger);
  });

  test('good input', () => {
    TypeCheck.positiveInteger('input1', 1);
    TypeCheck.positiveInteger('input2', 2);
    TypeCheck.positiveInteger('input3', 3);
  });

  function badInput(value) {
    const name = randomString();
    ExpectTypeError.positiveInteger(name, () => TypeCheck.positiveInteger(name, value));
  }

  test('bad input: zero', () => {
    badInput(0);
  });

  test('bad input: negatives', () => {
    badInput(-1);
    badInput(-2);
    badInput(-3);
  });

  test('bad input: non integers', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      badInput(0, nonInteger);
    });
  });
});

describe('TypeCheck.integerBetween', () => {
  test('bad name', () => {
    badName(TypeCheck.integerBetween);
  });

  test('bad min', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      ExpectTypeError.integer('min', () => TypeCheck.integerBetween('input', nonInteger));
    });
  });

  test('bad max: non integers', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      const min = Math.floor(Math.random() * 10) - 5;
      ExpectTypeError.integerNotBelow('max', min, () =>
        TypeCheck.integerBetween('input', min, nonInteger)
      );
    });
  });

  test('bad max: below min', () => {
    ExpectTypeError.integerNotBelow('max', 5, () => TypeCheck.integerBetween('input', 5, -5));
    ExpectTypeError.integerNotBelow('max', 20, () => TypeCheck.integerBetween('input', 20, 19));
  });

  test('good input', () => {
    TypeCheck.integerBetween('input1', 3, 5, 3);
    TypeCheck.integerBetween('input2', 3, 5, 4);
    TypeCheck.integerBetween('input3', 3, 5, 5);
  });

  function badInput(min, max, value) {
    const name = randomString();
    ExpectTypeError.integerBetween(name, min, max, () =>
      TypeCheck.integerBetween(name, min, max, value)
    );
  }

  test('bad input: too low', () => {
    badInput(3, 5, 2);
  });

  test('bad input: too high', () => {
    badInput(3, 5, 6);
  });

  test('bad input: non integers', () => {
    NON_INTEGERS.forEach((nonInteger) => {
      badInput(1, 10, nonInteger);
    });
  });
});

describe('TypeCheck.function', () => {
  test('bad name', () => {
    badName(TypeCheck.function);
  });

  test('good input', () => {
    const name = randomString();
    TypeCheck.function(name, function () {});
    TypeCheck.function(name, () => {});
    TypeCheck.function(name, randomString);
  });

  test('bad input', () => {
    NON_FUNCTIONS.forEach((nonFunction) => {
      const name = randomString();
      ExpectTypeError.function(name, () => TypeCheck.function(name, nonFunction));
    });
  });
});

describe('TypeCheck.array', () => {
  test('bad name', () => {
    badName(TypeCheck.array);
  });

  test('good input', () => {
    const name = randomString();
    TypeCheck.array(name, []);
    TypeCheck.array(name, new Array());
    TypeCheck.array(name, [1, 2, 3]);
  });

  test('bad input', () => {
    NON_ARRAYS.forEach((nonArray) => {
      const name = randomString();
      ExpectTypeError.array(name, () => TypeCheck.array(name, nonArray));
    });
  });
});
