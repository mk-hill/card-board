import styled from 'styled-components';
import { item as i } from '../../theme';

export const ItemBody = styled.div`
  border: ${i.border};
  border-radius: ${i.borderRadius};
  padding: 0.5rem;
  /* margin-bottom: 0.5rem; */
  margin: 0 0.2rem 0.5rem 0.4rem;
  transition: border-color ${i.transition}, background-color ${i.transition};
  background-color: ${props => i.getDragBg(props)};
  border-color: ${props => i.getDragBr(props)};
  box-shadow: ${props => i.getDragShadow(props)};
  border-radius: ${i.brRadius};
  cursor: pointer ${props => i.getDragOverride(props)};

  display: flex;
  position: relative;

  white-space: pre-line;

  // todo look into these
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  /* overflow: scroll; */

  &:focus {
    outline: none;
    border-color: ${i.brColorFocus};
  }

  &:hover {
    border-color: ${i.brColorHover};
  }

  &:hover,
  &:focus {
    svg {
      display: inline-block;
      opacity: 0.4;
    }
  }

  svg {
    position: absolute;
    right: 0.1rem;
    display: none;
    opacity: 0;
    cursor: pointer;
    transition: opacity ${i.transition} fill 0.5s ease;

    /* :first-of-type {
      right: 1rem;
    } */

    &:hover,
    &:focus {
      opacity: 1;
      fill: ${i.brColorHover};
    }
  }

  #submitEdit {
    right: 0.05rem;
    bottom: 0.05rem;
  }
`;

// Set handle section within item if entire item shouldnt be grabbable
export const Handle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: palevioletred;
  border-radius: 2px;
  /* display: inline-block; */
  margin-right: 0.5rem;
`;
