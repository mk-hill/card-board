import uuid from 'uuid/v4';
import CardData from './CardData';
import ItemData from './ItemData';

export default class BoardData {
  constructor(title = 'Enter board title', dummy = false) {
    this.id = dummy ? 'starterBoard' : uuid();
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

  static generateDummy(minCards = 2, minItems = 15, variance = 3) {
    const data = new BoardData('Random Data Board', true);
    const v = random.numFromZero(variance);
    for (let c = 0; c < minCards + v; c++) {
      let nextTitle = random.card;
      data.addCard(nextTitle, false);
    }

    for (let i = 0; i < minItems + v; i++) {
      data.addItem(data.cardOrder[random.numFromZero(data.cardOrder.length)], random.item, false);
    }
    return data;
  }

  static generateStarter() {
    const data = new BoardData('Your First Board', true);
    const cards = ['Welcome', 'Moving things', 'Drag me from my title!'].map(title => data.addCard(title, false));
    const welcomeItems = [
      'Welcome to cardboard!',
      'Organize your thoughts, plans, and anything else you have in mind.',
      "You're welcome to use cardboard, though feel free to check out [Trello](https://trello.com/) (cardboard's inspiration, to say the least) for a more professional solution.",
    ];
    welcomeItems.forEach(text => data.addItem(cards[0].id, text, false));

    const moveItems = [
      'Drag & drop or use your keyboard to move cards and items.',
      'Drag items from anywhere on their body.',
      'To drag and drop using a touchscreen, simply press down on the item or card title until its color changes, and drag it to your desired location.',
      'For keyboard usage: select your target with Tab, lift it with Space, move it with your arrow keys and place it down with Space again.',
    ];
    moveItems.forEach(text => data.addItem(cards[1].id, text, false));

    const howToItems = [
      "Add as many items and cards as you'd like, cardboard will let you scroll through them.",
      'Double click an item to edit it.',
      'Further options will appear as you hover over items or card title bars.',
      'You can also links to your items using inline [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links) syntax!',
      "[text you want to appear](target url) Please don't format me!",
      'If you dont want cardboard to format your item title, just ask it nicely.',
      // `Adding "Please don't format me!" to the end of your title usually does the trick.`,
    ];

    howToItems.forEach(text => data.addItem(cards[2].id, text, false));
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

  cardTitles: ['Stuff', 'Other stuff', 'Another Card', 'Hello World', 'Aliens', 'Card title', 'A list of things'],

  itemTitles: [
    'Hailing frequencies open.',
    'Spawn more overlords.',
    '[Nuclear](https://www.google.com) launch [detected](https://www.google.com).',
    'You must construct additional Pylons.',
    'Carrier has arrived.',
    'Not enough minerals.',
    'You require more vespene gas.',
    'Some people [juggle](https://www.google.com) geese.',
    'Curse your sudden but inevitable betrayal.',
    "Need longer text to test scrolling. [I'm a link to Google.](https://www.google.com)",
    'Or just more items.',
    'Running out of ideas.',
    'Some placeholder text',
    'This is an item, not a card.',
    'A architecto magnam sed beatae maxime adipisci deserunt harum dolorum, [labore](https://www.google.com) inventore quaerat et rem, officia necessitatibus cumque ex aliquam. Iusto, atque.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore incidunt totam vero, libero nihil earum.',
    'Fugit quae, earum dicta, soluta voluptatum quod iste [assumenda](https://www.google.com) neque illum quos quaerat nulla tempore quas?',
    'Et excepturi [amet](https://www.google.com) architecto [recusandae quaerat provident](https://www.google.com), vel illo repellendus dolores.',
    'Ullam cupiditate sint animi sunt atque nemo molestias inventore in iusto adipisci distinctio dolore saepe, quia commodi repellat?',
  ],
};
