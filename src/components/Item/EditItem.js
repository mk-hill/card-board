import React, { Component } from 'react';
import styled from 'styled-components';

const BackgroundShadow = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background: rgba(0, 0, 0);
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const EditBox = styled.div``;

export class EditItem extends Component {
  render() {
    return (
      <BackgroundShadow>
        <form action="">asd</form>
      </BackgroundShadow>
    );
  }
}

export default EditItem;
