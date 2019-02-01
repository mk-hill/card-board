import React, { Component } from 'react';
import TextFormatter from '../TextFormatter';

class ItemForm extends Component {
  render() {
    const { id, text, content } = this.props;
    return (
      <form>
        <TextFormatter text={text} />
        <TextFormatter text={content} />
        <button type="submit">Save Changes</button>
      </form>
    );
  }
}

export default ItemForm;
