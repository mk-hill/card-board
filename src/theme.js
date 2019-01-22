const color = {
  // Light
  l1: '#fff',
  l2: '#ddd',
  l3: '#eee',
  // Medium
  m1: '#999',
  //Dark
  d1: '#f9a255',
  d2: '#d5fffd',
  d3: '#85a6d8',
  d4: '#FDF7BB',
};

const [c1, c2, c3, c4, c5] = ['#f9a255', '#d5fffd', '#85a6d8', '#FDF7BB', '#fff'];

const common = {
  _brWidth: '1px', // Border width
  brRadius: '2px', // Border radius
  transition: '.2s ease',
};

export const item = {
  ...common,
  bg: c5, //'#fff', // Default background color
  bgLocked: c1, //'#999', // Background color for items locked in place
  bgDrag: c3, //'#ddd', /// Background color during drag
  brColor: c4, //'#eee', // Default border color
  brColorHover: c1, //'#000', // Border color during hover
  brColorDrag: c1, //'red', // Border color while being dragged
  brColorFocus: c1, //'#123', // Border color during focus

  get border() {
    return `${common._brWidth} solid ${this.brColor}`;
  },

  // Return appropriate background color based on drag status
  getDragBg({ isDragging, isDragDisabled }) {
    return isDragDisabled ? this.bgLocked : isDragging ? this.bgDrag : this.bg;
  },

  // Border color determined by drag status
  getDragBr({ isDragging }) {
    return isDragging ? this.brColorDrag : this.brColor;
  },
};

export const card = {
  ...common,
  bg: c5, //'#fff', // Default background color
  bgDragOver: c2, //'#ddd', /// Background color while dragging an item over card
  brColor: c4, //'#ddd', // Default border color
  brColorHover: c1, //'#000', // Border color during hover
  brColorDrag: c1, //'red', // Border color during card drag

  get border() {
    return `${common._brWidth} solid ${this.brColor}`;
  },

  // Border color determined by drag status
  getDragBr({ isDragging }) {
    return isDragging ? this.brColorDrag : this.brColor;
  },
};
