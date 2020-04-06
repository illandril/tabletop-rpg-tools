/* SPDX-License-Identifier: MIT */

export default class DoorType {
  _PRIVATE_key;
  _PRIVATE_name;
  _PRIVATE_icon;
  constructor(key, name, icon) {
    this._PRIVATE_key = key;
    this._PRIVATE_name = name;
    this._PRIVATE_icon = icon;
    Object.freeze(this);
  }
  get key() {
    return this._PRIVATE_key;
  }
  get name() {
    return this._PRIVATE_name;
  }
  get icon() {
    return this._PRIVATE_icon;
  }
}
