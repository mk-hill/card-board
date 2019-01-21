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
  render() {
    const { title, id, items, index } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <CardBody {...provided.draggableProps} ref={provided.innerRef}>
            {/* Cards can only be dragged from their title */}
            <Title {...provided.dragHandleProps}>{title}</Title>
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
                  <ItemList items={items} />
                  {provided.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
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
    return this.props.items.map((item, index) => (
      <Item key={item.id} {...item} index={index} />
    ));
  }
}

export default Card;
