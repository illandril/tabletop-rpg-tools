/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import './input-row.scss';

export default ({ children, className }) => {
  return (
    <div className={clsx('dungeon-inputRow', className)}>
      {children}
    </div>
  );
};
