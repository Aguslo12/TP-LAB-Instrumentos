import { useState } from "react";
import { Usuario } from "../../../types/Usuario";
import Slider from "../../ui/Slider/Slider";
import { Navbar } from "../../ui/Navbar/Navbar";
import BarChart from "../../ui/Grafico/GraficoBarra";
import GraficoBarra from "../../ui/Grafico/GraficoBarra";

const Menu = () => {
  const [jsonUsuario, setJSONUsuario] = useState<any>(
    localStorage.getItem("usuario")
  );
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  return (
    <div className="top-16 w-full pt-16 bg-gradient-to-br from-black to-slate-900 h-full">
      <div className="flex justify-center items-center flex-col mt-14">
        <Slider/>
        <p className="flex text-center w-1/3 mt-10">
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia. 
        Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical.
        </p>
        
      </div>
      <p className="flex justify-center items-center font-light mt-16 text-4xl p-5 font-serif bg-violet-950/20">CLIENTES QUE HAN CONFIADO EN HENDRIX</p>
      <div className="flex justify-center items-center py-10">
        <GraficoBarra/>
      </div>
    </div>
  );
};

export default Menu;
