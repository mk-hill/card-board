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

  addItem(cardId, text, description, letReactHandleState = true) {
    const item = new ItemData(text, description);
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
    const data = new BoardData('Your Cardboard', true);
    const cards = ['Welcome', 'Moving things', 'Drag me from my title!'].map(title => data.addCard(title, false));

    const addItemToCard = (cardIndex, [text, description]) => {
      data.addItem(cards[cardIndex].id, text, description, false);
    };

    const welcomeItems = [
      [
        'Welcome to [Cardboard](https://github.com/mk-hill/card-board)!',
        'Use it to organize your thoughts, plans, and anything else you have in mind.',
      ],
      [
        'Cardboard was inspired by [Trello](https://trello.com/).',
        'Feel free to check it out for a more professional solution. Or stick around for the adventure! (and possibly the occasional bug?)',
      ],
      [
        'Double click an item to view its details. Try this one!',
        "Click any of the fields here to edit its contents. Once you're done, click the button below to save your changes.",
      ],
    ];

    welcomeItems.forEach(item => addItemToCard(0, item));

    const moveItems = [
      ['Check out the items below for more on how to move cards and items.', 'The items *below* this one.'],
      [
        'You can drag & drop...',
        'Items can be dragged from anywhere on their body. Cards can only be dragged from their title bars.',
      ],
      [
        'Or use your keyboard.',
        "Press 'Tab' to cycle through items and cards, 'Space' to lift your selection, arrow keys to move it around, and 'Space' to place it.",
      ],
      [
        'Using a touchscreen? That works too!',
        'Simply press down on the item or card title until its color changes, and drag it to your desired location.',
      ],
    ];

    moveItems.forEach(item => addItemToCard(1, item));

    const howToItems = [
      [
        "Add as many items and cards as you'd like!",
        'Boards and cards can scroll infinitely... Or as far as your device can handle.',
      ],
      [
        'More options will appear as you hover over items and card title bars.',
        'Items and cards can be deleted directly from the main board view. Cardboard will confirm your intent before deleting a card with items in it.',
      ],
      [
        'Use inline [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links) syntax to add links to your items!',
        'Same goes for your item [descriptions](https://github.com/mk-hill/card-board).',
      ],
      [
        "If you don't want Cardboard to format your text, just ask nicely.",
        `Adding "Please don't format me!" to the end of your text usually does the trick: [link which would](normally be formatted) Please don't format me!`,
      ],
    ];

    howToItems.forEach(item => addItemToCard(2, item));
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
