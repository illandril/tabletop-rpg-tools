/* SPDX-License-Identifier: MIT */

import BasicElement from './basic-element.js';
export default class Ellipse extends BasicElement {
  constructor(radius, optRadiusY) {
    super('ellipse');
    this.radiusX = radius;
    this.radiusY = optRadiusY || radius;
  }

  set radius(radius) {
    this.radiusX = radius;
    this.radiusY = radius;
  }

  set radiusX(radiusX) {
    this.element.setAttribute('rx', '' + radiusX);
  }

  set radiusY(radiusY) {
    this.element.setAttribute('ry', '' + radiusY);
  }

  set centerX(centerX) {
    this.element.setAttribute('cx', '' + centerX);
  }

  set centerY(centerY) {
    this.element.setAttribute('cy', '' + centerY);
  }
}
