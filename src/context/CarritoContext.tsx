import { ReactNode, createContext, useState } from "react";
import { IDetallePedido } from "../types/IDetallePedido";

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: IDetallePedido[];
  addCarrito: (instrument: IDetallePedido) => void;
  removeItemCarrito: (instrument: IDetallePedido) => void;
  limpiarCarrito: () => void;
}

// Crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
});

// Crear provide, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IDetallePedido[]>([]);

  const addCarrito = async (product: IDetallePedido) => {
    let existe: boolean = false;
    cart.forEach(async (element: IDetallePedido) => {
      if (element.instrumento.id === product.instrumento.id) {
        
        existe = true;
        return existe;
      }
    });
    if (existe) {
      
      product.cantidad += 1
      const cartClonado = structuredClone(
        cart.filter((item) => item.instrumento.id !== product.instrumento.id)
      );
      cartClonado.push(product);
      setCart(cartClonado);
      
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
    
  };

  const removeItemCarrito = async (product: IDetallePedido) => {
    let existe: boolean = false;
    cart.forEach(async (element: IDetallePedido) => {
      if (element.instrumento.id === product.instrumento.id) {
        existe = true;
        return existe;
      }
    });

    if (existe) {
      console.log("EXISTE");
      if(product.cantidad > 1){
        product.cantidad -= 1
        const cartClonado = await structuredClone(cart.filter(item => item.instrumento.id !== product.instrumento.id))
        await cartClonado.push(product)
        setCart(cartClonado)
      }
      else{
        await setCart(prevCart => prevCart.filter(item => item.instrumento.id !== product.instrumento.id))
      }
    }
  };

  const limpiarCarrito = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{cart, addCarrito, limpiarCarrito, removeItemCarrito}}>
        {children}
    </CartContext.Provider>
  )
}
