/* SPDX-License-Identifier: MIT */

/*
 * This dungeon generator was heavily inspired by dungeon.pl, a perl Random Dungeon Generator by drow.
 * The original dungeon.pl can be found here: https://donjon.bin.sh
 */

import RNGMulberry32 from '../dice/random-number-generator-mulberry32.js';
import DungeonLayout from './dungeon-layout/dungeon-layout.js';
import DungeonLayouts from './dungeon-layout/dungeon-layouts.js';
import RoomLayout from './room/room-layout.js';
import RoomLayouts from './room/room-layouts.js';
import DoorLayout from './door/door-layout.js';
import CorridorLayout from './corridor/corridor-layout.js';
import Dungeon from './dungeon/dungeon.js';

const Defaults = {
  ROWS: 5,
  COLS: 5,
};
Object.freeze(Defaults);

export default class DungeonFactory {
  _PRIVATE_seed;
  _PRIVATE_rng;
  _PRIVATE_rows = Defaults.ROWS;
  _PRIVATE_cols = Defaults.COLS;
  _PRIVATE_dungeonLayout = DungeonLayouts[0];
  _PRIVATE_roomLayout = RoomLayouts[0];
  _PRIVATE_doorLayout = new DoorLayout();
  _PRIVATE_corridorLayout = new CorridorLayout();
  constructor(opt_seed) {
    this._PRIVATE_seed = Number.isInteger(opt_seed) ? opt_seed : new Date().getTime();
    this._PRIVATE_rng = new RNGMulberry32(this._PRIVATE_seed);
  }

  get seed() {
    return this._PRIVATE_seed;
  }

  get rng() {
    return this._PRIVATE_rng;
  }

  get rows() {
    return this._PRIVATE_rows;
  }
  set rows(rows) {
    this._PRIVATE_rows = Math.max(5, rows | 0);
  }

  get cols() {
    return this._PRIVATE_cols;
  }
  set cols(cols) {
    this._PRIVATE_cols = Math.max(5, cols | 0);
  }

  get dungeonLayout() {
    return this._PRIVATE_dungeonLayout;
  }
  set dungeonLayout(dungeonLayout) {
    if (!(dungeonLayout instanceof DungeonLayout)) {
      throw new Error('dungeonLayout must be of type DungeonLayout');
    }
    this._PRIVATE_dungeonLayout = dungeonLayout;
  }

  get roomLayout() {
    return this._PRIVATE_roomLayout;
  }
  set roomLayout(roomLayout) {
    if (!(roomLayout instanceof RoomLayout)) {
      throw new Error('roomLayout must be of type RoomLayout');
    }
    this._PRIVATE_roomLayout = roomLayout;
  }

  get doorLayout() {
    return this._PRIVATE_doorLayout;
  }

  get corridorLayout() {
    return this._PRIVATE_corridorLayout;
  }

  async createDungeon() {
    const dungeon = new Dungeon(this.dungeonLayout, this.rows, this.cols);
    this.roomLayout.placeRooms(this.rng, dungeon);
    this.doorLayout.placeDoors(this.rng, dungeon);
    this.corridorLayout.placeCorridors(this.rng, dungeon);
    this.doorLayout.fixDoors(dungeon);
    return dungeon;
  }
}
