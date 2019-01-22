import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';

import { card as c } from './theme';

const CardBody = styled.div`
  margin: 0.5rem;
  border: ${c.border};
  border-radius: ${c.brRadius};
  width: 250px;
  background-color: ${c.bg};
  height: max-content;
  display: flex;
  flex-direction: column;

  transition: border-color ${c.transition};
  border-color: ${props => c.getDragBr(props)};

  &:hover {
    border-color: ${c.brColorHover};
  }
`;

const Title = styled.h3`
  position: relative;
  padding: 0.5rem;

  &:hover button {
    display: inline;
  }
`;

// Hide unless hovering on title
const TitleButton = styled.button`
  display: none;
  position: absolute;
  right: 0.5rem;

  &:first-of-type {
    right: 3rem;
  }
`;

const ItemsContainer = styled.div`
  padding: 0.5rem;
  background-color: ${props => (props.isDraggingOver ? c.bgDragOver : 'inherit')};
  transition: background-color ${c.transition};
  flex: 50px 1 1;
`;

export class Card extends Component {
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
                <button type="submit">Set</button>
              </form>
            ) : (
              <Title {...provided.dragHandleProps}>
                {title} <TitleButton onClick={toggleTitleForm}>Edit</TitleButton>
                <TitleButton onClick={() => deleteCard(id)}>D</TitleButton>
              </Title>
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
              <form onSubmit={submitNewItem}>
                <textarea type="text" name="newItemText" value={newItemText} onChange={handleChange} />
                <button type="submit">Add</button>
              </form>
            ) : (
              <>
                <button onClick={toggleAddMode}>Add item</button>
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
