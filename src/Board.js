import React, { Component } from 'react';
import Card from './Card';
import data from './dummyData';

export class Board extends Component {
  state = data;

  render() {
    return (
      <>
        {this.state.cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </>
    );
  }
}

export default Board;
