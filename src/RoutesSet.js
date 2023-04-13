import { Route, Routes } from "react-router-dom"
import Main from "./components/Main/Main"
import Register from "./components/Register/Register"
import LogIn from "./components/LogIn/LogIn"

  export default function RoutesSet() {
    return (
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }
