import React, { useEffect } from "react";
import { DatePicker } from "antd";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
 
const App = () => {
  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;
