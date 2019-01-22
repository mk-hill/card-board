import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { item as i } from './theme';

const ItemBody = styled.div`
  border: ${i.border};
  border-radius: ${i.borderRadius};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background-color, border-color ${i.transition};
  background-color: ${props => i.getDragBg(props)};
  border-color: ${props => i.getDragBr(props)};

  display: flex;
  position: relative;

  white-space: pre-line;

  // todo look into these
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  /* overflow: scroll; */

  &:focus {
    outline: none;
    border-color: ${i.brColorFocus};
  }

  &:hover {
    border-color: ${i.brColorHover};
  }

  &:hover button {
    display: inline;
  }
`;

// Hide unless hovering on item
const ItemButton = styled.button`
  position: absolute;
  right: 0.1rem;
  display: none;

  &:first-of-type {
    right: 2rem;
  }
`;

// Set handle section within item if entire item shouldnt be grabbable
const Handle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: palevioletred;
  border-radius: 2px;
  /* display: inline-block; */
  margin-right: 0.5rem;
`;

export class Item extends Component {
  state = {
    isBeingEdited: false,
    text: '',
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      isBeingEdited: !prevState.isBeingEdited,
    }));
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  submitUpdate = e => {
    e.preventDefault();
    const { text } = this.state;
    // Prevent empty items, reset text instead
    if (!text) {
      this.setState({ text: this.props.text });
    } else {
      this.props.updateItem(this.props.id, text);
    }

    this.toggleEdit();
  };

  componentDidMount() {
    if (!this.state.text) {
      this.setState({ text: this.props.text });
    }
  }

  render() {
    const { id, index, isLocked, cardId, deleteItem } = this.props;
    const { isBeingEdited, text } = this.state;
    const { handleChange, submitUpdate, toggleEdit } = this;

    /* Draggable requires draggableId and index
       Expects its child to be a func like Droppable */
    return (
      <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
        {/* provided argument similar to Droppable as well
            gets draggableProps and dragHandleProps 
            can spread dragHandleProps elsewhere if entire component shouldn't be grabbable
            2nd arg can be used to style component during drag */}
        {(provided, snapshot) => (
          <ItemBody
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isLocked}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {isBeingEdited ? (
              <form onSubmit={submitUpdate}>
                <input type="text" value={text} onChange={handleChange} />
              </form>
            ) : (
              <>
                {text}
                <ItemButton onClick={toggleEdit}>Edit</ItemButton>
                <ItemButton onClick={() => deleteItem(cardId, id, index)}>D</ItemButton>
              </>
            )}
          </ItemBody>
        )}
      </Draggable>
    );
  }
}

export default Item;
