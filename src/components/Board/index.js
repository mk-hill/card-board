import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import swal from 'sweetalert';
import { Trail, Transition } from 'react-spring';

import Icon from '../Icon';
import BoardWrapper from './BoardWrapper';
import Modal from '../Modal';
import { CardsContainer, AddCardButton, AddCardForm, PureCard as Card } from './elements';

import { BoardData as Data } from '../../data';

const dummyData = Data.generateStarter();

class Board extends Component {
  constructor(props) {
    super(props);

    const id = this.props.id ? this.props.id : dummyData.id;

    const storedData = localStorage.getItem(id);

    const data = storedData ? JSON.parse(storedData) : dummyData;
    // if (storedData) {
    //   data = JSON.parse(storedData);
    // } else {
    //   data = dummyData;
    // }

    this.state = {
      ...data,
      addingCard: false,
      newCardTitle: '',
      editingItem: false,
    };
  }

  // componentWillMount = () => {
  // };

  componentDidMount = () => {
    document.addEventListener('keydown', this.cancelInputOnEsc, true);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.cancelInputOnEsc, true);
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.updateLocalStorage(); // Update local storage on each change
  };

  // Cancel edit state and wipe input value on escape keypress
  cancelInputOnEsc = e => {
    if (e.key === 'Escape') {
      this.setState({
        addingCard: false,
        newCardTitle: '',
        editingItem: false,
        itemBeingEdited: null,
      });
    }
  };

  toggleEditingItem = () => {
    this.setState(prevState => ({ editingItem: !prevState.editingItem }));
  };

  openItemForm = itemId => {
    const itemBeingEdited = this.state.items[itemId];
    this.setState({ editingItem: true, itemBeingEdited });
  };

  updateLocalStorage = () => {
    const { id, title, items, cards, cardOrder } = this.state;
    localStorage.setItem(id, JSON.stringify({ id, title, items, cards, cardOrder }));
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
    const newItem = dummyData.addItem(cardId, text);

    const newCardItems = [...card.itemIds, newItem.id];

    this.setState({
      items: { ...items, [newItem.id]: newItem },
      cards: { ...cards, [cardId]: { ...card, itemIds: newCardItems } },
    });
  };

  // Change existing item's content
  updateItem = (id, newContent) => {
    const { items } = this.state;
    const { text, description } = newContent;

    // If item hasn't been changed or no text provided, return
    if (!text || (items[id].text === text && items[id].description === description)) {
      return;
    }

    this.setState(() => ({
      editingItem: false,
      items: { ...items, [id]: { ...items[id], ...newContent } },
    }));
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

    const newCard = dummyData.addCard(newCardTitle);

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

  deleteCardCheck = cardId => {
    const itemsInCard = this.state.cards[cardId].itemIds.length;
    if (itemsInCard) {
      swal({
        title: 'Are you sure?',
        text: `${itemsInCard} ${itemsInCard > 1 ? 'items' : 'item'} in this card will be deleted as well.`,
        icon: 'warning',
        buttons: true,
        // dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          swal(`Deleted "${this.state.cards[cardId].title}" and its contents.`, {
            icon: 'success',
          });
          this.deleteCard(cardId);
        } else {
          // swal('Deletion canceled');
        }
      });
    } else {
      this.deleteCard(cardId);
    }
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
    const { cards, items, cardOrder, addingCard, editingItem, itemBeingEdited, title } = this.state;
    return (
      <BoardWrapper title={title}>
        {editingItem ? (
          <Modal toggleOpen={this.toggleEditingItem} item={itemBeingEdited} saveChanges={this.updateItem} />
        ) : null}
        <DragDropContext
          onDragEnd={this.handleDrop}
          // onDragStart={this.testDragStart}
          // onDragUpdate={this.testDragUpdate}
        >
          {/* Cards move horizontally within board, items move vertically within card(s) */}
          <Droppable droppableId="Board" direction="horizontal" type="card">
            {provided => (
              <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
                <Trail
                  items={cardOrder}
                  keys={cardId => cardId}
                  // delay="200"
                  from={{ transform: 'translate3d(0,-200px,0)', opacity: 0 }}
                  to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}
                >
                  {cardId => trailProps => {
                    return (
                      <Card
                        trailProps={trailProps}
                        key={cardId}
                        card={cards[cardId]}
                        items={items}
                        index={cardOrder.indexOf(cardId)}
                        editItem={this.openItemForm}
                        addItem={this.addItem}
                        deleteItem={this.deleteItem}
                        updateTitle={this.updateCard}
                        deleteCard={this.deleteCardCheck}
                      />
                    );
                  }}
                </Trail>
                {provided.placeholder}
                <Transition
                  items={addingCard}
                  from={{ opacity: 0.1 }}
                  enter={{ opacity: 1 }}
                  leave={{ display: 'none' }}
                >
                  {addingCard =>
                    addingCard
                      ? ({ opacity, display }) => (
                          <AddCardForm style={{ opacity, display }} onSubmit={this.addCard}>
                            Enter card title:
                            <input
                              autoFocus
                              type="text"
                              value={this.state.newCardTitle}
                              onChange={e => this.setState({ newCardTitle: e.target.value })}
                            />
                            <label>
                              <input type="submit" style={{ display: 'none' }} />
                              <Icon icon="check" title="Submit" />
                            </label>
                            <Icon
                              id="cancelNewCard"
                              title="Cancel"
                              onClick={() => {
                                // Wipe input from state after closing form
                                this.setState(prev => ({ addingCard: !prev.addingCard, newCardTitle: '' }));
                              }}
                            />
                          </AddCardForm>
                        )
                      : ({ opacity, display }) => (
                          <AddCardButton
                            style={{ opacity, display }}
                            onClick={() => {
                              this.setState(prev => ({ addingCard: !prev.addingCard }));
                            }}
                          >
                            <Icon icon="squaredPlus" />
                            Add Card
                          </AddCardButton>
                        )
                  }
                </Transition>
              </CardsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </BoardWrapper>
    );
  }
}

export default Board;
