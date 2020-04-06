/* SPDX-License-Identifier: MIT */

const CORRIDOR_ROOM = 'C';
const STAIR_UP_ROOM = 'U';
const STAIR_DOWN_ROOM = 'D';

export default class DungeonTile {
  _PRIVATE_dungeon;
  _PRIVATE_cellRow;
  _PRIVATE_cellCol;
  _PRIVATE_tileRow;
  _PRIVATE_tileCol;
  _PRIVATE_room = null;
  constructor(dungeon, cellRow, cellCol, tileRow, tileCol) {
    this._PRIVATE_dungeon = dungeon;
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
  get isBlocked() {
    return false;
  }
  get isDoor() {
    return false;
  }

  get isOpenSpace() {
    return this.isRoom || this.isCorridor;
  }

  get room() {
    return this._PRIVATE_room;
  }
  set room(room) {
    this._PRIVATE_room = room;
  }
  get isRoom() {
    return this._PRIVATE_room !== null && typeof this._PRIVATE_room !== 'string';
  }

  get isCorridor() {
    return this._PRIVATE_room === CORRIDOR_ROOM || this.isStairs;
  }
  markCorridor() {
    this._PRIVATE_room = CORRIDOR_ROOM;
  }
  clearCorridor() {
    this._PRIVATE_room = null;
  }

  get isDeadEnd() {
    return this._PRIVATE_dungeon.deadEnds.indexOf(this) !== -1;
  }
  markDeadEnd() {
    this._PRIVATE_dungeon.deadEnds.push(this);
  }

  get isStairs() {
    return this._PRIVATE_room === STAIR_UP_ROOM || this._PRIVATE_room === STAIR_DOWN_ROOM;
  }
  get stairDirection() {
    if (this._PRIVATE_room === STAIR_UP_ROOM) {
      return 'up';
    } else if (this._PRIVATE_room === STAIR_DOWN_ROOM) {
      return 'down';
    } else {
      return null;
    }
  }
  markStairsUp() {
    this._PRIVATE_room = STAIR_UP_ROOM;
  }
  markStairsDown() {
    this._PRIVATE_room = STAIR_DOWN_ROOM;
  }

  edge(direction) {
    return this._PRIVATE_dungeon.cell(
      this.cellRow + direction.rowAdjustment,
      this.cellCol + direction.colAdjustment
    );
  }

  neighbor(direction) {
    return this._PRIVATE_dungeon.tile(
      this.tileRow + direction.rowAdjustment,
      this.tileCol + direction.colAdjustment
    );
  }
}
