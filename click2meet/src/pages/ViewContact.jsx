import React from 'react';
import { Modal } from 'antd';
import ContactForm from '../components/ContactForm';
import '../assets/css/ViewContact.css';

const ViewContact = ({ open, onClose, contact }) => {
  if (!contact) return null;

  return (
    <Modal
      // title="View Contact"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      closeIcon={<span className="modal-close-icon">×</span>}
      styles={{
        body: {
          padding: 24
        }
      }}
      className="view-contact-modal"
    >
      <ContactForm initialValues={contact} isViewMode />
    </Modal>
  );
};

export default ViewContact;
