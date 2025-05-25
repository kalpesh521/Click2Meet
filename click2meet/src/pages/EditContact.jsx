// src/pages/EditContact.js

import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../features/contacts/userReducer";
import { updateContactInApi } from "../features/api/contactsApi";
import ContactForm from "../components/ContactForm";
import "../assets/css/EditContact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditContact = ({ open, onClose, contact }) => {
  const dispatch = useDispatch();
  const { data: apiContacts } = useSelector((state) => state.contactsApi);

  if (!contact) return null;

  const handleSubmit = async (updatedContact) => {
    const isApiContact = apiContacts.some(
      (c) => c.id.toString() === contact.id.toString()
    );

    if (isApiContact) {
      await dispatch(
        updateContactInApi({
          id: Number(contact.id),
          updatedData: { ...updatedContact, id: Number(contact.id) },
        })
      );
    } else {
      dispatch(updateContact({ ...updatedContact, id: Number(contact.id) }));
    }

    toast.success("Contact updated successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      style: {
        backgroundColor: "#2196F3",
        color: "white",
        fontWeight: "bold",
      },
      theme: "colored",
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      closeIcon={<span className="modal-close-icon">×</span>}
      className="edit-contact-modal"
      styles={{ body: { padding: 24 } }}
    >
      <ContactForm
        onSubmit={handleSubmit}
        initialValues={contact}
        submitText="Update Info"
      />
    </Modal>
  );
};

export default EditContact;
