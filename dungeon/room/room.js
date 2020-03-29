/* SPDX-License-Identifier: MIT */

import { Directions } from '../directions.js'

/**
 * A room within a dungeon
 */
class Room {
  #northTileRow;
  #eastTileCol;
  #southTileRow;
  #westTileCol;
  #doors = [];
  constructor(northTileRow, eastTileCol, southTileRow, westTileCol) {
    this.#northTileRow = northTileRow;
    this.#eastTileCol = eastTileCol;
    this.#southTileRow = southTileRow;
    this.#westTileCol = westTileCol;
  };

  /**
   * The top-most tile row for the room
   */
  get northTileRow() { return this.#northTileRow; }

  /**
   * The right-most tile column for the room
   */
  get eastTileCol() { return this.#eastTileCol; }

  /**
   * The bottom-most tile row for the room
   */
  get southTileRow() { return this.#southTileRow; }

  /**
   * The left-most tile column for the room
   */
  get westTileCol() { return this.#westTileCol; }

  get widthInTiles() { return this.#eastTileCol - this.#westTileCol + 1; }
  get heightInTiles() { return this.#southTileRow - this.#northTileRow + 1; }
  get areaInTiles() { return this.widthInTiles * this.heightInTiles; }

  get doors() { return this.#doors; }

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

export { Room };
