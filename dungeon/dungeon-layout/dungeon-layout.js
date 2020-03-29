/* SPDX-License-Identifier: MIT */

import { Mask } from './layout-mask.js'

class DungeonLayout {
  #name;
  #maskAreas;
  #excludedAreas;
  constructor(name, maskAreas, opt_excludedAreas) {
    this.#name = name;
    this.#maskAreas = maskAreas;
    this.#excludedAreas = opt_excludedAreas || [];
    Object.freeze(this);
  }

  get name() { return this.#name; }

  getMask(rows, cols) {
    return this.#maskAreas === null ? null : new Mask(rows, cols, this.#maskAreas, this.#excludedAreas);
  }
  mask(dungeon) {
    if ( this.#maskAreas !== null ) {
      const mask = new Mask(dungeon.tileRows, dungeon.tileCols, this.#maskAreas, this.#excludedAreas);
      dungeon.forEachTile(tile => {
        if (mask.isBlocked(tile.tileRow, tile.tileCol)) {
          tile.block();
        }
      });
    }
  }

  debug(container, rows, cols) {
    if ( this.#maskAreas !== null ) {
      const mask = new Mask(rows, cols, this.#maskAreas, this.#excludedAreas);
      mask.debug(container);
    }
  }
}

export { DungeonLayout };
