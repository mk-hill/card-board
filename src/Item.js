import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const ItemBody = styled.div`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragging ? '#ddd' : '#fff')};

  display: flex;
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
  render() {
    const { text, id, index } = this.props;
    /* Draggable equires draggableId and index
       Expects its child to be a func like Droppable */
    return (
      <Draggable draggableId={id} index={index}>
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
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {text}
          </ItemBody>
        )}
      </Draggable>
    );
  }
}

export default Item;
