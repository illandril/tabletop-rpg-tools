/* SPDX-License-Identifier: MIT */

import { BasicElement } from './basic-element.js';
class Use extends BasicElement {
  constructor(otherElement) {
    super('use');
    this.element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + otherElement.id);
  }

  set x(x) {
    this.element.setAttribute('x', x);
  }

  set y(y) {
    this.element.setAttribute('y', y);
  }

  set width(width) {
    this.element.setAttribute('width', width);
  }

  set height(height) {
    this.element.setAttribute('height', height);
  }
}

export { Use };
