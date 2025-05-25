import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <Header />
      <AppRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
