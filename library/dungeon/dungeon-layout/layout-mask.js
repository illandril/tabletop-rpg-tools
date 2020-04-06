/* SPDX-License-Identifier: MIT */

const THRESHOLD = 128;
const BASE_FILL = '#000';
const EXCLUDE_FILL = '#600';
const INCLUDE_FILL = '#fff';
const INCLUDE_COLOR_INDEX = 1;

export default class LayoutMask {
  _PRIVATE_canvas;
  _PRIVATE_cols;
  _PRIVATE_blockedCells;
  constructor(rows, cols, maskAreas, excludedAreas) {
    this._PRIVATE_cols = cols;

    this._PRIVATE_canvas = document.createElement('canvas');
    this._PRIVATE_canvas.width = cols;
    this._PRIVATE_canvas.height = rows;

    const context = this._PRIVATE_canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.lineWidth = 1;
    context.fillStyle = BASE_FILL;
    context.fillRect(0, 0, cols, rows);

    context.fillStyle = INCLUDE_FILL;
    maskAreas.forEach((maskArea) => {
      maskArea.draw(context, cols, rows);
    });

    context.fillStyle = EXCLUDE_FILL;
    excludedAreas.forEach((excludedArea) => {
      excludedArea.draw(context, cols, rows);
    });

    const imageData = context.getImageData(0, 0, cols, rows).data;
    this._PRIVATE_blockedCells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const includeColor = imageData[(row * cols + col) * 4 + INCLUDE_COLOR_INDEX];
        this._PRIVATE_blockedCells.push(includeColor < THRESHOLD);
      }
    }
    Object.freeze(this._PRIVATE_blockedCells);
    Object.freeze(this);
  }

  isBlocked(row, col) {
    return this._PRIVATE_blockedCells[row * this._PRIVATE_cols + col];
  }

  debug(container) {
    container.appendChild(this._PRIVATE_canvas);
    this._PRIVATE_canvas.style.width = this._PRIVATE_canvas.width * 25 + 'px';
  }
}
