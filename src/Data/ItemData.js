import uuid from 'uuid/v4';

export default class ItemData {
  constructor(text = 'Enter desired text') {
    this.id = uuid();
    this.text = text;
    this.isLocked = false;
  }
}
