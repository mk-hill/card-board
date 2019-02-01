import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import TextFormatter from '../TextFormatter';
import Icon from '../Icon';
import { ItemBody } from './elements';

class Item extends Component {
  state = {
    isBeingEdited: false,
    text: '',
  };

  componentDidMount() {
    if (!this.state.text) {
      this.setState({ text: this.props.text });
    }
    document.addEventListener('keydown', this.cancelInputOnEsc, true);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.cancelInputOnEsc, true);
  };

  // Cancel edit state on escape keypress
  cancelInputOnEsc = e => {
    if (e.key === 'Escape') {
      this.setState({
        isBeingEdited: false,
      });
    }
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

  // Not necessary if edit toggles on double click instead of single click
  handleClick = e => {
    if (e.target.tagName.toLowerCase() !== 'a') {
      this.toggleEdit();
    }
  };

  render() {
    const { id, index, isLocked, cardId, deleteItem, editItem } = this.props;
    const { isBeingEdited, text } = this.state;
    const { handleChange, submitUpdate } = this;

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
            onDoubleClick={() => editItem(id)}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {isBeingEdited ? (
              <form onSubmit={submitUpdate}>
                <input autoFocus type="text" value={text} onChange={handleChange} />
                {/* label and input are only here to tie Icon to submit action, 
                  alternatively create new click handler to form.submit() && submitUpdate() */}
                <label>
                  <input type="submit" style={{ display: 'none' }} />
                  <Icon id="submitEdit" icon={'check'} title={'Submit'} />
                </label>
              </form>
            ) : (
              <>
                {text ? <TextFormatter text={text} /> : text}
                {/* <Icon icon="pencil" viewBox="0 -3 26 26" onClick={toggleEdit} title="Edit" /> */}
                <Icon onClick={() => deleteItem(cardId, id, index)} title={'Delete'} />
              </>
            )}
          </ItemBody>
        )}
      </Draggable>
    );
  }
}

export default Item;
