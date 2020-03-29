/* SPDX-License-Identifier: MIT */

const THRESHOLD = 128;
const BASE_FILL = '#000';
const EXCLUDE_FILL = '#600';
const INCLUDE_FILL = '#fff';
const INCLUDE_COLOR_INDEX = 1;

class Mask {
  #canvas;
  #cols;
  #blockedCells;
  constructor(rows, cols, maskAreas, excludedAreas) {
    this.#cols = cols;

    this.#canvas = document.createElement('canvas');
    this.#canvas.width = cols;
    this.#canvas.height = rows;

    const context = this.#canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.lineWidth = 1;
    context.fillStyle = BASE_FILL;
    context.fillRect(0, 0, cols, rows)

    context.fillStyle = INCLUDE_FILL;
    maskAreas.forEach(maskArea => {
      maskArea.draw(context, cols, rows);
    });

    context.fillStyle = EXCLUDE_FILL;
    excludedAreas.forEach(excludedArea => {
      excludedArea.draw(context, cols, rows);
    });

    const imageData = context.getImageData(0, 0, cols, rows).data;
    this.#blockedCells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const includeColor = imageData[(row * cols + col) * 4 + INCLUDE_COLOR_INDEX];
        this.#blockedCells.push(includeColor < THRESHOLD);
      }
    }
    Object.freeze(this.#blockedCells);
    Object.freeze(this);
  }

  isBlocked(row, col) {
    return this.#blockedCells[row * this.#cols + col];
  }

  debug(container) {
    container.appendChild(this.#canvas);
    this.#canvas.style.width = this.#canvas.width * 25 + 'px';
  }
}

export { Mask };
