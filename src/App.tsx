import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"
import { Productos } from "./pages/Productos/Productos"
import { DondeEstamos } from "./pages/DondeEstamos/DondeEstamos"
import Menu from "./pages/Menu/Menu"
import { Detalle } from "./pages/Detalle/Detalle"
import { Grilla } from "./pages/Grilla/Grilla"
import { CarritoPage } from "./pages/CarritoPage/CarritoPage"
import { CarritoContextProvider } from "./context/CarritoContext"


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
        </Routes>
      </CarritoContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
