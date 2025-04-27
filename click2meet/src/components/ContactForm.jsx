import React, { useState } from 'react';

const ContactForm = ({ initialValues = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: initialValues.firstName || '',
    lastName: initialValues.lastName || '',
    email: initialValues.email || '',
    country: initialValues.country || '',
    phoneNumber: initialValues.phoneNumber || '',
    message: initialValues.message || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialValues.id });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
      <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />

      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
    </form>
  );
};

export default ContactForm;
