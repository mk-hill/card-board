import styled from 'styled-components';
import { card as c } from '../../theme';

export const CardBody = styled.div`
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

  &:hover {
    background: ${c.brColorHover};
  }
`;

export const SubmitForm = styled.form`
  position: relative;

  textarea {
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
  padding: 0.5rem;
  background-color: ${props => (props.isDraggingOver ? c.bgDragOver : 'inherit')};
  transition: background-color ${c.transition};
  /* display: flex; */
  flex: 50px 1 1;
  border-radius: ${c.brRadius};
  height: max-content;
  max-height: 50vh;
  /* overflow: auto; */
  /* overflow: scroll; */
`;
