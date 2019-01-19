import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './Card';
import data from './dummyData';

export class Board extends Component {
  state = data;

  onDragEnd = dragResult => {
    console.log(dragResult);
    // Synchronously update state to reflect drag/drop result
    const { destination, source, draggableId } = dragResult;

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

    const targetCard = this.state.cards.find(
      card => card.id === source.droppableId
    );
    const newItemIds = [...targetCard.itemIds]; // Create copy

    newItemIds.splice(source.index, 1); // Remove dragged Item
    newItemIds.splice(destination.index, 0, draggableId); // Insert into target index

    targetCard.itemIds = newItemIds;

    // todo make readable
    this.setState({
      ...this.state,
      cards: [...this.state.cards].splice(
        this.state.cards.findIndex(card => card.id === destination.droppableId),
        1,
        targetCard
      ),
    });
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
