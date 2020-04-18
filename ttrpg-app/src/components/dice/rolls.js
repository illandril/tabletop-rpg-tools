/* SPDX-License-Identifier: MIT */

import React from 'react';

import RollWithValue from './roll-with-value.js';

import styles from './rolls.module.scss';

export default function Rolls({ rollResults }) {
  return (
    <div>
      {rollResults.map((rollResult) => (
        <RollWithValue key={rollResult.id} rollResult={rollResult} />
      ))}
    </div>
  );
}
