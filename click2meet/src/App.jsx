import React, { useEffect } from "react";
import { DatePicker } from "antd";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
 
const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;
