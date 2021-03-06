import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { card as c } from '../../theme';

import Card from '../Card';

// Parent flex element = Wrapper in ./BoardWrapper.js
export const CardsContainer = styled.div`
  background: linear-gradient(
    114.02807334855652deg,
    rgba(226, 235, 239, 1) 4.775390625%,
    rgba(208, 218, 224, 1) 98.13476562499999%
  );

  /* Text color inherited from here unless specified otherwise */
  color: ${c.color};
  flex: 1 5 93vh;
  display: flex;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${c.brColorHover};

    &:hover {
      background: ${c.brColor};
    }
  }
`;

export const AddCardForm = styled.form`
  box-sizing: border-box;
  margin: 0.5rem;
  height: 5.2rem;
  /* width: 8rem; */
  position: relative;
  background: ${c.bg};
  border: ${c.border};
  border-radius: ${c.brRadius};
  font-size: 0.95em;
  text-align: center;
  padding: 0.5rem;
  transition: border-color ${c.transition};
  flex: 0 0 8rem;

  &:hover,
  &:focus {
    border-color: ${c.brColorDrag};
  }

  input {
    box-sizing: border-box;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    padding: 0.3rem;
    font-size: 0.9em;
    width: 100%;
    border: ${c.border};
    border-radius: ${c.brRadius};
    transition: inherit;

    &:hover,
    &:focus {
      border-color: ${c.brColorDrag};
    }

    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
    fill: ${c.brColor};
    transition: fill ${c.transition};

    &:hover {
      cursor: pointer;
      fill: ${c.titleIconHover};
    }
  }
  #cancelNewCard {
    left: 0.1rem;
    transform: scale(1.15);
  }
`;

export const AddCardButton = styled.div`
  box-sizing: border-box;
  margin: 0.5rem;
  height: 5.2rem;
  /* width: 8rem; */
  flex: 0 0 8rem;
  opacity: 0.5;
  transition: opacity ${c.transition}, background-color ${c.transition}, border-color ${c.transition};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${c.border};
  border-radius: ${c.brRadius};

  &:hover {
    opacity: 1;
    background-color: ${c.bg};
    border-color: ${c.brColorHover};
  }

  svg {
    margin-right: 0.2rem;
    fill: currentColor;
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
