import { useState } from 'react';
import React from 'react';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [data, setData] = useState({ ...INITIAL_STATE });

  const onChangeInput = event => {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const { name, phone } = data;
    const isValidateForm = validateForm();
    if (!isValidateForm) return;
    onAdd({ id: nanoid(), name, phone });
    setData({ ...INITIAL_STATE });
  };
  const validateForm = () => {
    const { name, phone } = data;
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

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={data.name}
        name="name"
        onChange={onChangeInput}
      />
      <input
        type="tel"
        value={data.phone}
        name="phone"
        onChange={onChangeInput}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default ContactForm;
