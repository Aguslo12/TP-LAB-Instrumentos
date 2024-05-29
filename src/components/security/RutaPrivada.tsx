import { Navigate } from "react-router-dom";
import { Usuario } from "../../types/Usuario";
import { ReactNode, useState } from "react";

export const RutaPrivada = ({ children }: { children: ReactNode }) => {
	
    const [usuario, setUsuario] = useState<Usuario>(localStorage.getItem('usuario') as unknown as Usuario);

	return usuario ? children : <Navigate to='/menu' />;
};