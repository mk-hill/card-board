import CardData from './CardData';
import ItemData from './ItemData';

export default class BoardData {
  constructor(title = 'Enter board title') {
    this.title = title;
    this.items = {};
    this.cards = {};
    this.cardOrder = [];
  }

  addCard(title, letReactHandleState = true) {
    const card = new CardData(title);
    if (!letReactHandleState) {
      this.cards[card.id] = card;
      this.cardOrder.push(card.id);
    }
    return card;
  }

  addItem(cardId, text, letReactHandleState = true) {
    const item = new ItemData(text);
    if (!letReactHandleState) {
      this.items[item.id] = item;
      this.cards[cardId].itemIds.push(item.id);
    }
    return item;
  }

  static generateDummy(minCards = 2, minItems = 5, variance = 3) {
    const data = new BoardData('Dummy Data');
    const v = random.numFromZero(variance);
    for (let c = 0; c < minCards + v; c++) {
      let nextTitle = random.card;
      data.addCard(nextTitle, false);
    }

    for (let i = 0; i < minItems + v; i++) {
      data.addItem(
        data.cardOrder[random.numFromZero(data.cardOrder.length)],
        random.item,
        false
      );
    }
    return data;
  }
}

const random = {
  numFromZero(stayBelow) {
    return Math.floor(Math.random() * stayBelow);
  },

  get card() {
    const i = this.numFromZero(this.cardTitles.length);
    return this.cardTitles.splice(i, 1);
  },

  get item() {
    const i = this.numFromZero(this.itemTitles.length);
    return this.itemTitles.splice(i, 1);
  },

  cardTitles: [
    'Stuff',
    'Other stuff',
    'Another Card',
    'Hello World',
    'Aliens',
    'Quotes',
  ],

  itemTitles: [
    'Hailing frequencies open.',
    'Spawn more overlords.',
    'Nuclear launch detected.',
    'You must construct additional Pylons.',
    'Carrier has arrived.',
    'Not enough minerals.',
    'You require more vespene gas.',
  ],
};
