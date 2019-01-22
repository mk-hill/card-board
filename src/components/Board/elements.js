import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { card as c } from '../../theme';

import Card from '../Card';

export const CardsContainer = styled.div`
  background: linear-gradient(
    114.02807334855652deg,
    rgba(226, 235, 239, 1) 4.775390625%,
    rgba(208, 218, 224, 1) 98.13476562499999%
  );
  display: flex;
  min-width: max-content;
  height: 99.5vh;
`;

export const AddCardButton = styled.div`
  margin: 0.5rem;
  height: 4rem;
  width: 8rem;
  opacity: 0.5;
  transition: opacity ${c.transition}, background-color ${c.transition};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${c.border};
  border-radius: ${c.brRadius};

  &:hover {
    opacity: 1;
    background-color: ${c.bg};
  }
`;

// Block render if props are unchanged (shallow)
export class PureCard extends PureComponent {
  render() {
    const { card, items, ...remainingProps } = this.props;
    const cardItems = card.itemIds.map(id => items[id]);
    return <Card key={card.id} items={cardItems} {...card} {...remainingProps} />;
  }
}
