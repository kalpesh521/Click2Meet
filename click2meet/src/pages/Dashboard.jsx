import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts ,deleteContactFromApi } from '../features/api/contactsApi';
import { setContacts , deleteContact } from '../features/contacts/userReducer';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.contactsApi);
  const userContacts = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const allContacts = [...data, ...userContacts];

  const handleDelete = (id, isApiContact) => {
    if (isApiContact) {
      dispatch(deleteContactFromApi(id));
    } else {
      dispatch(deleteContact(id));
    }
  };

  return (
    <div>
      <h2>All Contacts</h2>
      <ul>
        {allContacts.map(contact => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName} - {contact.email}
            {" "}
            <Link to={`/view/${contact.id}`}>View</Link>
            {" "}
            <Link to={`/edit/${contact.id}`}>Edit</Link>
            {" "}
            <button
              onClick={() => handleDelete(contact.id, data.some(d => d.id === contact.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
