import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import { card as c } from '../../theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TitleSpan = styled.span`
  /* padding: 1rem; */
  font-size: 1.2em;
`;

const BoardNav = styled.nav`
  padding: 0.5rem 1rem;
  background-color: ${c.colorDark};
  flex: 1 0 4vh;
  min-height: max-content;
  color: ${c.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    fill: currentColor;

    cursor: pointer;
    transition: color ${c.transition};

    &:hover {
      color: ${c.titleIconHover};
    }
  }
`;

const BoardFooter = styled.footer`
  padding: 0.2rem 1rem;
  background-color: ${c.colorDark};
  min-height: max-content;
  flex: 1 0 3vh;
  color: ${c.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoardWrapper = ({ children, title }) => {
  return (
    <Wrapper>
      <BoardNav>
        <TitleSpan>
          {title}
          {/* <Icon icon="pencil" title="Edit board title" /> */}
        </TitleSpan>
        <Icon icon="dots" />
      </BoardNav>
      {children}
      <BoardFooter>
        card <Icon icon="cardboard" /> board
      </BoardFooter>
    </Wrapper>
  );
};

export default BoardWrapper;
