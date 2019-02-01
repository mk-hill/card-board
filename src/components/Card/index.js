import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Transition } from 'react-spring';

import Icon from '../Icon';
import { CardBody, CardTitle, TitleFormContainer, ItemsContainer, SubmitForm, AddButton, ItemList } from './elements';

class Card extends Component {
  state = {
    editingTitle: false,
    title: '',
    addingItem: false,
    newItemText: '',
  };

  componentDidMount() {
    if (!this.state.title) {
      this.setState({ title: this.props.title });
    }

    document.addEventListener('keydown', this.cancelInputOnEsc, true);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.cancelInputOnEsc, true);
  };

  // Cancel any forms and reset input field on escape keypress
  cancelInputOnEsc = e => {
    if (e.key === 'Escape') {
      this.setState({
        editingTitle: false,
        addingItem: false,
        newItemText: '',
      });
    }
  };

  toggleTitleForm = () => {
    this.setState(prevState => ({
      editingTitle: !prevState.editingTitle,
    }));
  };

  submitNewTitle = e => {
    e.preventDefault();
    this.props.updateTitle(this.props.id, this.state.title);
    this.toggleTitleForm();
  };

  toggleNewItemForm = () => {
    this.setState(prevState => ({
      addingItem: !prevState.addingItem,
    }));
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNewItem = e => {
    e.preventDefault();
    this.props.addItem(this.props.id, this.state.newItemText);
    this.toggleNewItemForm();
    this.setState({ newItemText: '' }); // clear input for future additions
  };

  render() {
    const { id, index, deleteCard, trailProps, ...itemProps } = this.props;
    const { addingItem, newItemText, editingTitle, title } = this.state;
    const {
      handleInputChange: handleChange,
      toggleNewItemForm: toggleAddMode,
      submitNewItem,
      toggleTitleForm,
      submitNewTitle,
    } = this;

    /**
     * Trail component keeps feeding 0 translate even after initial entry animation is finished
     * Once Trail stops transforming card, will stop adding transform altogether
     * in order to allow drag-drop transform to take over
     */
    const entryIsComplete = trailProps.transform === 'translate3d(0,0px,0)';

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <CardBody
            trailProps={{ ...trailProps, entryIsComplete }}
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* Cards can only be dragged from their title.
            common div parent added for handle to exist during transition */}
            <div {...provided.dragHandleProps}>
              <Transition
                items={editingTitle}
                from={{ opacity: 0.5 }}
                enter={{ opacity: 1 }}
                leave={{ display: 'none' }}
              >
                {editingTitle =>
                  editingTitle
                    ? ({ opacity, display }) => (
                        <TitleFormContainer style={{ opacity, display }}>
                          <form onSubmit={submitNewTitle}>
                            <input autoFocus type="text" name="title" value={title} onChange={handleChange} />
                            <label>
                              <input type="submit" style={{ display: 'none' }} />
                              <Icon icon="check" title="Submit" />
                            </label>
                          </form>
                        </TitleFormContainer>
                      )
                    : ({ opacity, display }) => (
                        <CardTitle style={{ opacity, display }} isDragging={snapshot.isDragging}>
                          <h3>{title}</h3> <Icon icon="pencil" onClick={toggleTitleForm} title="Edit card title" />
                          <Icon icon="squaredCross" onClick={() => deleteCard(id)} title="Delete card" />
                        </CardTitle>
                      )
                }
              </Transition>
            </div>

            {/* Droppable requires unique droppableId prop, uses render props pattern
            Expects its child to be a func which returns a component
            Optionally can specify type of draggable it accepts */}
            <Droppable droppableId={id} type="item">
              {/* provided.droppableProps provided to the droppable component
              can use styled component ref used to provide dom node to lib
              placeholder needs to be added as a child of the droppable component
              default direction = vertical
              snapshot provided as in draggable */}
              {(provided, snapshot) => (
                <ItemsContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ItemList {...itemProps} cardId={id} />
                  {provided.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
            <Transition
              items={addingItem}
              from={{ opacity: 0.4, transform: 'scaleY(.1)' }}
              enter={{ opacity: 1, transform: 'scaleY(1)' }}
              leave={{ display: 'none' }}
            >
              {addingItem =>
                addingItem
                  ? ({ opacity, display }) => (
                      <SubmitForm style={{ opacity, display }} onSubmit={submitNewItem}>
                        <input
                          autoFocus
                          type="text"
                          name="newItemText"
                          value={newItemText}
                          onChange={handleChange}
                          placeholder="Enter item text"
                        />
                        <label>
                          <input type="submit" style={{ display: 'none' }} />
                          <Icon id="submitItem" icon="check" title="Submit" />
                        </label>
                        <Icon
                          id="cancelItem"
                          title="Cancel"
                          onClick={() => {
                            toggleAddMode();
                            // Wipe input from state after closing form
                            this.setState({ newItemText: '' });
                          }}
                        />
                      </SubmitForm>
                    )
                  : ({ opacity, display }) => (
                      <AddButton
                        style={{ opacity, display }}
                        onClick={toggleAddMode}
                        title="Add a new item to your card"
                      >
                        <Icon icon="plus" />
                        Add item
                      </AddButton>
                    )
              }
            </Transition>
          </CardBody>
        )}
      </Draggable>
    );
  }
}

export default Card;
