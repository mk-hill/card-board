import React, { Component } from 'react';
import styled from 'styled-components';
import Item from '../Item';
import { card as c } from '../../theme';

export const CardBody = styled.div`
  position: relative;
  /* color: ${c.color}; */
  box-sizing: border-box;
  margin: 0.5rem;
  border: ${c.border};
  border-radius: ${c.brRadius};
  width: 250px;
  background-color: ${c.bg};
  height: max-content;
  display: flex;
  flex-direction: column;

  overflow: hidden;

  transition: border-color ${c.transition};
  border-color: ${props => c.getDragBr(props)};

  &:hover {
    border-color: ${c.brColorHover};
  }
`;

export const CardTitle = styled.h3`
  position: relative;
  padding: 0.5rem;
  margin: 0;
  transition: background-color ${c.transition};
  background-color: ${props => c.getDragBr(props)};

  &:hover {
    background-color: ${c.brColorHover};
  }

  &:hover svg {
    display: inline;
  }

  svg {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0.5rem;

    &:first-of-type {
      right: 3rem;
    }
  }
`;

export const AddButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  padding-top: 0.3rem;
  width: 100%;
  bottom: 0;
  transition: background-color ${c.transition}, color ${c.transition};

  &:hover {
    background-color: ${c.brColorHover};
    color: ${c.bg};
  }

  svg {
    /* transition: color ${c.transition}; */
    fill: currentColor;
    margin-bottom: 1px;
  }
`;

export const SubmitForm = styled.form`
  position: relative;

  input {
    resize: none;
    box-sizing: border-box;
    border: ${c.border};
    border-radius: ${c.brRadius};
    /* height: 100%; */
    width: 100%;
    margin-bottom: 1.5rem;

    &:focus {
      outline: none;
      border-color: ${c.brColorHover};
    }
  }

  svg {
    position: absolute;
    bottom: 0.1rem;
    fill: '#fff';
  }

  #submitItem {
    right: 0.1rem;
    fill: 'red';
  }

  #cancelItem {
    left: 0.1rem;
  }
`;

export const ItemsContainer = styled.div`
  /* padding: 0.2rem; */
  padding: .5rem .2rem 1.4rem .2rem;
  background-color: ${props => (props.isDraggingOver ? c.bgDragOver : 'inherit')};
  transition: background-color ${c.transition};
  flex: 6rem 1 1;
  /* padding-bottom: 1.4rem; */
  /* display: flex; */
  /* border-radius: ${c.brRadius}; */
  /* height: minmax(max-content, 100%); */
  /* max-height: 50vh; */
  /* z-index: 2; */
  /* ~ div {
    background-color: ${props => (props.isDraggingOver ? c.bgDragOver : 'inherit')};
  } */
  /* overflow: auto; */
  /* overflow: scroll; */
`;

const ScrollList = styled.div`
  max-height: 80vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    /* margin-left: 1rem; */
    /* width: 3px !important; */
    background-color: ${c.brColor};

    &:hover {
      background: ${c.brColorHover};
    }
  }
`;

// Prevent stationary items from rerendering while another is being dragged
export class ItemList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  render() {
    // No need to pass item Ids and addItem()
    const { items, itemIds, addItem, ...remainingProps } = this.props;
    return (
      <ScrollList>
        {items.map((item, index) => (
          <Item key={item.id} index={index} {...item} {...remainingProps} />
        ))}
      </ScrollList>
    );
  }
}
