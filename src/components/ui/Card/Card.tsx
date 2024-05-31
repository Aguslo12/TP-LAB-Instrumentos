import { FC, useEffect, useState } from "react";
import { iInstrumento } from "../../../types/iInstrumento";
import { useNavigate } from "react-router-dom";
import { fetchIdData } from "../../APIS/fetch";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { useCarrito } from "../../../hooks/useContext";
import { IDetallePedido } from "../../../types/IDetallePedido";
import { FaTruck } from "react-icons/fa";


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
  const { cart, addCarrito, removeItemCarrito } = useCarrito();
  const usenavi = useNavigate();
  const [cantidad, setCantidad] = useState<number>(0);
  const [data, setData] = useState<iInstrumento | null>(null);

  const traerDatos = async () => {
    const datos = await fetchIdData(id); // Asegúrate de definir `fetchIdData`
    setData(datos);
  };

  useEffect(() => {
    traerDatos();
  }, [id]);

  useEffect(() => {
    const itemInCart = cart.find(item => item.instrumento.id === id);
    if (itemInCart) {
      setCantidad(itemInCart.cantidad);
    }
  }, [cart, id]);

  const push = () => {
    usenavi(`/detalle/${id}`, { state: { data } });
  };

  const agregar = () => {
    if (data) {
      const detalle: IDetallePedido = { id: 0, cantidad: 1, instrumento: data };
      addCarrito(detalle);
      setCantidad(prevCantidad => prevCantidad + 1);
    }
  };


  const eliminar = () => {
    if (data) {
      const detalle: IDetallePedido = { id: 0, cantidad, instrumento: data };
      removeItemCarrito(detalle);
      if (cantidad > 0) {
        setCantidad(prevCantidad => prevCantidad - 1);
      }
    }
  };

  const envio = () => {
    if (costoEnvio === "G") {
      return <h3 className='text-green-500 flex justify-start flex-row'><FaTruck className="h-6 w-6 mr-2"/>  Envío gratis a todo el país</h3>;
    } else {
      return <h3 className='text-orange-500'> Costo de envío ${costoEnvio}</h3>;
    }
  };

  return (
    <div className="card card-side shadow-2xl w-max md:w-2/4 p-4 bg-white">
      <figure>
        <img className="w-56" src={imagen} alt="Instrumento" />
      </figure>
      <div className="card-body text-black w-16">
        <h2 className="card-title font-normal">{instrumento}</h2>
        <p className="text-2xl text-left font-bold">$ {precio}</p>
        <p>{envio()}</p>
        <p className="my-4">Cantidad de ventas: {cantidadVendida}</p>
      </div>
      <div className="justify-end items-end m-3 flex">
        <button onClick={push} className="btn btn-success border-orange-500 bg-orange-500 hover:bg-orange-600 hover:border-orange-600 text-gray-800 font-medium">Ver Detalle</button>
        <button className="btn btn-error rounded-l-xl rounded-r-none ml-3 text-gray-800 text-sm disabled:bg-red-300 disabled:text-slate-300" onClick={eliminar} disabled={cantidad === 0}><FaMinus /></button>
        <h1 className="bg-custom-green h-12 p-2 items-center flex font-medium text-2xl w-14 justify-center text-gray-800"><BsFillCartFill /></h1>
        <button className="btn btn-success rounded-r-xl rounded-l-none text-gray-800 text-sm" onClick={agregar}><FaPlus /></button>
      </div>
    </div>
  );
};
