const data = {
  items: {
    i120: { id: 'i120', text: 'You must construct additional pylons.' },
    i121: { id: 'i121', text: 'Hailing frequencies open.' },
    i122: { id: 'i122', text: 'Spawn more overlords.' },
    i123: { id: 'i123', text: 'Carrier has arrived.' },
    i124: { id: 'i124', text: 'asd' },
    i125: { id: 'i125', text: "Can't touch this." },
  },

  // Keep in array for order?
  cards: {
    c101: {
      id: 'c101',
      title: 'Quotes',
      itemIds: ['i120', 'i121', 'i122', 'i123'],
    },

    c102: {
      id: 'c102',
      title: 'Stuff',
      itemIds: ['i124', 'i125'],
    },

    c103: {
      id: 'c103',
      title: 'Test',
      itemIds: [],
    },
  },

  // Moved order to separate array for easier access
  cardOrder: ['c101', 'c102', 'c103'],
};

export default data;
