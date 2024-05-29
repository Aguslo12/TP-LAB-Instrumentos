import { BsCartXFill, BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../hooks/useContext";
import { useEffect, useState } from "react";

export const Carrito = () => {
  const { cart, limpiarCarrito } = useCarrito();

  const [suma, setSuma] = useState<number>(0)


  useEffect(() => {
    const sumaTotal = cart.reduce((total, item) => total += item.cantidad, 0);
    setSuma(sumaTotal);
  }, [cart]);

  function eliminarTodo() {
    limpiarCarrito();
  }
  
  return (
    <div className="flex w-full h-screen fixed justify-end items-end">
      <button
        onClick={eliminarTodo}
        className="z-40 inset-0 flex w-20 justify-center items-center btn btn-error h-16 mb-28 mr-1 text-2xl text-white font-semibold rounded"
      >
        <BsCartXFill />
      </button>
      <Link to={"/paginaCarrito"}>
        <button className="z-40 inset-0 flex w-40 justify-center items-center btn btn-success h-16 mb-28 mr-14 text-2xl text-white font-semibold rounded">
          <BsFillCartFill />
          {suma}
        </button>
      </Link>
    </div>
  );
};
