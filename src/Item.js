import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const ItemBody = styled.div`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
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
            can specify dragHandleProps if entire component shouldn't be grabbable */}
        {provided => (
          <ItemBody
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {text}
          </ItemBody>
        )}
      </Draggable>
    );
  }
}

export default Item;
