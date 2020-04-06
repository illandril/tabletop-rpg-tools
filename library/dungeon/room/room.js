/* SPDX-License-Identifier: MIT */

import Directions from '../directions.js';

/**
 * A room within a dungeon
 */
export default class Room {
  _PRIVATE_northTileRow;
  _PRIVATE_eastTileCol;
  _PRIVATE_southTileRow;
  _PRIVATE_westTileCol;
  _PRIVATE_doors = [];
  constructor(northTileRow, eastTileCol, southTileRow, westTileCol) {
    this._PRIVATE_northTileRow = northTileRow;
    this._PRIVATE_eastTileCol = eastTileCol;
    this._PRIVATE_southTileRow = southTileRow;
    this._PRIVATE_westTileCol = westTileCol;
  }

  /**
   * The top-most tile row for the room
   */
  get northTileRow() {
    return this._PRIVATE_northTileRow;
  }

  /**
   * The right-most tile column for the room
   */
  get eastTileCol() {
    return this._PRIVATE_eastTileCol;
  }

  /**
   * The bottom-most tile row for the room
   */
  get southTileRow() {
    return this._PRIVATE_southTileRow;
  }

  /**
   * The left-most tile column for the room
   */
  get westTileCol() {
    return this._PRIVATE_westTileCol;
  }

  get widthInTiles() {
    return this._PRIVATE_eastTileCol - this._PRIVATE_westTileCol + 1;
  }
  get heightInTiles() {
    return this._PRIVATE_southTileRow - this._PRIVATE_northTileRow + 1;
  }
  get areaInTiles() {
    return this.widthInTiles * this.heightInTiles;
  }

  get doors() {
    return this._PRIVATE_doors;
  }

  /**
   * Places this room into the dungeon, as long as it won't overlap other rooms
   * or blocked regions.
   */
  place(dungeon) {
    if (!this.isValidRoom(dungeon)) {
      return false;
    }
    for (let r = this.northTileRow; r <= this.southTileRow; r++) {
      for (let c = this.westTileCol; c <= this.eastTileCol; c++) {
        const tile = dungeon.tile(r, c);
        tile.room = this;
        if (r < this.southTileRow) {
          tile.edge(Directions.south).room = this;
          if (c < this.eastTileCol) {
            tile.edge(Directions.southeast).room = this;
          }
        }
        if (c < this.eastTileCol) {
          tile.edge(Directions.east).room = this;
        }
      }
    }
    dungeon.rooms.push(this);
    return true;
  }

  /**
   * Checks to make sure the room doesn't overlap any other rooms or blocked regions
   */
  isValidRoom(dungeon) {
    for (let r = this.northTileRow; r <= this.southTileRow; r++) {
      for (let c = this.westTileCol; c <= this.eastTileCol; c++) {
        const tile = dungeon.tile(r, c);
        if (!tile || tile.isBlocked || tile.isRoom) {
          return false;
        }
      }
    }
    return true;
  }
}
