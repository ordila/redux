import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));

  handleCheckUniqueContact = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };
  handleRempveContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };
  handleFilterChange = filter => this.setState({ filter });
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  componentDidMount() {
    if (localStorage) {
      const data = localStorage.getItem('key');
      if (data) {
        const parseData = JSON.parse(data);
        this.setState({ contacts: parseData });
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (localStorage) {
      const jsonData = JSON.stringify(this.state.contacts);
      localStorage.setItem('key', jsonData);
    }
  }
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h2>Contact Form</h2>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUnique={this.handleCheckUniqueContact}
        />
        <h2>Filter</h2>
        <Filter filter={filter} onChange={this.handleFilterChange}></Filter>
        <h2>Contacts</h2>
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleRempveContact}
        />
      </div>
    );
  }
}
