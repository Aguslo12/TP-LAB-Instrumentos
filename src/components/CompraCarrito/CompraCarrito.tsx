import { useEffect, useState } from "react";
import { useCarrito } from "../../hooks/useContext";
import { IDetallePedido } from "../../types/IDetallePedido";
import { IPedido } from "../../types/IPedido";
import { postPedido } from "../../APIS/fetch";

export const CompraCarrito = () => {
  const { cart } = useCarrito();

  let suma = 0;
  let sumaEnvio = 0;
  let total = 0;

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const [productos, setProductos] = useState<number>(0)
    const [envio, setEnvio] = useState<number>(0)

  const manejarClick = () => {
    setMostrarAlerta(true);
    // Aquí puedes agregar más lógica que se ejecutará cuando se haga clic en el botón
    setTimeout(() => setMostrarAlerta(false), 2000);

    const pedido: IPedido = {
      fecha: "2020-10-10",
      id: 0,
      totalPedido: sumTotal(),
      pedidoDetalles: cart,
    };
    console.log(pedido);
    postPedido(pedido);
  };

  function paruts() {
    cart.map((tipo: IDetallePedido) => {
      suma += tipo.cantidad * tipo.instrumento.precio;
    });
    return suma;
  }

  function parutsa() {
    suma = 0;
    console.log(cart.length)
    cart.map((tipo: IDetallePedido) => {
      if (tipo.instrumento.costoEnvio === "G") {
        sumaEnvio;
      } else {
        sumaEnvio += parseInt(tipo.instrumento.costoEnvio);
      }
    });
    return sumaEnvio;
  }

  function sumTotal() {
    console.log(paruts())
    console.log(parutsa())
    total = paruts() + parutsa();
    return total;
  }

  return (
    <div className="bg-red-500 ">
      <div className="absolute top-28 right-20 flex justify-end align-middle card w-96 shadow-xl bg-white text-black">
        <div className="card-body">
          <h2 className="card-title">Total</h2>
          <h3 className=" pt-4 justify-start">
            Productos<b className="flex justify-end">${paruts()}</b>
          </h3>
          <h3 className="">
            Envío
            {parutsa() === 0 ? (
              <b className="flex justify-end">Gratis</b>
            ) : (
              <b className="flex justify-end">${parutsa()}</b>
            )}
          </h3>
          <hr />
          <h3>
            <b>Total</b>
            <b className="text-lime-600 flex justify-end">
              ${sumTotal()}
            </b>
          </h3>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={manejarClick}>
              Compra
            </button>
          </div>
          {mostrarAlerta && (
            <div
              role="alert"
              className="alert alert-success transition transform duration-2000 ease-in-out opacity-100 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tu compra se ha realizado con éxito!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
