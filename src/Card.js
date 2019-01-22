import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';

const CardBody = styled.div`
  margin: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  width: 250px;
  background-color: #fff;
  height: max-content;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 0.5rem;
`;

const ItemsContainer = styled.div`
  padding: 0.5rem;
  background-color: ${props => (props.isDraggingOver ? '#ddd' : 'inherit')};
  transition: background-color 0.2s ease;
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
        {provided => (
          <CardBody {...provided.draggableProps} ref={provided.innerRef}>
            {/* Cards can only be dragged from their title */}
            {editingTitle ? (
              <form onSubmit={submitNewTitle}>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
                <button type="submit">Set</button>
              </form>
            ) : (
              <Title {...provided.dragHandleProps}>
                {title} <button onClick={toggleTitleForm}>E</button>
                <button onClick={() => deleteCard(id)}>D</button>
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
                <textarea
                  type="text"
                  name="newItemText"
                  value={newItemText}
                  onChange={handleChange}
                />
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
    return items.map((item, index) => (
      <Item key={item.id} index={index} {...item} {...remainingProps} />
    ));
  }
}

export default Card;
