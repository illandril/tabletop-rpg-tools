/* SPDX-License-Identifier: MIT */

import { BasicElement } from './basic-element.js';
import { Rectangle } from './rectangle.js';
import { Ellipse } from './ellipse.js';
import { Use } from './use.js';

class Layer extends BasicElement {
  constructor(elementName) {
    super(elementName);
  }

  addUse(otherElement) {
    const use = new Use(otherElement);
    this.element.appendChild(use.element);
    return use;
  }

  addGroup() {
    const group = new Group();
    this.element.appendChild(group.element);
    return group;
  }

  addRectangle(width, height) {
    const rect = new Rectangle(width, height);
    this.element.appendChild(rect.element);
    return rect;
  }

  addEllipse(radius, optRadiusY) {
    const ellipse = new Ellipse(radius, optRadiusY);
    this.element.appendChild(ellipse.element);
    return ellipse;
  }
}


class Group extends Layer {
  constructor() {
    super('g');
  }
}

export { Layer };
