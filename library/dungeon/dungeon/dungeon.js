/* SPDX-License-Identifier: MIT */

import DungeonCell from './dungeon-cell.js';
import DungeonTile from './dungeon-tile.js';
import DungeonTileBlocked from './dungeon-tile-blocked.js';

export default class Dungeon {
  _PRIVATE_tileRows;
  _PRIVATE_tileCols;
  _PRIVATE_tiles;
  _PRIVATE_cellRows;
  _PRIVATE_cellCols;
  _PRIVATE_cells;
  _PRIVATE_rooms = [];
  _PRIVATE_deadEnds = [];
  _PRIVATE_stairs = [];
  constructor(dungeonLayout, tileRows, tileCols) {
    this._PRIVATE_tileRows = tileRows;
    this._PRIVATE_tileCols = tileCols;
    this._PRIVATE_cellRows = tileRows * 2 + 1;
    this._PRIVATE_cellCols = tileCols * 2 + 1;
    this._PRIVATE_cells = [];
    this._PRIVATE_tiles = [];
    const mask = dungeonLayout.getMask(tileRows, tileCols);
    for (let cellRow = 0; cellRow < this._PRIVATE_cellRows; cellRow++) {
      const tileRow = cellRow % 2 === 1 ? (cellRow - 1) / 2 : null;
      for (let cellCol = 0; cellCol < this._PRIVATE_cellCols; cellCol++) {
        const tileCol = cellCol % 2 === 1 ? (cellCol - 1) / 2 : null;
        if (tileRow !== null && tileCol !== null) {
          let cell;
          if (mask != null && mask.isBlocked(tileRow, tileCol)) {
            cell = new DungeonTileBlocked(cellRow, cellCol, tileRow, tileCol);
          } else {
            cell = new DungeonTile(this, cellRow, cellCol, tileRow, tileCol);
          }
          this._PRIVATE_cells.push(cell);
          this._PRIVATE_tiles.push(cell);
        } else {
          this._PRIVATE_cells.push(new DungeonCell(this, cellRow, cellCol));
        }
      }
    }
    Object.freeze(this._PRIVATE_cells);
    Object.freeze(this._PRIVATE_tiles);
    Object.freeze(this);
  }

  tile(row, col) {
    if (row < 0 || row >= this._PRIVATE_tileRows || col < 0 || col >= this._PRIVATE_tileCols) {
      return null;
    }
    return this._PRIVATE_tiles[row * this._PRIVATE_tileCols + col];
  }

  cell(row, col) {
    if (row < 0 || row >= this._PRIVATE_cellRows || col < 0 || col >= this._PRIVATE_cellCols) {
      return null;
    }
    return this._PRIVATE_cells[row * this._PRIVATE_cellCols + col];
  }

  forEachTile(fn) {
    this._PRIVATE_tiles.forEach((cell) => fn(cell));
  }

  forEachCell(fn) {
    this._PRIVATE_cells.forEach((cell) => fn(cell));
  }

  get rooms() {
    return this._PRIVATE_rooms;
  }
  get deadEnds() {
    return this._PRIVATE_deadEnds;
  }

  get tileRows() {
    return this._PRIVATE_tileRows;
  }
  get tileCols() {
    return this._PRIVATE_tileCols;
  }

  get cellRows() {
    return this._PRIVATE_cellRows;
  }
  get cellCols() {
    return this._PRIVATE_cellCols;
  }
}
