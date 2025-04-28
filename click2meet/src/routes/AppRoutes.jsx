 
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import AddContact from '../pages/AddContact';
import EditContact from '../pages/EditContact';
import ViewContact from '../pages/ViewContact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
      <Route path="/view/:id" element={<ViewContact />} />
    </Routes>
  );
};

export default AppRoutes;
