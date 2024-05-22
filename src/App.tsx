import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"
import { Productos } from "./pages/Productos/Productos"
import { DondeEstamos } from "./pages/DondeEstamos/DondeEstamos"
import Menu from "./pages/Menu/Menu"
import { Detalle } from "./pages/Detalle/Detalle"
import { Grilla } from "./pages/Grilla/Grilla"
import { CarritoPage } from "./pages/CarritoPage/CarritoPage"
import { CarritoContextProvider } from "./context/CarritoContext"
import { MpSuccess } from "./pages/MercadoPago/MpSuccess"
import { MpFailure } from "./pages/MercadoPago/MpFailure"


function App() {

  return (
    <>
      <BrowserRouter>
      <CarritoContextProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Menu/>}/>
          <Route path="/productos" element={<Productos/>}/>
          <Route path="/ubicacion" element={<DondeEstamos/>}/>
          <Route path="/detalle/:id" element={<Detalle/>}/>
          <Route path="/grilla" element={<Grilla/>}/>
          <Route path="/paginaCarrito" element={<CarritoPage/>}/>
          <Route path="/pagoRealizado" element={<MpSuccess/>}></Route>
          <Route path="/pagoError" element={<MpFailure/>}></Route>
        </Routes>
      </CarritoContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
