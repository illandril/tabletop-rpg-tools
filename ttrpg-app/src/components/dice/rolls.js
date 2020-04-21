/* SPDX-License-Identifier: MIT */

import React from 'react';

import Types from './types.js';
import RollWithValue from './roll-with-value.js';

export default function Rolls({ rollResults }) {
  return (
    <div>
      {rollResults.map((rollResult) => (
        <RollWithValue key={rollResult.id} rollResult={rollResult} />
      ))}
    </div>
  );
}

Rolls.propTypes = {
  rollResults: Types.Rolls,
};
