import uuid from 'uuid/v4';

export default class ItemData {
  constructor(text = 'Enter item text', description = '', isDummy = false) {
    this.id = uuid();
    this.text = text;
    this.isLocked = false;
    this.description = description;

    // To be used when determining form behavior
    // No need to add property unless true?
    if (isDummy === true) {
      this.isDummy = isDummy;
    }
  }
}
