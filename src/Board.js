import React, { Component } from 'react';
import Card from './Card';
import data from './dummyData';

export class Board extends Component {
  state = data;

  render() {
    return (
      <>
        {this.state.cards.map(card => {
          const items = card.itemIds.map(id => this.state.items[id]);
          return <Card key={card.id} {...card} items={items} />;
        })}
      </>
    );
  }
}

export default Board;
