import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContactFromApi } from '../features/api/contactsApi';
import { deleteContact } from '../features/contacts/userReducer';
import { Table, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ViewContact from '../pages/ViewContact';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.contactsApi);
  const userContacts = useSelector(state => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, data.length]);

  const allContacts = [...data, ...userContacts];

  const handleDelete = (id, isApiContact) => {
    if (isApiContact) {
      dispatch(deleteContactFromApi(id));
    } else {
      dispatch(deleteContact(id));
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const columns = [
    {
      title: 'Sr. No',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Tooltip title="View">
            <EyeOutlined
              onClick={() => handleView(record)}  
              style={{  marginRight: 12, color: '#1890ff', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/edit/${record.id}`}>
              <EditOutlined style={{ marginRight: 12, color: '#52c41a' }} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record.id, data.some(d => d.id === record.id))}
              style={{ color: '#ff4d4f', cursor: 'pointer' }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <h2>All Contacts</h2>
      <Table
        columns={columns}
        dataSource={allContacts}
        rowKey="id"
        loading={isLoading}
        bordered
      />

      <ViewContact
        open={isModalOpen}
        onClose={handleModalClose}
        contact={selectedContact}
      />
    </>
  );
};

export default Dashboard;
