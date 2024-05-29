import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/ui/Navbar/Navbar"
import { Productos } from "./components/screens/Productos/Productos"
import { DondeEstamos } from "./components/screens/DondeEstamos/DondeEstamos"
import Menu from "./components/screens/Menu/Menu"
import { Detalle } from "./components/screens/Detalle/Detalle"
import { Grilla } from "./components/screens/Grilla/Grilla"
import { CarritoPage } from "./components/screens/CarritoPage/CarritoPage"
import { CarritoContextProvider } from "./context/CarritoContext"
import { MpSuccess } from "./components/screens/MercadoPago/MpSuccess"
import { MpFailure } from "./components/screens/MercadoPago/MpFailure"
import { Login } from "./components/screens/Login/Login"
import { Suspense, useState } from "react"
import { Loading } from "./components/screens/Loading/Loading"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <>
      <BrowserRouter>
      <CarritoContextProvider>
      <Navbar/>
       <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} ></Route>
          <Route path="/" element={<Menu/>}/>
          <Route path="/productos" element={<Productos/>}/>
          <Route path="/ubicacion" element={<DondeEstamos/>}/>
          <Route path="/detalle/:id" element={<Detalle/>}/>
          <Route path="/grilla" element={<Grilla/>}/>
          <Route path="/paginaCarrito" element={<CarritoPage/>}/>
          <Route path="/pagoRealizado" element={<MpSuccess/>}></Route>
          <Route path="/pagoError" element={<MpFailure/>}></Route>
        </Routes>
        </Suspense>
      </CarritoContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
