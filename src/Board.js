import React, { Component, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Card from './Card';
import Icon from './Icon';

import { BoardData as Data } from './data';

const CardsContainer = styled.div`
  background: linear-gradient(
    114.02807334855652deg,
    rgba(226, 235, 239, 1) 4.775390625%,
    rgba(208, 218, 224, 1) 98.13476562499999%
  );
  display: flex;
  min-width: max-content;
  height: 100vh;
`;

const AddCardButton = styled.div`
  height: 5rem;
  width: 10rem;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
    background-color: #fff;
  }
`;

const data = Data.generateDummy();

export class Board extends Component {
  state = {
    ...data,
    addingCard: false,
    newCardTitle: '',
  };

  testDragStart = () => {
    document.body.style.transition = 'background-color 0.2s ease';
    document.body.style.color = 'orange';
  };

  testDragUpdate = update => {
    const { destination } = update;
    // Set opacity to percentage based on item index
    const opacity = destination ? destination.index / Object.keys(this.state.items).length : 0;
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
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
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

  // Reorder cards on board
  reorderCards = ({ from, to, id }) => {
    // Create new copy and modify cardOrder
    const newCardOrder = [...this.state.cardOrder];
    newCardOrder.splice(from, 1);
    newCardOrder.splice(to, 0, id);
    this.setState({ cardOrder: newCardOrder });
  };

  // Add item to specified card
  addItem = (cardId, text) => {
    if (!text) {
      return;
    }
    const { cards, items } = this.state;
    const card = cards[cardId];
    const newItem = data.addItem(cardId, text);

    const newCardItems = [...card.itemIds, newItem.id];

    this.setState({
      items: { ...items, [newItem.id]: newItem },
      cards: { ...cards, [cardId]: { ...card, itemIds: newCardItems } },
    });
  };

  // Change existing item's content
  updateItem = (itemId, newContent) => {
    const { items } = this.state;

    if (!newContent || items[itemId].text === newContent) {
      return; // return if text hasn't been changed
    }

    this.setState({
      items: { ...items, [itemId]: { ...items[itemId], text: newContent } },
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

  addCard = e => {
    e.preventDefault();
    const { cards, cardOrder, newCardTitle } = this.state;

    if (!newCardTitle) {
      return;
    }

    const newCard = data.addCard(newCardTitle);

    this.setState({
      cards: {
        ...cards,
        [newCard.id]: newCard,
      },
      cardOrder: [...cardOrder, newCard.id],
      addingCard: false,
      newCardTitle: '',
    });
  };

  updateCard = (cardId, newTitle) => {
    const { cards } = this.state;

    if (cards[cardId].title === newTitle) {
      return; // return if title hasn't been changed
    }

    this.setState({
      cards: { ...cards, [cardId]: { ...cards[cardId], title: newTitle } },
    });
  };

  deleteCard = cardId => {
    const newCards = { ...this.state.cards };
    delete newCards[cardId];

    const newCardOrder = [...this.state.cardOrder].filter(id => id !== cardId);

    this.setState({
      cards: newCards,
      cardOrder: newCardOrder,
    });
  };

  render() {
    const { cards, items, cardOrder, addingCard } = this.state;
    return (
      <DragDropContext
        onDragEnd={this.handleDrop}
        // onDragStart={this.testDragStart}
        // onDragUpdate={this.testDragUpdate}
      >
        {/* Cards move horizontally within board, items move vertically within card(s) */}
        <Droppable droppableId="Board" direction="horizontal" type="card">
          {provided => (
            <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
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
                    updateTitle={this.updateCard}
                    deleteCard={this.deleteCard}
                  />
                );
              })}
              {provided.placeholder}
              {addingCard ? (
                <form onSubmit={this.addCard}>
                  <textarea
                    type="text"
                    value={this.state.newCardTitle}
                    onChange={e => this.setState({ newCardTitle: e.target.value })}
                  />
                  <label>
                    <input type="submit" style={{ display: 'none' }} />
                    <Icon icon="check" title="Submit" />
                  </label>
                </form>
              ) : (
                <AddCardButton
                  onClick={() => {
                    this.setState(prev => ({ addingCard: !prev.addingCard }));
                  }}
                >
                  <Icon icon="squaredPlus" />
                  Add Card
                </AddCardButton>
              )}
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
    return <Card key={card.id} items={cardItems} {...card} {...remainingProps} />;
  }
}
export default Board;
