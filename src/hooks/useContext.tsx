import { useContext } from "react"
import { CartContext } from "../context/CarritoContext";


export const useCarrito = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCarrito must be used within a CartProvider");
    }
    return context;
  }