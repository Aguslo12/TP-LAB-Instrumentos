import { FC } from "react";
import { iInstrumento } from "../../types/iInstrumento";
import { useNavigate } from "react-router-dom";
import { fetchIdData } from "../../APIS/fetch";

export const Card: FC<iInstrumento> = ({
  id,
  cantidadVendida,
  costoEnvio,
  descripcion,
  imagen,
  instrumento,
  marca,
  modelo,
  precio,
}) => {

    const usenavi = useNavigate();

    const traerDatos = async () => {
        const datos = await fetchIdData(id);
        const data = await datos;
        return data
    }

    const push = async () => {
      const datos = await traerDatos();
      usenavi(`/detalle/${id}`, {state: {datos}})
    }

    function envio() {
        if (costoEnvio === "G") {
            return <h3 className='text-green-500 flex justify-start flex-row'><img src="/img/camion.png" />Envío gratis a todo el país</h3>
        }
        else {
            return <h3 className='text-orange-500'>Costo de envío ${costoEnvio}</h3>
        }
    }

  return (
    <>
      <div className="card card-side shadow-2xl w-max md:w-2/4 p-4 bg-white">
        <figure>
          <img className="w-56"
            src={imagen}
            alt="Instrumento"
          />
        </figure>
        <div className="card-body text-black w-16">
          <h2 className="card-title font-normal">{instrumento}</h2>
          <p className="text-2xl text-left font-bold">$ {precio}</p>
          <p>{envio()}</p>
          <p className="my-4">Cantidad de ventas: {cantidadVendida}</p>
        </div>
        <div className="card-actions justify-end items-end m-5 flex flex-row">
            <button onClick={() => push()} className="btn btn-success border-orange-500 bg-orange-500 hover:bg-orange-600 hover:border-orange-600">Ver Detalle</button>
            <button className="btn btn-success">Comprar</button>
        </div>
      </div>
    </>
  );
};
