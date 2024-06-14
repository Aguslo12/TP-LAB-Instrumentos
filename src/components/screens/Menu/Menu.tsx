import { useState } from "react";
import { Usuario } from "../../../types/Usuario";
import Slider from "../../ui/Slider/Slider";

const Menu = () => {
  const [jsonUsuario, setJSONUsuario] = useState<any>(
    localStorage.getItem("usuario")
  );
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  return (
    <div className="top-16 w-full pt-16 bg-gradient-to-br from-black to-slate-900 h-screen">
      <div className="flex justify-center items-center flex-col mt-14">
        <Slider/>
        <p className="flex text-center w-1/3 mt-10">
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia. 
        Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical.
        </p>
        
      </div>
    </div>
  );
};

export default Menu;
