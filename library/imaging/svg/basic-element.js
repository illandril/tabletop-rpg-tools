/* SPDX-License-Identifier: MIT */

const ID_PREFIX = 'e';
let nextID = 1;

export default class BasicElement {
  _PRIVATE_element;
  _PRIVATE_id = null;
  constructor(elementName) {
    this._PRIVATE_element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
  }

  get element() {
    return this._PRIVATE_element;
  }

  get id() {
    if (this._PRIVATE_id === null) {
      this._PRIVATE_id = ID_PREFIX + nextID++;
      this.element.setAttribute('id', this._PRIVATE_id);
    }
    return this._PRIVATE_id;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  set stroke(stroke) {
    this.element.setAttribute('stroke', stroke);
  }

  set strokeWidth(strokeWidth) {
    this.element.setAttribute('stroke-width', '' + strokeWidth);
  }

  set strokeOpacity(strokeOpacity) {
    this.element.setAttribute('stroke-opacity', '' + strokeOpacity);
  }

  set fill(fill) {
    this.element.setAttribute('fill', fill);
  }

  set fillOpacity(fillOpacity) {
    this.element.setAttribute('fill-opacity', '' + fillOpacity);
  }

  translate(x, optY) {
    let translateTransform = 'translate(' + x;
    if (typeof optY == 'number') {
      translateTransform += ',' + optY;
    }
    translateTransform += ')';
    addTransform(this.element, translateTransform);
  }

  rotate(degrees, optOriginX, optOriginY) {
    let rotateTransform = 'rotate(' + degrees;
    if (typeof optOriginX == 'number' && typeof optOriginY == 'number') {
      rotateTransform += ',' + optOriginX + ',' + optOriginY;
    }
    rotateTransform += ')';
    addTransform(this.element, rotateTransform);
  }

  skewX(degrees) {
    addTransform(this.element, 'skewX(' + degrees + ')');
  }

  skewY(degrees) {
    addTransform(this.element, 'skewY(' + degrees + ')');
  }
}

function addTransform(element, transform) {
  const oldTransform = element.getAttribute('transform');
  if (oldTransform) {
    element.setAttribute('transform', oldTransform + ' ' + transform);
  } else {
    element.setAttribute('transform', transform);
  }
}
