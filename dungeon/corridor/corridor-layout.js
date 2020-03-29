/* SPDX-License-Identifier: MIT */

import { CardinalDirections } from '../directions.js'

class CorridorLayout {
  #chanceToTryStraightFirst = 0.5;
  #deadendRemovalChance = 0.5;
  #stairCount = 2;
  #stairsPlaced = 0;

  get chanceToTryStraightFirst() { return this.#chanceToTryStraightFirst; }
  set chanceToTryStraightFirst(chanceToTryStraightFirst) {
    if (chanceToTryStraightFirst < 0 || chanceToTryStraightFirst > 1) {
      throw 'Chance must be between 0 and 1';
    }
    this.#chanceToTryStraightFirst = chanceToTryStraightFirst;
  }

  get stairCount() { return this.#stairCount; }
  set stairCount(stairCount) { this.#stairCount = Math.max(0, stairCount); }

  get deadendRemovalChance() { return this.#deadendRemovalChance; }
  set deadendRemovalChance(deadendRemovalChance) {
    if (deadendRemovalChance < 0 || deadendRemovalChance > 1) {
      throw 'Chance must be between 0 and 1';
    }
    this.#deadendRemovalChance = deadendRemovalChance;
  }

  placeCorridors(rng, dungeon) {
    this.addCorridors(rng, dungeon);
    this.collapseDeadends(rng, dungeon);
  }

  addCorridors(rng, dungeon) {
    this.#stairsPlaced = 0;
    const doors = [];
    dungeon.rooms.forEach(room => {
      room.doors.forEach(door => {
        doors.push(door);
      });
    });
    rng.shuffleInPlace(doors);
    doors.forEach(door => {
      if (!door.cell.isCorridor) {
        const roomTile = door.roomCell;
        if (roomTile.isRoom) {
          const tunnelDir = door.direction;
          if (openTunnel(roomTile, tunnelDir)) {
            this.tunnel(rng, 0 /* depth */ , roomTile.neighbor(tunnelDir), tunnelDir);
          }
        }
      }
    });
  }

  collapseDeadends(rng, dungeon) {
    if (this.deadendRemovalChance <= 0) {
      return;
    }
    const all = this.deadendRemovalChance >= 1;
    dungeon.deadEnds.forEach(deadEndTile => {
      if (!deadEndTile.isCorridor || deadEndTile.isStairs) {
        return;
      }
      if (!all && !rng.chance(this.deadendRemovalChance)) {
        return;
      }
      collapse(deadEndTile);
    });
  }

  tunnel(rng, depth, tile, lastDir) {
    if (tile.isBlocked || tile.isRoom || depth > 1000) {
      return false;
    }
    const dirs = tunnelDirs(rng, this, lastDir);
    let isDeadEnd = true;
    dirs.forEach(dir => {
      if (openTunnel(tile, dir)) {
        this.tunnel(rng, depth + 1, tile.neighbor(dir), dir);
        isDeadEnd = false;
      }
    });
    if (isDeadEnd) {
      if (this.#stairsPlaced < this.stairCount) {
        if (this.#stairsPlaced === 0 || this.#stairsPlaced !== 1 && rng.chance(0.5)) {
          tile.markStairsDown();
        } else {
          tile.markStairsUp();
        }
        this.#stairsPlaced++;
      }
      tile.markDeadEnd();
    }
  }
}

function tunnelDirs(rng, corridorLayout, lastDir) {
  let dirs;
  if (rng.chance(corridorLayout.chanceToTryStraightFirst)) {
    if (rng.chance(0.5)) {
      dirs = [lastDir, lastDir.next90, lastDir.previous90];
    } else {
      dirs = [lastDir, lastDir.previous90, lastDir.next90];
    }
  } else {
    dirs = [lastDir, lastDir.next90, lastDir.previous90];
    rng.shuffleInPlace(dirs);
  }
  return dirs;
}

function openTunnel(tile, dir) {
  const midEdge = tile.edge(dir);
  if (!midEdge || midEdge.isBlocked || midEdge.isCorridor) {
    // Don't go off the edge of the map, through blocked tiles, or through other corridors
    return false;
  }

  const nextTile = tile.neighbor(dir);
  if (!nextTile || nextTile.isBlocked || nextTile.isCorridor) {
    // Don't go off the edge of the map, through blocked tiles, or through other corridors
    return false;
  }

  if (tile.isRoom && !(midEdge.isDoor || midEdge.isRoom) ||
    nextTile.isRoom && !(midEdge.isDoor || midEdge.isRoom)) {
    // Don't go through room walls (but OK to go through a door into or out of a room)
    return false;
  }

  midEdge.markCorridor();
  if (!nextTile.isRoom) {
    nextTile.markCorridor();
  }
  return true;
}

function collapse(corridorCell) {
  if (!corridorCell || !corridorCell.isCorridor) {
    return;
  }
  CardinalDirections.some(dir => {
    if (isDeadend(corridorCell, dir)) {
      corridorCell.clearCorridor();
      collapse(corridorCell.edge(dir));
      return true;
    }
  });
}

function isDeadend(corridorCell, dir) {
  // A corridor is a deadend for a direction if it is surrounded by walls in all
  // directions opposite the given direction.
  // Example stairs, dir = east
  // W = Wall, C = corridorCell, ? = Any cell
  // W W ?
  // W C ?
  // W W ?
  return dir.nonAdjacentDirections.every(wallDir => {
    const wall = corridorCell.edge(wallDir);
    return wall && !wall.isOpenSpace;
  });
}

export { CorridorLayout };
