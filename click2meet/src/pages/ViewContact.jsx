import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const ViewContact = () => {
  const { id } = useParams();
  const { data: apiContacts } = useSelector(state => state.contactsApi);
  const userContacts = useSelector(state => state.users);

  const allContacts = [...apiContacts, ...userContacts];

  const contact = allContacts.find(c => c.id.toString() === id);

  if (!contact) {
    return <p>Contact not found.</p>;
  }

  return (
    <div>
      <h2>View Contact</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Country:</strong> {contact.country}</p>
      <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
      <p><strong>Message:</strong> {contact.message}</p>
      
      <Link to={`/edit/${contact.id}`}>Edit Contact</Link>
    </div>
  );
};

export default ViewContact;
