/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import styles from './input-row.module.scss';

export default ({ children, className }) => {
  return <div className={clsx(styles.inputRow, className)}>{children}</div>;
};
