import { useEffect, useState } from "react";
import { useCarrito } from "../../hooks/useContext";
import { IDetallePedido } from "../../types/IDetallePedido";
import { IPedido } from "../../types/IPedido";
import { postPedido } from "../../APIS/fetch";

export const CompraCarrito = () => {
  const { cart, limpiarCarrito } = useCarrito();

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  function eliminarTodo() {
    limpiarCarrito();
  }

  const manejarClick = () => {
    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 2000);

    const pedido: IPedido = {
      fecha: "2020-10-10",
      id: 0,
      totalPedido: sumTotal(),
      pedidoDetalles: cart,
    };

    eliminarTodo();

    console.log(pedido);
    postPedido(pedido);
  };

  useEffect(() => {
    
  }, [cart])
  

  const calcularTotalProductos = () => {
    return cart.reduce((acc, item) => acc + item.cantidad * item.instrumento.precio, 0);
  };

  const calcularTotalEnvio = () => {
    const envioPorProveedor = new Map();
    cart.forEach(item => {
      if (item.instrumento.costoEnvio !== "G") {
        const costoEnvio = parseInt(item.instrumento.costoEnvio);
        if (!envioPorProveedor.has(item.instrumento.marca)) {
          envioPorProveedor.set(item.instrumento.marca, costoEnvio);
        }
      }
    });
    let totalEnvio = 0;
    envioPorProveedor.forEach(costo => {
      totalEnvio += costo;
    });
    return totalEnvio;
  };

  const sumTotal = () => {
    const totalProductos = calcularTotalProductos();
    const totalEnvio = calcularTotalEnvio();
    return totalProductos + totalEnvio;
  };

  return (
    <div className="bg-red-500">
      <div className="absolute top-28 right-20 flex justify-end align-middle card w-96 shadow-xl bg-white text-black">
        <div className="card-body">
          <h2 className="card-title">Total</h2>
          <h3 className="pt-4 justify-start">
            Productos <b className="flex justify-end">${calcularTotalProductos()}</b>
          </h3>
          <h3>
            Envío
            {calcularTotalEnvio() === 0 ? (
              <b className="flex justify-end">Gratis</b>
            ) : (
              <b className="flex justify-end">${calcularTotalEnvio()}</b>
            )}
          </h3>
          <hr />
          <h3>
            <b>Total</b>
            <b className="text-lime-600 flex justify-end">${sumTotal()}</b>
          </h3>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={manejarClick}>
              Compra
            </button>
          </div>
          {mostrarAlerta && (
            <div role="alert" className="alert alert-success transition transform duration-2000 ease-in-out opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Tu compra se ha realizado con éxito!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
