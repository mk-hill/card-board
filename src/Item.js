import React, { Component } from 'react';
import styled from 'styled-components';

const ItemBody = styled.div`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export class Item extends Component {
  render() {
    return (
      <ItemBody>
        <p>{this.props.text}</p>
      </ItemBody>
    );
  }
}

export default Item;
