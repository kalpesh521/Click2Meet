import React from 'react';
import ContactForm from '../components/ContactForm';
import { useDispatch ,useSelector } from 'react-redux';
import { addContact } from '../features/contacts/userReducer';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.users); 

  const handleSubmit = (contact) => {
    const newContact = { ...contact, id: Date.now() };  
    dispatch(addContact(newContact));  
    console.log("Updated Contacts List:", [...contacts, newContact]);  
    navigate('/');
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddContact;
