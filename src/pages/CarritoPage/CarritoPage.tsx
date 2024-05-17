
import CardCarrito from "../../components/CardCarrito/CardCarrito";
import { CompraCarrito } from "../../components/CompraCarrito/CompraCarrito";

export const CarritoPage = () => {
  

  return (
    <div className="pt-16 bg-gradient-to-br from-black to-slate-900 h-screen">
      <CardCarrito/>
      <CompraCarrito/>
    </div>
    
  );
};
