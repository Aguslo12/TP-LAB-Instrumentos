import { useEffect, useState } from "react";
import PreferenceMP from "../../../types/Mercadopago/PreferenceMP";
import { createPreferenceMP } from "../../APIS/fetch";
import { useCarrito } from "../../../hooks/useContext";

function CheckoutMP({ montoCarrito = 0 }) {
  const { cart } = useCarrito();

  const [idPreference, setIdPreference] = useState<string>("");

  const [titulo, setTitulo] = useState<string>("");

  useEffect(() => {
    const instrumentos = cart.reduce(
      (acc, inst) =>
        acc + inst.instrumento.instrumento + " " + inst.cantidad + " ",
      ""
    );
    setTitulo(instrumentos.trim());
    getPreferenceMP()
  }, [cart]);

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      try {
        const response: PreferenceMP = await createPreferenceMP({
          id: 0,
          fecha: "2020-10-10",
          titulo: titulo,
          totalPedido: montoCarrito,
          pedidoDetalles: cart,
        });
        if (response && response.id) {
          setIdPreference(response.id);
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
  const handleCompra = () => {
    const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${idPreference}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      {idPreference ? (
        <button onClick={()=>{getPreferenceMP(), handleCompra()}} className="btn btn-info w-full">
          Comprar con <br></br> Mercado Pago
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CheckoutMP;
