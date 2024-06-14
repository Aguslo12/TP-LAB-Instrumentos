import { useEffect, useState } from "react";
import { fetchAllData } from "../../APIS/fetch";
import { iInstrumento } from "../../../types/iInstrumento";
import { Card } from "../../ui/Card/Card";
import { Carrito } from "../../ui/Carrito/Carrito";


export const Productos = () => {
  const [data, setData] = useState<iInstrumento[]>([]);

    const traerDatos = async () => {
        const datos = await fetchAllData();
        setData(datos);
    }

    useEffect(() => {
        traerDatos();
    }, [])

    console.log(data)
  return (
    <div className="top-16 relative bg-gradient-to-br from-black to-slate-900">
      <div className="bg-white">
      <Carrito/>
      </div>
      <div className="flex align-center flex-col justify-center items-center space-y-4 py-5 z-50">
          {data.map((instrumento: iInstrumento)=>(
          instrumento.activo && (<Card activo={instrumento.activo} categoria={instrumento.categoria} cantidadVendida={instrumento.cantidadVendida} costoEnvio={instrumento.costoEnvio} descripcion={instrumento.descripcion} instrumento={instrumento.instrumento} precio={instrumento.precio} imagen={instrumento.imagen} id={instrumento.id} marca={instrumento.marca} modelo={instrumento.modelo}/>)
          ))}
      </div>
    </div>
  )
}
