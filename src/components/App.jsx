import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import React from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (localStorage) {
      const data = localStorage.getItem('key');
      if (data) {
        const parseData = JSON.parse(data);
        return parseData;
      }
    }
  });
  const [filter, setFilter] = useState('');

  const handleAddContact = newContact => setContacts([...contacts, newContact]);

  const handleCheckUniqueContact = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };
  const handleRempveContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = filter => setFilter(filter);

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    if (localStorage) {
      const jsonData = JSON.stringify(contacts);
      localStorage.setItem('key', jsonData);
    }
  }, [contacts, filter]);

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <h2>Contact Form</h2>
      <ContactForm
        onAdd={handleAddContact}
        onCheckUnique={handleCheckUniqueContact}
      />
      <h2>Filter</h2>
      <Filter filter={filter} onChange={handleFilterChange}></Filter>
      <h2>Contacts</h2>
      <ContactList contacts={visibleContacts} onRemove={handleRempveContact} />
    </div>
  );
};
