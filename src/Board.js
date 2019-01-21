import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Card from './Card';
import data from './dummyData';

const CardsContainer = styled.div`
  display: flex;
`;

export class Board extends Component {
  state = data;

  testDragStart = () => {
    document.body.style.transition = 'background-color 0.2s ease';
    document.body.style.color = 'orange';
  };

  testDragUpdate = update => {
    const { destination } = update;
    // Set opacity to percentage based on item index
    const opacity = destination
      ? destination.index / Object.keys(this.state.items).length
      : 0;
    document.body.style.backgroundColor = `rgba(123, 223, 89, ${opacity})`;
  };

  // Synchronously update state to reflect drag/drop result
  handlePlacement = dragResult => {
    document.body.style.color = 'inherit'; // undo testDragStart
    document.body.style.backgroundColor = 'inherit'; // undo testDragUpdate

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
      <DragDropContext
        onDragEnd={this.handlePlacement}
        onDragStart={this.testDragStart}
        onDragUpdate={this.testDragUpdate}
      >
        <CardsContainer>
          {cardOrder.map(cardId => {
            const card = cards[cardId];
            const cardItems = card.itemIds.map(id => items[id]);
            return <Card key={cardId} {...card} items={cardItems} />;
          })}
        </CardsContainer>
      </DragDropContext>
    );
  }
}

export default Board;
