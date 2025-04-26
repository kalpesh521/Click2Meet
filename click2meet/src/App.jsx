import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import { useDispatch , useSelector } from 'react-redux';
import { fetchContacts } from './features/api/contacts';
 
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { data } = useSelector((state) => state.contacts);

    return (
      <div>
        <h1>Contact List</h1>
      <ul>
        {data.map((contact) => (
          <li key={contact.id}>
            {contact.id} -- {contact.firstName} {contact.lastName} - {contact.email}
          </li>
        ))}
      </ul>
      </div>
    );
};
 
export default App;