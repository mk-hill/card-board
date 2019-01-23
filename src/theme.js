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

const [c1, c2, c3, c4, c5, c6] = ['#280C10', '#283F5E', '#556F93', '#93A7C4', '#A8BBD7', '#ECF0F6']; // 0C1728
// ['#f9a255', '#d5fffd', '#85a6d8', '#FDF7BB', '#fff'];

const common = {
  _brWidth: '2px', // Border width
  brRadius: '5px', // Border radius
  transition: '.2s ease',
};

export const item = {
  ...common,

  color: c1, // Text color
  bg: c6, //'#fff', // Default background color
  bgLocked: c4, //'#999', // Background color for items locked in place
  bgDrag: c5, //'#ddd', /// Background color during drag
  brColor: c4, //'#eee', // Default border color
  brColorHover: c3, //'#000', // Border color during hover
  brColorDrag: c3, //'red', // Border color while being dragged
  brColorFocus: c3, //'#123', // Border color during focus

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
  color: c1,
  bg: c6, //'#fff', // Default background color
  bgDragOver: c4, //'#ddd', /// Background color while dragging an item over card
  brColor: c5, //'#ddd', // Default border color
  brColorHover: c4, //'#000', // Border color during hover
  brColorDrag: c4, //'red', // Border color during card drag

  get border() {
    return `${common._brWidth} solid ${this.brColor}`;
  },

  // Border color determined by drag status
  getDragBr({ isDragging }) {
    return isDragging ? this.brColorDrag : this.brColor;
  },
};
