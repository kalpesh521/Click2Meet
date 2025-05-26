import React, { useState } from "react";
import "../assets/css/ContactForm.css";
import { Button, Form, Input } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { validateContactForm,areAllFieldsEmpty } from "../utils/validation";

const { TextArea } = Input;

const ContactForm = ({ initialValues = {}, onSubmit, isViewMode = false, submitText }) => {
  const [formData, setFormData] = useState({
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    email: initialValues.email,
    country: initialValues.country,
    phoneNumber: initialValues.phoneNumber,
    message: initialValues.message,
  });

  const handleChange = (e) => {
    if (isViewMode) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (areAllFieldsEmpty(formData)) {
      toast.error("Please fill out all required fields.", {position: "bottom-right"});
      return;
    }

    const errors = validateContactForm(formData);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    onSubmit({ ...formData, id: initialValues.id });
  };

  return (
    <Form
      className="form-container"
      layout="vertical"
      onSubmitCapture={handleSubmit}
    >
      <Form.Item required>
        <Input
          prefix={<UserOutlined style={{ color: "#FF6F00" }} className="form-icon" />}
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
          disabled={isViewMode}
        />
      </Form.Item>

      <Form.Item required>
        <Input
          prefix={<IdcardOutlined style={{ color: "#FF6F00" }} className="form-icon" />}
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={handleChange}
          disabled={isViewMode}
        />
      </Form.Item>

      <Form.Item required>
        <Input
          prefix={<MailOutlined style={{ color: "#FF6F00" }} className="form-icon" />}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isViewMode}
        />
      </Form.Item>

      <Form.Item required>
        <Input
          prefix={<GlobalOutlined style={{ color: "#FF6F00" }} className="form-icon" />}
          name="country"
          placeholder="Enter Country"
          value={formData.country}
          onChange={handleChange}
          disabled={isViewMode}
        />
      </Form.Item>

      <Form.Item required>
        <Input
          prefix={<PhoneOutlined style={{ color: "#FF6F00" }} className="form-icon" />}
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={isViewMode}
        />
      </Form.Item>

      <Form.Item required>
        <div style={{ position: "relative" }}>
          <MessageOutlined
            style={{
              position: "absolute",
              top: 5,
              left: 12,
              zIndex: 1,
              color: "#FF6F00",
            }}
            className="form-icon"
          />
          <TextArea
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{ paddingLeft: 53 }}
            disabled={isViewMode}
          />
        </div>
      </Form.Item>

      {!isViewMode && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#FF6F00",
              borderColor: "#FF6F00",
              borderRadius: "15px",
              fontWeight: "600",
            }}
          >
            {submitText || "Schedule a Call"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default ContactForm;
