import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../features/contacts/userReducer';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AddContact.css';
import contactUsImg from '../assets/images/contact-us-image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from 'antd';
import { filterContacts } from "../utils/filterContacts";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.users.searchTerm ?? "");
  const contacts = useSelector((state) => state.users.contacts ?? []);

  const filteredContacts = filterContacts(contacts, searchTerm);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (contact) => {
    setLoading(true);

    const newContact = { ...contact, id: Date.now() };
    dispatch(addContact(newContact));

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

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <Spin size="large" tip="Submitting..." />
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1>Partner with Experts Committed to Your Growth</h1>
        <p>Schedule a personalized meeting with our experts to explore tailored solutions that align with your business goals.</p>
        <img src={contactUsImg} alt="Contact us" />
      </div>
      <div className="form-wrapper">
        <ContactForm onSubmit={handleSubmit} submitText="Schedule a Meeting" />
      </div>
    </div>
  );
};

export default AddContact;
