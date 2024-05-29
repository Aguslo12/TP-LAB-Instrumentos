import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { Usuario } from "../../../types/Usuario";
import { useEffect, useState } from "react";
import { Roles } from "../../../enums/Roles";

export const Navbar = () => {
  const navigate = useNavigate();

  const [jsonUsuario, setJSONUsuario] = useState<any>(
    localStorage.getItem("usuario")
  );
  console.log("JSON " + jsonUsuario);
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  const cerrarSesion = async () => {
    localStorage.setItem("usuario", "");
    localStorage.removeItem("usuario");
    navigate("/", {
      replace: true,
      state: {
        logged: false,
      },
    });
  };

  
  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-black h-16 flex flex-row justify-between items-center text-white text-xl">
      <div className="pl-20 text-center">
        <h1>Tienda Hendrix</h1>
      </div>
      <div className="flex flex-row justify-center align-middle space-x-10 font-bold px-10 text-black">
        <Link to={"/menu"}>
          <button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">
            Inicio
          </button>
        </Link>
        <Link to={"/productos"}>
          <button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">
            Productos
          </button>
        </Link>
        <Link to={"/ubicacion"}>
          <button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">
            Donde Estamos
          </button>
        </Link>
        {
          (usuarioLogueado?.rol == Roles.ADMIN) ?
          <Link to={"/grilla"}>
          <button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">
            Grilla
          </button>
        </Link> : <div>hola</div>
        }
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost mr-10 btn-circle avatar"
        >
          <div className=" rounded-full">
            <FaUserAlt className="w-10 h-10" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-1 mr-8 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2"
        >
          <li>
            <p className="flex justify-between">
              <span>Usuario</span>
              <p className="text-sky-500">{usuarioLogueado?.nombreUsuario}</p>
            </p>
          </li>
          <li>
            <p className="flex justify-between">
              <span>Rol</span>
              <p className="text-sky-500">{usuarioLogueado?.rol}</p>
            </p>
          </li>
          <li>
            <button
              onClick={cerrarSesion}
              className=" bg-black flex justify-center text-white border-red-500 hover:bg-red-500 hover:border-white text-sm"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};