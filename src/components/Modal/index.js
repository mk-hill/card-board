import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { card as c } from '../../theme';

import Icon from '../Icon';
import ItemForm from './ItemForm';

const BackgroundShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${c.colorDark}99;
  z-index: 5;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 50%;
  color: ${c.color};

  background: ${c.bg};
  border: ${c.border};
  border-radius: ${c.brRadius};
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    color: ${c.bgDragOver};
    fill: currentColor;
    cursor: pointer;
    transition: color ${c.transition};

    &:hover {
      color: ${c.titleIconHover};
    }
  }
`;

const Modal = ({ form = 'item', toggleOpen, title = 'Item Title', item, ...props }) => {
  const backgroundId = 'backgroundShadow';

  const handleBackgroundClick = e => {
    if (e.target.id === backgroundId) {
      toggleOpen();
    }
  };

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {springProps => (
        <BackgroundShadow style={springProps} id={backgroundId} onClick={handleBackgroundClick}>
          <ModalBox>
            <h4>{item.text}</h4>
            <Icon icon="squaredCross" onClick={toggleOpen} />
            {form === 'item' ? <ItemForm {...item} /> : null}
          </ModalBox>
        </BackgroundShadow>
      )}
    </Spring>
  );
};

export default Modal;
