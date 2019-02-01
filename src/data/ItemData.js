import uuid from 'uuid/v4';

export default class ItemData {
  constructor(text = 'Enter item text', description = '') {
    this.id = uuid();
    this.text = text;
    this.isLocked = false;
    this.description = description;
  }
}
