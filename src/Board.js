import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './Card';
import data from './dummyData';

export class Board extends Component {
  state = data;

  onDragEnd = result => {
    // Synchronously update state to reflect drag/drop result
  };

  render() {
    const { cards, items } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {cards.map(card => {
          const cardItems = card.itemIds.map(id => items[id]);
          return <Card key={card.id} {...card} items={cardItems} />;
        })}
      </DragDropContext>
    );
  }
}

export default Board;
