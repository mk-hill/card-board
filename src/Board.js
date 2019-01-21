import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './Card';
import data from './dummyData';

export class Board extends Component {
  state = data;

  // Synchronously update state to reflect drag/drop result
  onDragEnd = dragResult => {
    const { destination, source, draggableId } = dragResult;
    const { cards } = this.state;

    // Destination can be null if drag didn't result in a valid drop point
    if (!destination) {
      return;
    }

    // Check if the location changed, source/destination ids/indexes will be same otherwise
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCard = cards[source.droppableId];
    const targetCard = cards[destination.droppableId];

    // Create new copies of each card's itemIds array with dragged item filtered out
    const sourceItems = sourceCard.itemIds.filter(id => id !== draggableId);
    const targetItems = targetCard.itemIds.filter(id => id !== draggableId);

    // Insert dragged item into the correct index on target card
    targetItems.splice(destination.index, 0, draggableId);

    this.setState({
      // ...this.state,
      cards: {
        ...cards,
        [source.droppableId]: { ...sourceCard, itemIds: sourceItems },
        [destination.droppableId]: { ...targetCard, itemIds: targetItems },
      },
    });
  };

  render() {
    const { cards, items, cardOrder } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {cardOrder.map(cardId => {
          const card = cards[cardId];
          const cardItems = card.itemIds.map(id => items[id]);
          return <Card key={cardId} {...card} items={cardItems} />;
        })}
      </DragDropContext>
    );
  }
}

export default Board;
