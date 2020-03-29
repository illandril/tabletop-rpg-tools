/* SPDX-License-Identifier: MIT */

class MaskEllipse {
  #radiusX;
  #radiusY;
  #centerX;
  #centerY;
  constructor(left, top, width, height) {
    this.#radiusX = width / 2;
    this.#radiusY = height / 2;
    this.#centerX = left + this.#radiusX;
    this.#centerY = top + this.#radiusY;
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    const centerX = this.#centerX * xScale;
    const centerY = this.#centerY * yScale;
    const radiusX = this.#radiusX * xScale;
    const radiusY = this.#radiusY * yScale;
    context.beginPath();
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.fill();
  }
}

class MaskRectangle {
  #left;
  #top;
  #width;
  #height;
  constructor(left, top, width, height) {
    this.#left = left;
    this.#top = top;
    this.#width = width;
    this.#height = height;
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    const left = this.#left * xScale;
    const top = this.#top * yScale;
    const width = this.#width * xScale;
    const height = this.#height * yScale;
    context.fillRect(left, top, width, height);
  }
}

class MaskPolygon {
  #points;
  constructor(points) {
    this.#points = points;
    Object.freeze(this.#points);
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    context.beginPath();
    this.#points.forEach((point, i) => {
      const x = point[0] * xScale;
      const y = point[1] * yScale;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.fill();
  }
}

export { MaskEllipse, MaskRectangle, MaskPolygon };
