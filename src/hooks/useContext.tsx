import { useContext } from "react"
import { CartContext } from "../context/CarritoContext";


export const useCarrito = () => {
    const context = useContext(CartContext)

    if (context === undefined) {
        throw new Error("Debe ser usado en un CartProvider")
    }

    return context;
}