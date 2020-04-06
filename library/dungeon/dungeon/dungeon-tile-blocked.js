/* SPDX-License-Identifier: MIT */

export default class DungeonTileBlocked {
  _PRIVATE_cellRow;
  _PRIVATE_cellCol;
  _PRIVATE_tileRow;
  _PRIVATE_tileCol;
  constructor(cellRow, cellCol, tileRow, tileCol) {
    this._PRIVATE_cellRow = cellRow;
    this._PRIVATE_cellCol = cellCol;
    this._PRIVATE_tileRow = tileRow;
    this._PRIVATE_tileCol = tileCol;
  }

  get cellRow() {
    return this._PRIVATE_cellRow;
  }
  get cellCol() {
    return this._PRIVATE_cellCol;
  }

  get tileRow() {
    return this._PRIVATE_tileRow;
  }
  get tileCol() {
    return this._PRIVATE_tileCol;
  }

  get isTile() {
    return true;
  }
  get isOpenSpace() {
    return false;
  }
  get isBlocked() {
    return true;
  }
  get isRoom() {
    return false;
  }
  get isDoor() {
    return false;
  }
  get isCorridor() {
    return false;
  }
  get isDeadEnd() {
    return false;
  }
  get isStairs() {
    return false;
  }
}
