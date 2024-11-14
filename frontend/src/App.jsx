import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Dashboard } from "./components/Dashboard";
import { SendMoney } from "./components/SendMoney";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSendMoney from "./components/ProtectedSendMoney";
import { Home } from "./components/Home";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedSendMoney>
                <SendMoney />
              </ProtectedSendMoney>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
