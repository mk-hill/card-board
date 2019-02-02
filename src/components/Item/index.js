import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import TextFormatter from '../TextFormatter';
import Icon from '../Icon';
import { ItemBody } from './elements';

const Item = props => {
  const { id, index, isLocked, cardId, deleteItem, editItem, text } = props;
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
          {text ? <TextFormatter text={text} /> : text}
          {/* <Icon icon="pencil" viewBox="0 -3 26 26" onClick={toggleEdit} title="Edit" /> */}
          <Icon onClick={() => deleteItem(cardId, id, index)} title={'Delete Item'} />
        </ItemBody>
      )}
    </Draggable>
  );
};

export default Item;
