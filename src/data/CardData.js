import uuid from 'uuid/v4';

export default class CardData {
  constructor(title = 'Enter card title') {
    this.id = uuid();
    this.title = title;
    this.itemIds = [];
  }
}
