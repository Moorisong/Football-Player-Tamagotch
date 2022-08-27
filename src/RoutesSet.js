import { Route, Routes } from "react-router-dom"

import LogIn from './components/LogIn/LogIn'
import FormationBoard from './pages/FormationBoard'

  export default function RoutesSet() {

    return (
      <Routes>
        <Route path="/*" element={<LogIn />} />
        <Route path="/FormationBoard" element={<FormationBoard />} />
      </Routes>
    )
  }
