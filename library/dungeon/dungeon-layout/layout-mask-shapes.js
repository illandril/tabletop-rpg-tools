/* SPDX-License-Identifier: MIT */

class MaskEllipse {
  _PRIVATE_radiusX;
  _PRIVATE_radiusY;
  _PRIVATE_centerX;
  _PRIVATE_centerY;
  constructor(left, top, width, height) {
    this._PRIVATE_radiusX = width / 2;
    this._PRIVATE_radiusY = height / 2;
    this._PRIVATE_centerX = left + this._PRIVATE_radiusX;
    this._PRIVATE_centerY = top + this._PRIVATE_radiusY;
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    const centerX = this._PRIVATE_centerX * xScale;
    const centerY = this._PRIVATE_centerY * yScale;
    const radiusX = this._PRIVATE_radiusX * xScale;
    const radiusY = this._PRIVATE_radiusY * yScale;
    context.beginPath();
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.fill();
  }
}

class MaskRectangle {
  _PRIVATE_left;
  _PRIVATE_top;
  _PRIVATE_width;
  _PRIVATE_height;
  constructor(left, top, width, height) {
    this._PRIVATE_left = left;
    this._PRIVATE_top = top;
    this._PRIVATE_width = width;
    this._PRIVATE_height = height;
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    const left = this._PRIVATE_left * xScale;
    const top = this._PRIVATE_top * yScale;
    const width = this._PRIVATE_width * xScale;
    const height = this._PRIVATE_height * yScale;
    context.fillRect(left, top, width, height);
  }
}

class MaskPolygon {
  _PRIVATE_points;
  constructor(points) {
    this._PRIVATE_points = points;
    Object.freeze(this._PRIVATE_points);
    Object.freeze(this);
  }

  draw(context, xScale, yScale) {
    context.beginPath();
    this._PRIVATE_points.forEach((point, i) => {
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
