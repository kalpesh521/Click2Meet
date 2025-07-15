
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContactFromApi,
} from "../features/api/contactsApi";
import { deleteContact } from "../features/contacts/userReducer";
import { Table, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewContact from "../pages/ViewContact";
import EditContact from "../pages/EditContact";
import "../assets/css/Dashboard.css";
import { filterContacts } from "../utils/filterContacts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.contactsApi);
  const contacts = useSelector((state) => state.users.contacts ?? []);
  const searchTerm = useSelector((state) => state.users.searchTerm ?? "");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, data.length]);

 
  const allContacts = [...data, ...contacts].map((contact, index) => ({
    ...contact,
    originalIndex: index, 
  }));

   
  const filteredContacts = filterContacts(allContacts, searchTerm);

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, isApiContact) => {
    if (isApiContact) {
      dispatch(deleteContactFromApi(id));
    } else {
      dispatch(deleteContact(id));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedContact(null);
  };

  const columns = [
    {
      title: "Sr. No",
      width: 80, 
      render: (_, record) => record.originalIndex + 1,
    },
    {
      title: "Name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["lg"],
      width: 450,
      ellipsis: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      responsive: ["lg"],
      width: 300,
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Tooltip title="View">
            <EyeOutlined
              onClick={() => handleView(record)}
              style={{ marginRight: 12, color: "#1890ff", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => handleEdit(record)}
              style={{ marginRight: 12, color: "#52c41a", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() =>
                handleDelete(
                  record.id,
                  data.some((d) => d.id === record.id)
                )
              }
              style={{ color: "#ff4d4f", cursor: "pointer" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className="dashboard-table">
      <h2 className="dashboard-heading">Contacts Directory</h2>
      <Table
        columns={columns}
        dataSource={filteredContacts}
        rowKey="id"
        loading={isLoading}
        bordered
        scroll={{ x: "max-content" }}
        style={{ padding: "0 20px" }}
      />

      <ViewContact
        open={isModalOpen}
        onClose={handleModalClose}
        contact={selectedContact}
      />

      <EditContact
        open={isEditModalOpen}
        onClose={handleModalClose}
        contact={selectedContact}
      />
    </div>
  );
};

export default Dashboard;
