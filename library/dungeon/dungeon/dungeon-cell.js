/* SPDX-License-Identifier: MIT */

const CORRIDOR_ROOM = 'C';

export default class DungeonCell {
  _PRIVATE_dungeon;
  _PRIVATE_cellRow;
  _PRIVATE_cellCol;
  _PRIVATE_room = null;
  _PRIVATE_doorType = null;
  constructor(dungeon, cellRow, cellCol) {
    this._PRIVATE_dungeon = dungeon;
    this._PRIVATE_cellRow = cellRow;
    this._PRIVATE_cellCol = cellCol;
  }

  get cellRow() {
    return this._PRIVATE_cellRow;
  }
  get cellCol() {
    return this._PRIVATE_cellCol;
  }

  get isTile() {
    return false;
  }
  get isBlocked() {
    return false;
  }
  get isDeadEnd() {
    return false;
  }
  get isStairs() {
    return false;
  }

  get isOpenSpace() {
    return this.isRoom || this.isCorridor;
  }

  get room() {
    return this.isRoom ? this._PRIVATE_room : null;
  }
  set room(room) {
    this._PRIVATE_room = room;
  }
  get isRoom() {
    return this._PRIVATE_room !== null && this._PRIVATE_room !== CORRIDOR_ROOM;
  }

  get isCorridor() {
    return this._PRIVATE_room === CORRIDOR_ROOM;
  }
  markCorridor() {
    this._PRIVATE_room = CORRIDOR_ROOM;
  }
  clearCorridor() {
    this._PRIVATE_room = null;
  }

  set doorType(doorType) {
    this._PRIVATE_doorType = doorType;
  }
  get doorType() {
    return this._PRIVATE_doorType;
  }
  get isDoor() {
    return this._PRIVATE_doorType !== null;
  }

  edge(direction) {
    return this._PRIVATE_dungeon.cell(
      this.cellRow + direction.rowAdjustment,
      this.cellCol + direction.colAdjustment
    );
  }
}
