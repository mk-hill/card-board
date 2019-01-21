import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

const CardBody = styled.div`
  margin: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 0.5rem;
`;
const ItemList = styled.div`
  padding: 0.5rem;
  background-color: ${props => (props.isDraggingOver ? '#ddd' : '#fff')};
  transition: background-color 0.2s ease;
`;

export class Card extends Component {
  render() {
    const { title, id, items } = this.props;
    return (
      <CardBody>
        <Title>{title}</Title>
        {/* Droppable requires unique droppableId prop, uses render props pattern
            Expects its child to be a func which returns a component */}
        <Droppable droppableId={id}>
          {/* provided.droppableProps provided to the droppable component
              can use styled component ref used to provide dom node to lib
              placeholder needs to be added as a child of the droppable component
              snapshot provided as in draggable */}
          {(provided, snapshot) => (
            <ItemList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {items.map((item, index) => (
                <Item key={item.id} {...item} index={index} />
              ))}
              {provided.placeholder}
            </ItemList>
          )}
        </Droppable>
      </CardBody>
    );
  }
}

export default Card;
