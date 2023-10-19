const ContactListItem = ({ name, phone, onRemove, id }) => {
  const handleRemoveClick = () => {
    onRemove(id);
  };
  return (
    <li>
      {name} : {phone} <button onClick={handleRemoveClick}>Delete</button>
    </li>
  );
};
const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};
export default ContactList;
