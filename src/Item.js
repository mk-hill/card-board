import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const ItemBody = styled.div`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragDisabled ? 'red' : props.isDragging ? '#ddd' : '#fff'};

  display: flex;

  &:focus {
    outline: none;
    border-color: blueviolet;
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
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={() => deleteItem(cardId, id, index)}>D</button>
              </>
            )}
          </ItemBody>
        )}
      </Draggable>
    );
  }
}

export default Item;
