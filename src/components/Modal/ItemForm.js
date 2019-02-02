import React, { Component } from 'react';
import styled from 'styled-components';
import TextFormatter from '../TextFormatter';

import { card as c } from '../../theme';
import Icon from '../Icon';

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-align: center;
  /* font-size: 1.5em; */
`;

const FormGroup = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  /* padding: 1rem; */
  min-height: 20%;
  width: 100%;

  border: ${c.border};
  border-radius: ${c.brRadius};

  position: relative;
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

  &:focus {
    outline: none;
    box-shadow: 1px 1px 10px 1px ${c.brColor};
  }

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
`;

const SaveButton = styled.button`
  width: 40%;
  padding: 0.5rem;

  align-self: center;

  border: none;
  border-radius: ${c.brRadius};
  background-color: ${c.colorDark};
  color: ${c.bg};

  cursor: pointer;
  transition: background-color ${c.transition}, box-shadow ${c.transition};

  &:hover {
    background-color: ${c.titleIconHover};
    box-shadow: 2px 2px 10px -2px ${c.brColor};
  }

  &:active {
    background-color: ${c.colorDark};
    box-shadow: none;
  }
`;

class ItemForm extends Component {
  state = {
    editingText: false,
    textForm: '',
    editingDescription: false,
    descriptionForm: '',
  };

  // Set appropriate edit state for param 'text' or 'description'
  toggleEdit = target => {
    const key = `editing${target[0].toUpperCase()}${target.slice(1)}`;
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
        <FormTitle>Item Details</FormTitle>
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
                onBlur={() => toggleEdit('text')}
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
                onBlur={() => toggleEdit('description')}
              />
              <Icon icon="check" onClick={() => toggleEdit('description')} />
            </>
          ) : (
            <TextFormatter
              text={descriptionForm || 'Add a detailed description...'}
              style={{ padding: '1rem', margin: 0, cursor: 'pointer' }}
              onClick={() => toggleEdit('description')}
            />
          )}
        </FormGroup>
        <SaveButton onClick={() => saveChanges(id, { text: textForm, description: descriptionForm })}>
          Save Changes
        </SaveButton>
      </>
    );
  }
}

export default ItemForm;
