import { useEffect, useState } from "react";
import PreferenceMP from "../../../types/Mercadopago/PreferenceMP";
import { createPreferenceMP } from "../../APIS/fetch";
import { useCarrito } from "../../../hooks/useContext";
import { toast } from "react-toastify";
import { SiMercadopago } from "react-icons/si";

function CheckoutMP({ montoCarrito = 0 }) {
  const { cart, limpiarCarrito } = useCarrito();

  const [idPreference, setIdPreference] = useState<string>("");
  const [compra, setCompra] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>("");

  const post = async () => {
    const instrumentos = cart.reduce(
      (acc, inst) =>
        acc + inst.instrumento.instrumento + " " + inst.cantidad + " ",
      ""
    );
    setTitulo(instrumentos.trim());
    getPreferenceMP();
  };

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      try {
        const date = new Date();
        const response: PreferenceMP = await createPreferenceMP({
          id: 0,
          fecha: date,
          titulo: titulo,
          totalPedido: montoCarrito,
          pedidoDetalles: cart,
        });
        if (response && response.id) {
          setIdPreference(response.id);
          handleCompra(response.id);
        } else {
          console.error("Error: Preference ID is null or undefined");
          alert(
            "Error al crear la preferencia de pago. Por favor, intenta de nuevo."
          );
        }
      } catch (error) {
        console.error("Error creating Mercado Pago preference:", error);
        alert(
          "Error al crear la preferencia de pago. Por favor, intenta de nuevo."
        );
      }
    } else {
      alert("Agregue al menos un plato al carrito");
    }
  };

  //initMercadoPago('TEST-dd2a0401-24ef-45b2-bf22-c084a70105e7', { locale: 'es-AR' });
  const handleCompra = (idPreference: string) => {
    toast.success(`Se a guardado el pedido con id: 
      Será redirigido a Mercado Pago`);
    setCompra(true);
    setTimeout(() => {
      const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${idPreference}`;
      window.open(url, "_blank");
      limpiarCarrito();
    }, 2000);
  };

  return (
    <div className="w-full">
        {!compra ? (
          <button
            className="btn w-full mt-2 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-700"
            onClick={() => post()}
          >
            <h1 className="flex flex-row  justify-center items-center">
              Comprar con Mercado Pago{" "}
              <SiMercadopago className="text-5xl pl-5 font-bold" />
            </h1>
          </button>
        ) : (
          <progress className="progress progress-info mt-5 w-full "></progress>
        )}
      </div>
  );
}

export default CheckoutMP;
