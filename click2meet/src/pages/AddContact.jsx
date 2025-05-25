import React from 'react';
import ContactForm from '../components/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../features/contacts/userReducer';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AddContact.css';
import contactUsImg from '../assets/images/contact-us-image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.users);

  const handleSubmit = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    dispatch(addContact(newContact));
    console.log("Updated Contacts List:", [...contacts, newContact]);

   
    toast.success("Contact submitted successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      style: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontWeight: "bold",
      },
      theme: "colored",
    });

    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1>Our Team of experts are here to help</h1>
        <p>Get support 24/7, with our award-winning support network of growth experts</p>
        <img src={contactUsImg} alt="Contact -us" />
      </div>
      <div className="form-wrapper">
        <ContactForm onSubmit={handleSubmit} submitText="Submit Contact" />
      </div>
    </div>
  );
};

export default AddContact;
