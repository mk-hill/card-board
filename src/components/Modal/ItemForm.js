import React, { Component } from 'react';
import styled from 'styled-components';
import TextFormatter from '../TextFormatter';

import { card as c } from '../../theme';
import Icon from '../Icon';

const FormWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10rem;
`;

const FormTitle = styled.h3`
  margin-bottom: 0.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  box-sizing: border-box;
  margin: 0.5rem;
  /* padding: 1rem; */
  min-height: 20%;
  width: 100%;

  border: ${c.border};
  border-radius: ${c.brRadius};

  overflow: scroll;
  ::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${c.brColor};

    &:hover {
      background: ${c.brColorHover};
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px 1px ${c.brColor};
  }

  /* cursor: pointer; */

  position: relative;
  svg {
    /* position: absolute;
    bottom: 1rem;
    right: 1rem; */
  }
`;

const FormInput = styled.textarea`
  resize: none;
  box-sizing: border-box;
  background: ${c.bg};
  padding: 1rem;
  position: absolute;
  height: 100%;
  width: 100%;
  border: none;
  transition: box-shadow ${c.transition};

  ::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${c.brColor};

    &:hover {
      background: ${c.brColorHover};
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px 1px ${c.brColor};
  }
`;

class ItemForm extends Component {
  state = {
    editingText: false,
    textForm: '',
    editingDescription: false,
    descriptionForm: '',
  };

  toggleEdit = target => {
    const key = `editing${target[0].toUpperCase()}${target.slice(1)}`;
    console.log(key);
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {
    const { text, description } = this.props;
    this.setState({ textForm: text, descriptionForm: description });
  };

  render() {
    const { saveChanges, id } = this.props;
    const { editingText, textForm, editingDescription, descriptionForm } = this.state;
    const { toggleEdit, handleFormChange } = this;
    return (
      <>
        <FormTitle>Edit Item</FormTitle>
        Display text:
        <FormGroup>
          {editingText ? (
            <>
              <FormInput
                autoFocus
                name="textForm"
                value={textForm}
                onKeyDown={e => (e.ctrlKey && e.key === 'Enter' ? toggleEdit('text') : null)}
                onChange={handleFormChange}
              />
              <Icon icon="check" onClick={() => toggleEdit('text')} />
            </>
          ) : (
            <TextFormatter
              text={textForm}
              onClick={() => toggleEdit('text')}
              style={{ padding: '1rem', margin: 0, cursor: 'pointer' }}
            />
          )}
        </FormGroup>
        Description:
        <FormGroup>
          {editingDescription ? (
            <>
              <FormInput
                autoFocus
                name="descriptionForm"
                value={descriptionForm}
                onKeyDown={e => (e.ctrlKey && e.key === 'Enter' ? toggleEdit('description') : null)}
                onChange={handleFormChange}
              />
              <Icon icon="check" onClick={() => toggleEdit('description')} />
            </>
          ) : (
            <TextFormatter
              text={descriptionForm || 'Add a detailed description...'}
              style={{ padding: '1rem', margin: 0, cursor: 'pointer', whiteSpace: 'pre-wrap' }}
              onClick={() => toggleEdit('description')}
            />
          )}
        </FormGroup>
        <button onClick={() => saveChanges(id, { text: textForm, description: descriptionForm })}>Save Changes</button>
      </>
    );
  }
}

export default ItemForm;
