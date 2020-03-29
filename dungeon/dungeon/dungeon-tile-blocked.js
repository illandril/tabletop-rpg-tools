/* SPDX-License-Identifier: MIT */

class DungeonTileBlocked {
  #cellRow;
  #cellCol;
  #tileRow;
  #tileCol;
  constructor(cellRow, cellCol, tileRow, tileCol) {
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
  get isOpenSpace() { return false; }
  get isBlocked() { return true; }
  get isRoom() { return false; }
  get isDoor() { return false; }
  get isCorridor() { return false; }
  get isDeadEnd() { return false; }
  get isStairs() { return false; }
}

export { DungeonTileBlocked };
