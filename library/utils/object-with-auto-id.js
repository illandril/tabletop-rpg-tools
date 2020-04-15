/* SPDX-License-Identifier: MIT */

import shortid from 'shortid';

export default class ObjectWithAutoID {
  _PRIVATE_id;
  constructor() {
    this._PRIVATE_id = shortid.generate();
  }

  get id() {
    return this._PRIVATE_id;
  }
}
