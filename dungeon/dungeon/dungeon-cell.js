/* SPDX-License-Identifier: MIT */

const CORRIDOR_ROOM = 'C';

class DungeonCell {
  #dungeon;
  #cellRow;
  #cellCol;
  #room = null;
  #doorType = null;
  constructor(dungeon, cellRow, cellCol) {
    this.#dungeon = dungeon;
    this.#cellRow = cellRow;
    this.#cellCol = cellCol;
  }

  get cellRow() { return this.#cellRow; }
  get cellCol() { return this.#cellCol; }

  get isTile() { return false; }
  get isBlocked() { return false; }
  get isDeadEnd() { return false; }
  get isStairs() { return false; }

  get isOpenSpace() { return this.isRoom || this.isCorridor; }

  get room() { return this.isRoom ? this.#room : null; }
  set room(room) { this.#room = room; }
  get isRoom() { return this.#room !== null && this.#room !== CORRIDOR_ROOM; }

  get isCorridor() { return this.#room === CORRIDOR_ROOM; }
  markCorridor() { this.#room = CORRIDOR_ROOM; }
  clearCorridor() { this.#room = null; }

  set doorType(doorType) { this.#doorType = doorType; }
  get doorType() { return this.#doorType; }
  get isDoor() { return this.#doorType !== null; }

  edge(direction) {
    return this.#dungeon.cell(this.cellRow + direction.rowAdjustment, this.cellCol + direction.colAdjustment);
  }
}

export { DungeonCell };
