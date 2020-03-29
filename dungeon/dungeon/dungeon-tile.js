/* SPDX-License-Identifier: MIT */

const CORRIDOR_ROOM = 'C';
const STAIR_UP_ROOM = 'U';
const STAIR_DOWN_ROOM = 'D';

class DungeonTile {
  #dungeon;
  #cellRow;
  #cellCol;
  #tileRow;
  #tileCol;
  #room = null;
  constructor(dungeon, cellRow, cellCol, tileRow, tileCol) {
    this.#dungeon = dungeon;
    this.#cellRow = cellRow;
    this.#cellCol = cellCol;
    this.#tileRow = tileRow;
    this.#tileCol = tileCol;
  }

  get cellRow() { return this.#cellRow; }
  get cellCol() { return this.#cellCol; }

  get tileRow() { return this.#tileRow; }
  get tileCol() { return this.#tileCol; }

  get isTile() { return true; }
  get isBlocked() { return false; }
  get isDoor() { return false; }

  get isOpenSpace() { return this.isRoom || this.isCorridor; }


  get room() { return this.#room; }
  set room(room) { this.#room = room; }
  get isRoom() { return this.#room !== null && typeof(this.#room) !== 'string'; }

  get isCorridor() { return this.#room === CORRIDOR_ROOM || this.isStairs; }
  markCorridor() { this.#room = CORRIDOR_ROOM; }
  clearCorridor() { this.#room = null; }

  get isDeadEnd() { return this.#dungeon.deadEnds.indexOf(this) !== -1; }
  markDeadEnd() { this.#dungeon.deadEnds.push(this); }

  get isStairs() { return this.#room === STAIR_UP_ROOM || this.#room === STAIR_DOWN_ROOM; }
  get stairDirection() {
    if (this.#room === STAIR_UP_ROOM) {
      return 'up';
    } else if (this.#room === STAIR_DOWN_ROOM) {
      return 'down';
    } else {
      return null;
    }
  }
  markStairsUp() { this.#room = STAIR_UP_ROOM; }
  markStairsDown() { this.#room = STAIR_DOWN_ROOM; }

  edge(direction) {
    return this.#dungeon.cell(this.cellRow + direction.rowAdjustment, this.cellCol + direction.colAdjustment);
  }

  neighbor(direction) {
    return this.#dungeon.tile(this.tileRow + direction.rowAdjustment, this.tileCol + direction.colAdjustment);
  }
}

export { DungeonTile };
