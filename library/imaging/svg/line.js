/* SPDX-License-Identifier: MIT */

import BasicElement from './basic-element.js';
export default class Line extends BasicElement {
  constructor(x1, y1, x2, y2) {
    super('line');
    this.element.setAttribute('x1', '' + x1);
    this.element.setAttribute('y1', '' + y1);
    this.element.setAttribute('x2', '' + x2);
    this.element.setAttribute('y2', '' + y2);
  }
}
