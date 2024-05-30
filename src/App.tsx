import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Productos } from "./components/screens/Productos/Productos";
import { DondeEstamos } from "./components/screens/DondeEstamos/DondeEstamos";
import Menu from "./components/screens/Menu/Menu";
import { Detalle } from "./components/screens/Detalle/Detalle";
import { Grilla } from "./components/screens/Grilla/Grilla";
import { CarritoPage } from "./components/screens/CarritoPage/CarritoPage";
import { CarritoContextProvider } from "./context/CarritoContext";
import { MpSuccess } from "./components/screens/MercadoPago/MpSuccess";
import { MpFailure } from "./components/screens/MercadoPago/MpFailure";
import { Login } from "./components/screens/Login/Login";
import { Suspense, lazy } from "react";
import { Loading } from "./components/screens/Loading/Loading";
import { Register } from "./components/screens/Register/Register";
import RolUsuario from "./components/security/RolUsuario";
import { Roles } from "./enums/Roles";

const Navbar = lazy(() => import("./components/ui/Navbar/Navbar"));

function App() {
  return (
    <>
      <BrowserRouter>
        <CarritoContextProvider>
        <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/menu" element={<Menu />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/ubicacion" element={<DondeEstamos />} />
              <Route path="/detalle/:id" element={<Detalle />} />
              <Route element={<RolUsuario rol={Roles.ADMIN} />}>
                <Route path="/grilla" element={<Grilla />} />
              </Route>
              <Route path="/paginaCarrito" element={<CarritoPage />} />
              <Route path="/pagoRealizado" element={<MpSuccess />}></Route>
              <Route path="/pagoError" element={<MpFailure />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </Suspense>
        </CarritoContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
