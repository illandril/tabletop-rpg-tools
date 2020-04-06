/* SPDX-License-Identifier: MIT */

import Directions from '../../directions.js';
import SVG from '../../../imaging/svg/svg.js';

const DEFAULT_SCALE = 32;
const BORDER_RATIO = 1 / DEFAULT_SCALE;
const EDGE_RATIO = 8 / DEFAULT_SCALE;
const OPEN_SPACE_FILL = '#fff';

/**
 * Converts a Dungeon into a Canvas element
 */
export default function dungeonToSVG(dungeon, optScale) {
  const scale = optScale || DEFAULT_SCALE;
  const singlePixel = 1 / scale;
  const borderWidth = BORDER_RATIO * DEFAULT_SCALE * singlePixel;
  const edgeWidth = EDGE_RATIO * DEFAULT_SCALE * singlePixel;
  const tileSize = 1 - edgeWidth;
  const tileOffset = edgeWidth / 2;
  const edgeJoinOffset = singlePixel / 2;
  const deadEndWidth = 3 * singlePixel;
  const deadEndOffset = tileOffset + deadEndWidth;
  const deadEndSize = tileSize - deadEndWidth * 2;

  const svg = new SVG(dungeon.tileCols, dungeon.tileRows);
  svg.width = dungeon.tileCols * scale;
  svg.height = dungeon.tileRows * scale;
  svg.strokeWidth = singlePixel;
  svg.fill = 'none';
  svg.stroke = 'none';

  svg.addStyle('.deadEnd { display: none; }');
  svg.addStyle('.dungeonjs-debug .deadEnd { display: initial; }');
  svg.addStyle('.tile.blocked { display: none; }');
  svg.addStyle('.dungeonjs-debug .tile.blocked { display: initial; }');
  svg.addStyle('.border { fill: none; stroke: rgba(196, 196, 196, 0.75); stroke-width: ' + (borderWidth ) + '; }');

  const bgRect = svg.addRectangle(dungeon.tileCols, dungeon.tileRows);
  bgRect.fill = '#333';

  let lastRow = -1;
  let rowGroup = null;
  dungeon.forEachTile((tile) => {
    if ( rowGroup === null || tile.tileRow != lastRow ) {
      lastRow = tile.tileRow;
      rowGroup = svg.addGroup();
      rowGroup.addClass('tileRowContainer');
    }
    const tileGroup = rowGroup.addGroup();
    tileGroup.translate(tile.tileCol, tile.tileRow);
    tileGroup.addClass('tileContainer');

    const tileRect = tileGroup.addRectangle(tileSize, tileSize);
    tileRect.addClass('tile');
    tileRect.x = tileOffset;
    tileRect.y = tileOffset;
    if (tile.isBlocked) {
      tileRect.addClass('blocked');
      tileRect.fill = '#f0f';
    } else if (tile.isOpenSpace) {
      tileRect.addClass('open');
      if (tile.isRoom) {
        tileRect.addClass('room');
      }
      tileRect.fill = OPEN_SPACE_FILL;
    }

    Directions.forEach((dir) => {
      const edgeTile = tile.edge && tile.edge(dir);
      if (edgeTile && edgeTile.isOpenSpace) {
        const edgeWidth = dir.colAdjustment === 0 ? tileSize : tileOffset + edgeJoinOffset;
        const edgeHeight = dir.rowAdjustment === 0 ? tileSize : tileOffset + edgeJoinOffset;
        const edgeRect = tileGroup.addRectangle(edgeWidth, edgeHeight);
        edgeRect.addClass('edge');
        edgeRect.addClass(dir.name);

        if (edgeTile.isDoor) {
          if (edgeTile.doorType.key === 'arch') {
            edgeRect.fill = 'rgba(225, 225, 225, 1)';
          } else if (edgeTile.doorType.key === 'unlocked') {
            edgeRect.fill = 'rgba(0, 255, 0, 1)';
          } else if (edgeTile.doorType.key === 'locked') {
            edgeRect.fill = 'rgba(200, 150, 0, 1)';
          } else if (edgeTile.doorType.key === 'trapped') {
            edgeRect.fill = 'rgba(255, 0, 0, 1)';
          } else if (edgeTile.doorType.key === 'secret') {
            edgeRect.fill = 'rgba(150, 150, 0, 0.5)';
          } else if (edgeTile.doorType.key === 'portcullis') {
            edgeRect.fill = 'rgba(200, 200, 200, 1)';
          } else {
            edgeRect.fill = '#f0f';
          }
        } else {
          edgeRect.fill = OPEN_SPACE_FILL;
        }
        if (dir.colAdjustment === -1) {
          edgeRect.x = 0;
        } else if (dir.colAdjustment === 0) {
          edgeRect.x = tileOffset;
        } else {
          edgeRect.x = tileSize + tileOffset - edgeJoinOffset;
        }
        if (dir.rowAdjustment === -1) {
          edgeRect.y = 0;
        } else if (dir.rowAdjustment === 0) {
          edgeRect.y = tileOffset;
        } else {
          edgeRect.y = tileSize + tileOffset - edgeJoinOffset;
        }
      }
    });

    if (tile.isStairs) {
      const stairEllipse = tileGroup.addEllipse(0.25);
      stairEllipse.addClass('stair');
      stairEllipse.addClass(tile.stairDirection);
      stairEllipse.centerX = 0.5;
      stairEllipse.centerY = 0.5;
      if (tile.stairDirection === 'up') {
        stairEllipse.fill = '#ff0';
      } else {
        stairEllipse.fill = '#0ff';
      }
    }

    if (tile.isDeadEnd) {
      const deadEndRect = tileGroup.addRectangle(deadEndSize, deadEndSize);
      deadEndRect.addClass('deadEnd');
      deadEndRect.x = deadEndOffset;
      deadEndRect.y = deadEndOffset;
      deadEndRect.stroke = '#ffc0cb';
      deadEndRect.strokeWidth = deadEndWidth;
    }

    //const borderRect = tileGroup.addRectangle(1, 1);
    //borderRect.addClass('border');
  });

  const gridContainer = svg.addGroup();
  gridContainer.addClass('border');
  for ( let row = 0; row <= dungeon.tileRows; row++ ) {
    gridContainer.addLine(0, row, dungeon.tileCols, row);
  }
  for ( let col = 0; col <= dungeon.tileCols; col++ ) {
    gridContainer.addLine(col, 0, col, dungeon.tileRows);
  }
  return svg;
}
