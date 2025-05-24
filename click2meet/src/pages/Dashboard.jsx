import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContactFromApi } from '../features/api/contactsApi';
import { setContacts, deleteContact } from '../features/contacts/userReducer';
import { Link } from 'react-router-dom';
import { Table, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.contactsApi);
  const userContacts = useSelector(state => state.users);

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

  const columns = [
    {
      title: 'Sr. No',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const isApiContact = data.some(d => d.id === record.id);
        return (
          <Space size="middle">
            <Tooltip title="View">
              <Link to={`/view/${record.id}`}>
                <EyeOutlined style={{ color: '#1890ff' }} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Link to={`/edit/${record.id}`}>
                <EditOutlined style={{ color: '#52c41a' }} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined
                onClick={() => handleDelete(record.id, isApiContact)}
                style={{ color: '#ff4d4f', cursor: 'pointer' }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Contacts</h2>
      <Table
        columns={columns}
        dataSource={allContacts}
        loading={isLoading}
        rowKey="id"
        bordered
      />
    </div>
  );
};

export default Dashboard;
