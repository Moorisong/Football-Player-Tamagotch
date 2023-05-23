import { Route, Routes } from "react-router-dom"
import Main from "./routes/Main/Main"
import Register from "./routes/Register/Register"
import LogIn from "./routes/LogIn/LogIn"

  export default function RoutesSet() {
    return (
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }
