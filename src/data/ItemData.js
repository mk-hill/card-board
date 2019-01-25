import uuid from 'uuid/v4';

export default class ItemData {
  constructor(text = 'Enter title') {
    this.id = uuid();
    this.text = text;
    this.isLocked = false;
    this.content = null;
  }
}
