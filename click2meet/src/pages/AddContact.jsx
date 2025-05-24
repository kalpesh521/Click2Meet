import React from 'react';
import ContactForm from '../components/ContactForm';
import { useDispatch ,useSelector } from 'react-redux';
import { addContact } from '../features/contacts/userReducer';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AddContact.css';
import contactUsImg from '../assets/images/contact-us-image.png';

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
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1>Our Team of experts are here to help</h1>
        <p>Get support 24/7 , with our award winning support network of growth experts</p>
        <img src={contactUsImg} alt="Contact -us" />
      </div>
      <div className="form-wrapper">
        {/* <h2>Get in Touch</h2> */}
        <ContactForm onSubmit={handleSubmit} />
      </div> 
    </div>
  );
};

export default AddContact;
