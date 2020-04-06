/* SPDX-License-Identifier: MIT */

import Mask from './layout-mask.js';

export default class DungeonLayout {
  _PRIVATE_id;
  _PRIVATE_name;
  _PRIVATE_maskAreas;
  _PRIVATE_excludedAreas;
  constructor(id, name, maskAreas, opt_excludedAreas) {
    if ( typeof(id) !== 'string' ){
      throw new Error('id must be a string');
    }
    if ( typeof(name) !== 'string' ){
      throw new Error('name must be a string');
    }
    this._PRIVATE_id = id;
    this._PRIVATE_name = name;
    this._PRIVATE_maskAreas = maskAreas;
    this._PRIVATE_excludedAreas = opt_excludedAreas || [];
    Object.freeze(this);
  }

  get id() {
    return this._PRIVATE_id;
  }

  get name() {
    return this._PRIVATE_name;
  }

  getMask(rows, cols) {
    return this._PRIVATE_maskAreas === null
      ? null
      : new Mask(rows, cols, this._PRIVATE_maskAreas, this._PRIVATE_excludedAreas);
  }
  mask(dungeon) {
    if (this._PRIVATE_maskAreas !== null) {
      const mask = new Mask(
        dungeon.tileRows,
        dungeon.tileCols,
        this._PRIVATE_maskAreas,
        this._PRIVATE_excludedAreas
      );
      dungeon.forEachTile((tile) => {
        if (mask.isBlocked(tile.tileRow, tile.tileCol)) {
          tile.block();
        }
      });
    }
  }

  debug(container, rows, cols) {
    if (this._PRIVATE_maskAreas !== null) {
      const mask = new Mask(rows, cols, this._PRIVATE_maskAreas, this._PRIVATE_excludedAreas);
      mask.debug(container);
    }
  }
}
