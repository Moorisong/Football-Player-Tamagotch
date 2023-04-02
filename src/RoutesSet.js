import { Route, Routes } from "react-router-dom"
import Register from "./components/Register/Register"

  export default function RoutesSet() {

    return (
      <Routes>
        <Route path="/*" element={<Register />} />
      </Routes>
    )
  }
