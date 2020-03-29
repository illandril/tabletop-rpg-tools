/* SPDX-License-Identifier: MIT */

class DoorType {
  #key;
  #name;
  #icon;
  constructor(key, name, icon) {
    this.#key = key;
    this.#name = name;
    this.#icon = icon;
  }
  get key() { return this.#key; }
  get name() { return this.#name; }
  get icon() { return this.#icon; }
}

export { DoorType };
