import { useEffect } from "react";
import { useCarrito } from "../../hooks/useContext";
import CheckoutMP from "../CheckoutMP/CheckoutMP";

export const CompraCarrito = () => {
  const { cart } = useCarrito();

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
          <div className="card-actions">
            <CheckoutMP montoCarrito={sumTotal()}/>
          </div>
        </div>
      </div>
    </div>
  );
};
