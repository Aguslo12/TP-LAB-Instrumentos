import { useLocation } from "react-router-dom";
import { iInstrumento } from "../../../types/iInstrumento";
import { Link } from "react-router-dom"
import { FaTruck } from "react-icons/fa";

export const Detalle = () => {
  const locacion = useLocation();

  const data = locacion.state.data as iInstrumento;

  function envio() {
    if (data.costoEnvio === "G") {
      return (
        <h3 className="text-green-500 flex justify-start flex-row">
          <FaTruck className="h-6 w-6 mr-2"/> Envío gratis a todo el país
        </h3>
      );
    } else {
      return (
        <h3 className="text-orange-500">Costo de envío ${data.costoEnvio}</h3>
      );
    }
  }

  return (
    <div className="top-16 relative flex justify-center h-screen bg-gradient-to-br from-black to-slate-900">
      <div className="card lg:card-side bg-gray w-auto bg-white text-black flex-col mb-auto mt-14">
        <figure>
          <img
            src={data.imagen}
            alt="Instrumento"
            className="flex w-96 h-auto"
          />
        </figure>
        <div className="">
          <p className="m-5">Cantidad vendida: {data.cantidadVendida}</p>
          <h2 className="text-3xl m-5 w-72 font-medium">{data.instrumento}</h2>
          <p className="font-light m-5 text-4xl ">$ {data.precio}</p>
          <p className="mx-5">
            Marca: <b>{data.marca}</b>
          </p>
          <p className="mx-5">
            Modelo: <b>{data.modelo}</b>
          </p>
          <p className="m-5">Costo Envío: {envio()}</p>
          <p className="m-5 w-96">{data.descripcion}</p>
          <div className="card-actions justify-end">
            <Link to={"/productos"}><button className="btn btn-error m-5">Volver</button> </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
