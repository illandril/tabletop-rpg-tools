/* SPDX-License-Identifier: MIT */

import { BasicElement } from './basic-element.js';
class Rectangle extends BasicElement {
  constructor(width, height) {
    super('rect');
    this.element.setAttribute('width', ''+width);
    this.element.setAttribute('height', ''+height);
  }

  set x(x) {
    this.element.setAttribute('x', ''+x);
  }

  set y(y) {
    this.element.setAttribute('y', ''+y);
  }

  set rx(rx) {
    this.element.setAttribute('rx', ''+rx);
  }

  set horizontalCornerRadius(rx) {
    this.rx = rx;
  }

  set ry(ry) {
    this.element.setAttribute('ry', ''+ry);
  }

  set verticalCornerRadius(ry) {
    this.ry = ry;
  }
}

export { Rectangle };
