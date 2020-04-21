/* SPDX-License-Identifier: MIT */

import Layer from './layer.js';

function assertPositiveInteger(name, value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw name + ' must be a positive integer';
  }
}

export default class SVG extends Layer {
  _PRIVATE_styleElem = null;

  constructor(width, height) {
    super('svg');
    assertPositiveInteger('width', width);
    assertPositiveInteger('height', height);
    this.element.setAttribute('width', width + 'px');
    this.element.setAttribute('height', height + 'px');
    this.element.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
  }

  addStyle(style) {
    if (this._PRIVATE_styleElem === null) {
      this._PRIVATE_styleElem = document.createElement('style');
      this.element.appendChild(this._PRIVATE_styleElem);
    }
    this._PRIVATE_styleElem.appendChild(document.createTextNode(style));
  }

  set width(width) {
    assertPositiveInteger('width', width);
    this.element.setAttribute('width', width + 'px');
  }

  set height(height) {
    assertPositiveInteger('height', height);
    this.element.setAttribute('height', height + 'px');
  }

  get downloadURL() {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(this.element);

    if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  }
}
