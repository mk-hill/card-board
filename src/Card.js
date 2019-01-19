import React, { Component } from 'react';
import styled from 'styled-components';
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
`;

export class Card extends Component {
  render() {
    return (
      <CardBody>
        <Title>{this.props.title}</Title>
        <ItemList>
          {this.props.items.map(item => (
            <Item key={item.id} {...item} />
          ))}
        </ItemList>
      </CardBody>
    );
  }
}

export default Card;
