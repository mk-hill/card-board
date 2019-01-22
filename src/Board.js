import React, { Component, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import data from './Data/dummyData';
import ItemData from './Data/ItemData';

import Card from './Card';

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
  handleDrop = dragResult => {
    // document.body.style.color = 'inherit'; // undo testDragStart
    // document.body.style.backgroundColor = 'inherit'; // undo testDragUpdate

    const { destination, source, draggableId, type } = dragResult;

    if (!this.shouldHandleDrop(source, destination)) {
      return; // No changes were necessary
    }

    if (type === 'card') {
      return this.reorderCards({
        from: source.index,
        to: destination.index,
        id: draggableId,
      });
    }

    // * Defaulting to 'item' type, change if 3rd draggable type is introduced
    return this.rearrangeItems(source, destination, draggableId);
  };

  // Checks for whether or not changes were made/state should be updated on drop live here
  shouldHandleDrop = (source, destination) => {
    // Destination can be null if drag didn't result in a valid drop point
    if (!destination) {
      return false;
    }

    // source/destination ids & indexes will be same if location hasn't changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return false;
    }

    return true;
  };

  // Handle both reordering within same card and moving an item to a different card
  rearrangeItems = (source, destination, draggableId) => {
    const { cards } = this.state;
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

  reorderCards = ({ from, to, id }) => {
    // Create new copy and modify cardOrder
    const newCardOrder = [...this.state.cardOrder];
    newCardOrder.splice(from, 1);
    newCardOrder.splice(to, 0, id);
    this.setState({ cardOrder: newCardOrder });
  };

  updateItem = (itemId, newContent) => {
    const { items } = this.state;
    if (items[itemId] === newContent) {
      return; // return if text hasn't been changed
    }

    this.setState({
      items: { ...items, [itemId]: { ...items[itemId], text: newContent } },
    });
  };

  addItem = (cardId, text) => {
    if (!text) {
      return;
    }
    const { cards, items } = this.state;
    const card = cards[cardId];
    const newItem = new ItemData(text);

    const newCardItems = [...card.itemIds, newItem.id];

    this.setState({
      items: { ...items, [newItem.id]: newItem },
      cards: { ...cards, [cardId]: { ...card, itemIds: newCardItems } },
    });
  };

  deleteItem = (cardId, itemId, index) => {
    const { cards, items } = this.state;
    const card = cards[cardId];

    const newCardItems = [...card.itemIds];
    newCardItems.splice(index, 1);

    const newItems = { ...items };
    delete newItems[itemId];

    this.setState({
      items: newItems,
      cards: { ...cards, [cardId]: { ...card, itemIds: newCardItems } },
    });
  };

  render() {
    const { cards, items, cardOrder } = this.state;
    return (
      <DragDropContext
        onDragEnd={this.handleDrop}
        // onDragStart={this.testDragStart}
        // onDragUpdate={this.testDragUpdate}
      >
        {/* Cards move horizontally within board, items move vertically within card(s) */}
        <Droppable droppableId="Board" direction="horizontal" type="card">
          {provided => (
            <CardsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cardOrder.map((cardId, index) => {
                const card = cards[cardId];
                return (
                  <PureCard
                    key={cardId}
                    card={card}
                    items={items}
                    index={index}
                    updateItem={this.updateItem}
                    addItem={this.addItem}
                    deleteItem={this.deleteItem}
                  />
                );
              })}
              {provided.placeholder}
            </CardsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// Block render if props are unchanged (shallow)
class PureCard extends PureComponent {
  render() {
    const { card, items, ...remainingProps } = this.props;
    const cardItems = card.itemIds.map(id => items[id]);
    return (
      <Card key={card.id} items={cardItems} {...card} {...remainingProps} />
    );
  }
}
export default Board;
