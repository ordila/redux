import { Component } from 'react';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

export default class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  onChangeInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, phone } = this.state;
    const { onAdd } = this.props;
    const isValidateForm = this.validateForm();
    if (!isValidateForm) return;
    onAdd({ id: nanoid(), name, phone });
    this.setState({ ...INITIAL_STATE });
  };

  validateForm = () => {
    const { name, phone } = this.state;
    const { onCheckUnique } = this.props;

    if (!name || !phone) {
      alert('Заповніть усі поля');
      return false;
    }

    if (onCheckUnique(name)) {
      return true;
    } else {
      alert('Контакт вже існує');
      return false;
    }
  };

  render() {
    const { name, phone } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={this.onChangeInput}
        />
        <input
          type="tel"
          value={phone}
          name="phone"
          onChange={this.onChangeInput}
        />
        <button type="submit">Додати</button>
      </form>
    );
  }
}
