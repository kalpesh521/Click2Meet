import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateContact } from '../features/contacts/userReducer';
import { updateContactInApi } from '../features/api/contactsApi';
import ContactForm from '../components/ContactForm';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: apiContacts } = useSelector((state) => state.contactsApi);
  const userContacts = useSelector((state) => state.users);

  const allContacts = [...apiContacts, ...userContacts];

  const contact = allContacts.find((c) => c.id.toString() === id);

  if (!contact) {
    return <p>Contact not found.</p>;
  }

  const handleSubmit = async (updatedContact) => {
    const isApiContact = apiContacts.some(c => c.id.toString() === id);

    if (isApiContact) {
      await dispatch(updateContactInApi({ id: Number(id), updatedData: { ...updatedContact, id: Number(id) } }));
    } else {
      dispatch(updateContact({ ...updatedContact, id: Number(id) }));
    }
    console.log(updatedContact)
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <ContactForm onSubmit={handleSubmit} initialValues={contact} />
    </div>
  );
};

export default EditContact;
