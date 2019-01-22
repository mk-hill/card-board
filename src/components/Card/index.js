import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Item from '../Item';
import Icon from '../Icon';
import { CardBody, CardTitle, ItemsContainer, SubmitForm, AddButton } from './elements';

class Card extends Component {
  state = {
    editingTitle: false,
    title: '',
    addingItem: false,
    newItemText: '',
  };

  componentDidMount() {
    if (!this.state.title) {
      this.setState({ title: this.props.title });
    }
  }

  toggleTitleForm = () => {
    this.setState(prevState => ({
      editingTitle: !prevState.editingTitle,
    }));
  };

  submitNewTitle = e => {
    e.preventDefault();
    this.props.updateTitle(this.props.id, this.state.title);
    this.toggleTitleForm();
  };

  toggleNewItemForm = () => {
    this.setState(prevState => ({
      addingItem: !prevState.addingItem,
    }));
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNewItem = e => {
    e.preventDefault();
    this.props.addItem(this.props.id, this.state.newItemText);
    this.toggleNewItemForm();
    this.setState({ newItemText: '' }); // clear input for future additions
  };

  render() {
    const { id, index, deleteCard, ...itemProps } = this.props;
    const { addingItem, newItemText, editingTitle, title } = this.state;
    const {
      handleInputChange: handleChange,
      toggleNewItemForm: toggleAddMode,
      submitNewItem,
      toggleTitleForm,
      submitNewTitle,
    } = this;
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <CardBody {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
            {/* Cards can only be dragged from their title */}
            {editingTitle ? (
              <form onSubmit={submitNewTitle}>
                <input type="text" name="title" value={title} onChange={handleChange} />
                <label>
                  <input type="submit" style={{ display: 'none' }} />
                  <Icon icon="check" title="Submit" />
                </label>
              </form>
            ) : (
              <CardTitle {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
                {title} <Icon icon="pencil" onClick={toggleTitleForm} title="Edit card title" />
                <Icon icon="squaredCross" onClick={() => deleteCard(id)} title="Delete card" />
              </CardTitle>
            )}

            {/* Droppable requires unique droppableId prop, uses render props pattern
            Expects its child to be a func which returns a component
            Optionally can specify type of draggable it accepts */}
            <Droppable droppableId={id} type="item">
              {/* provided.droppableProps provided to the droppable component
              can use styled component ref used to provide dom node to lib
              placeholder needs to be added as a child of the droppable component
              default direction = vertical
              snapshot provided as in draggable */}
              {(provided, snapshot) => (
                <ItemsContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ItemList {...itemProps} cardId={id} />
                  {provided.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
            {addingItem ? (
              <SubmitForm onSubmit={submitNewItem}>
                <input
                  type="text"
                  name="newItemText"
                  value={newItemText}
                  onChange={handleChange}
                  placeholder="Enter item text"
                />
                <label>
                  <input type="submit" style={{ display: 'none' }} />
                  <Icon id="submitItem" icon="check" title="Submit" />
                </label>
                <Icon
                  id="cancelItem"
                  title="Cancel"
                  onClick={() => {
                    toggleAddMode();
                    // Wipe input from state after closing form
                    this.setState({ newItemText: '' });
                  }}
                />
              </SubmitForm>
            ) : (
              <>
                <AddButton onClick={toggleAddMode} title="Add a new item to your card">
                  <Icon icon="plus" />
                  Add item
                </AddButton>
              </>
            )}
          </CardBody>
        )}
      </Draggable>
    );
  }
}

// Prevent stationary items from rerendering while another is being dragged
class ItemList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  render() {
    // No need to pass item Ids and addItem()
    const { items, itemIds, addItem, ...remainingProps } = this.props;
    return items.map((item, index) => <Item key={item.id} index={index} {...item} {...remainingProps} />);
  }
}

export default Card;
