import { Route, Routes } from "react-router-dom"
import LogIn from './pages/LogIn/LogIn'

  export default function RoutesSet() {

    return (
      <Routes>
        <Route path="/*" element={<LogIn />} />
      </Routes>
    )
  }
