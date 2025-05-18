import React, { useState } from "react"; 
import '../assets/css/ContactForm.css';
import { Button, Form, Input ,Flex } from "antd"; 
import { UserOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,MessageOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ContactForm = ({ initialValues = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: initialValues.firstName || "",
    lastName: initialValues.lastName || "",
    email: initialValues.email || "",
    country: initialValues.country || "",
    phoneNumber: initialValues.phoneNumber || "",
    message: initialValues.message || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialValues.id });
  };

  return (
    <Form
    className="form-container"
      layout="vertical"
      style={{ maxWidth: 400 }}
      onSubmitCapture={handleSubmit}
    >
      <Form.Item required>
        <Input
        prefix={<UserOutlined style={{ color: '#FF6F00' }} className="form-icon"/>}
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item required>
        <Input
        prefix={<IdcardOutlined style={{ color: '#FF6F00' }} className="form-icon"/>}
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item  required>
        <Input
        prefix={<MailOutlined style={{ color: '#FF6F00' }} className="form-icon"/>}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item  required>
        <Input
        prefix={< GlobalOutlined style={{ color: '#FF6F00' }} className="form-icon"/>}
          name="country"
          placeholder="Enter Country"
          value={formData.country}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item  required>
        <Input
        prefix={< PhoneOutlined style={{ color: '#FF6F00' }} className="form-icon"/>}
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item required>
        <div style={{ position: 'relative' }}>
          <MessageOutlined
            style={{
              position: 'absolute',
              top: 5,
              left: 12,
              color: 'rgba(0,0,0,.25)',
              zIndex: 1,
              color: '#FF6F00',   
            }}className="form-icon"
          />
          <TextArea
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              paddingLeft: 53,  
            }}
          />
        </div>
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit" block  style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00',borderRadius: '15px' }}>
          SUBMIT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
