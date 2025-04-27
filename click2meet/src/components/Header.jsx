import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
    
      <h1>Click2Meet Contact Manager</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Dashboard</Link> | <Link to="/add">Add Contact</Link>
      </nav>
    </div>
  );
}

export default Header;
