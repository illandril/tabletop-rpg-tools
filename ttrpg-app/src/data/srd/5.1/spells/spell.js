/* Some content licensed under OPEN GAME LICENSE Version 1.0a */

export default class FifthEditionSpell {
  constructor(name, castingTime, range, components, duration, description) {
    this._PRIVATE_name = name;
    this._PRIVATE_castingTime = castingTime;
    this._PRIVATE_range = range;
    this._PRIVATE_components = components;
    this._PRIVATE_duration = duration;
    this._PRIVATE_description = description;
  }

  get name() {
    return this._PRIVATE_name;
  }

  get castingTime() {
    return this._PRIVATE_castingTime;
  }

  get range() {
    return this._PRIVATE_range;
  }

  get components() {
    return this._PRIVATE_components;
  }

  get duration() {
    return this._PRIVATE_duration;
  }

  get description() {
    return this._PRIVATE_description;
  }
}
