/* SPDX-License-Identifier: MIT */

import { DungeonCell } from './dungeon-cell.js';
import { DungeonTile } from './dungeon-tile.js';
import { DungeonTileBlocked } from './dungeon-tile-blocked.js';

class Dungeon {
  #tileRows;
  #tileCols;
  #tiles;
  #cellRows;
  #cellCols;
  #cells;
  #rooms = [];
  #deadEnds = [];
  #stairs = [];
  constructor(dungeonLayout, tileRows, tileCols) {
    this.#tileRows = tileRows;
    this.#tileCols = tileCols;
    this.#cellRows = tileRows * 2 + 1;
    this.#cellCols = tileCols * 2 + 1;
    this.#cells = [];
    this.#tiles = [];
    const mask = dungeonLayout.getMask(tileRows, tileCols);
    for (let cellRow = 0; cellRow < this.#cellRows; cellRow++) {
      const tileRow = cellRow % 2 === 1 ? (cellRow - 1) / 2 : null;
      for (let cellCol = 0; cellCol < this.#cellCols; cellCol++) {
        const tileCol = cellCol % 2 === 1 ? (cellCol - 1) / 2 : null;
        if (tileRow !== null && tileCol !== null) {
          let cell;
          if ( mask != null && mask.isBlocked(tileRow, tileCol) ) {
             cell = new DungeonTileBlocked(cellRow, cellCol, tileRow, tileCol);
          } else {
             cell = new DungeonTile(this, cellRow, cellCol, tileRow, tileCol);
          }
          this.#cells.push(cell);
          this.#tiles.push(cell);
        } else {
          this.#cells.push(new DungeonCell(this, cellRow, cellCol));
        }
      }
    }
    Object.freeze(this.#cells);
    Object.freeze(this.#tiles);
    Object.freeze(this);
  }

  tile(row, col) {
    if (row < 0 || row >= this.#tileRows ||
      col < 0 || col >= this.#tileCols) {
      return null;
    }
    return this.#tiles[row * this.#tileCols + col];
  }

  cell(row, col) {
    if (row < 0 || row >= this.#cellRows ||
      col < 0 || col >= this.#cellCols) {
      return null;
    }
    return this.#cells[row * this.#cellCols + col];
  }

  forEachTile(fn) {
    this.#tiles.forEach(cell => fn(cell));
  }

  forEachCell(fn) {
    this.#cells.forEach(cell => fn(cell));
  }

  get rooms() { return this.#rooms; }
  get deadEnds() { return this.#deadEnds; }

  get tileRows() { return this.#tileRows; }
  get tileCols() { return this.#tileCols; }

  get cellRows() { return this.#cellRows; }
  get cellCols() { return this.#cellCols; }
}

export { Dungeon };
