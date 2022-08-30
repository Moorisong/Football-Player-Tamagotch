import { BrowserRouter } from "react-router-dom"
import RoutesSet from "./RoutesSet"
import { CookiesProvider } from "react-cookie"

export default function App(){
 return(
   <CookiesProvider>
    <BrowserRouter>
      <RoutesSet />
    </BrowserRouter>
    </CookiesProvider>
 )
}
