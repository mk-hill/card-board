import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import { card as c } from '../../theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleSpan = styled.span`
  font-size: 1.2em;
  margin-left: 1rem;
`;

const BoardNav = styled.nav`
  background-color: ${c.brColorDrag};
  flex: 1 1 3vh;
  color: ${c.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    fill: currentColor;
    margin-right: 1rem;
    cursor: pointer;
    transition: color ${c.transition};

    &:hover {
      color: ${c.titleIconHover};
    }
  }
`;

const BoardFooter = styled.footer`
  background-color: ${c.brColorDrag};
  flex: 1 1 3vh;
  color: ${c.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoardWrapper = ({ children, title }) => {
  return (
    <Wrapper>
      <BoardNav>
        <TitleSpan>{title}</TitleSpan>
        <Icon icon="dots" />
      </BoardNav>
      {children}
      <BoardFooter>cardboard</BoardFooter>
    </Wrapper>
  );
};

export default BoardWrapper;
