/* SPDX-License-Identifier: MIT */

/*
 * This dungeon generator was heavily inspired by dungeon.pl, a perl Random Dungeon Generator by drow.
 * The original dungeon.pl can be found here: https://donjon.bin.sh
 */

import { RNGMulberry32 } from '../dice/random-number-generator-mulberry32.js';
import { Directions, CardinalDirections } from './directions.js';
import { DungeonLayouts } from './dungeon-layout/dungeon-layouts.js';
import { RoomLayout } from './room/room-layout.js';
import { PackedRoomLayout } from './room/room-layout-packed.js';
import { DoorLayout } from './door/door-layout.js';
import { CorridorLayout } from './corridor/corridor-layout.js';
import { Dungeon } from './dungeon/dungeon.js';

const Defaults = {
  ROWS: 5,
  COLS: 5,
  DUNGEON_LAYOUT: DungeonLayouts[0] /* none */ ,
};
Object.freeze(Defaults);

class DungeonFactory {
  #seed;
  #rng;
  #rows = Defaults.ROWS;
  #cols = Defaults.COLS;
  #dungeonLayout = Defaults.DUNGEON_LAYOUT;
  #roomLayout = new PackedRoomLayout();
  #doorLayout = new DoorLayout();
  #corridorLayout = new CorridorLayout();
  constructor(opt_seed) {
    this.#seed = Number.isInteger(opt_seed) ? opt_seed : new Date().getTime();
    this.#rng = new RNGMulberry32(this.#seed);
  }

  get seed() { return this.#seed; }

  get rng() { return this.#rng; }

  get rows() { return this.#rows; }
  set rows(rows) {
    this.#rows = Math.max(5, rows | 0);
  }

  get cols() { return this.#cols; }
  set cols(cols) {
    this.#cols = Math.max(5, cols | 0);
  }

  get dungeonLayout() { return this.#dungeonLayout; }
  set dungeonLayout(dungeonLayout) {
    this.#dungeonLayout = Defaults.DUNGEON_LAYOUT;
    DungeonLayouts.some(dl => {
      if (dl.name === dungeonLayout) {
        this.#dungeonLayout = dl;
        return true;
      }
    });
  }

  get roomLayout() { return this.#roomLayout; }
  set roomLayout(roomLayout) {
    if (!roomLayout instanceof RoomLayout) {
      throw 'roomLayout must be of type RoomLayout'
    }
    this.#roomLayout = roomLayout;
  }

  get doorLayout() { return this.#doorLayout; }
  set doorLayout(doorLayout) { this.#doorLayout = doorLayout; }

  get corridorLayout() { return this.#corridorLayout; }
  set corridorLayout(corridorLayout) {
    // if (!corridorLayout instanceof CorridorLayout) {
    //   throw 'corridorLayout must be of type CorridorLayout'
    // }
    this.#corridorLayout = corridorLayout;
  }

  createDungeon() {
    const dungeon = new Dungeon(this.dungeonLayout, this.rows, this.cols);
    //this.dungeonLayout.mask(dungeon);
    this.roomLayout.placeRooms(this.rng, dungeon);
    this.doorLayout.placeDoors(this.rng, dungeon);
    this.corridorLayout.placeCorridors(this.rng, dungeon);
    this.doorLayout.fixDoors(dungeon);
    return dungeon;
  }
}

export { DungeonFactory };
