import { useState } from "react";
import { Roles } from "../../enums/Roles";
import { Usuario } from "../../types/Usuario";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    rol: Roles;
  }
  
  function RolUsuario({ rol }: Props) {
    
      const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
      const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;
      //si esta logueado y es administrador lo dejo ingresar si no
      if((usuarioLogueado && usuarioLogueado.rol === rol)){
          return <Outlet />;
      }else if(usuarioLogueado){
          return <Navigate replace to='/grilla' />;
      }else{
          return <Navigate replace to='/' />;
      }
      
  }
  export default RolUsuario;