import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./components/Signup"
import { Signin } from "./components/Signin"
import { Dashboard } from "./components/Dashboard"
import { SendMoney } from "./components/SendMoney"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/send" element={<SendMoney></SendMoney>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
