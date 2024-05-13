import React, { useEffect, useState } from "react";
import { iInstrumento } from "../../types/iInstrumento";
import { deleteInstrumento, fetchAllData, fetchIdData } from "../../APIS/fetch";
import FormInstrumento from "./Form";

const Tabla = () => {
  const [data, setData] = useState<iInstrumento[]>([]);

  const traerDatos = async () => {
    const datos = await fetchAllData();
    setData(datos);
  };

  useEffect(() => {
    traerDatos();
  }, []);

  const vacio = {
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "",
    cantidadVendida: 0,
    descripcion: "",
    activo: true,
    categoria: {
        id: 1,
        descripcion: "",
    },
  }

  const [formValues, setFormValues] = useState<iInstrumento>({
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "",
    cantidadVendida: 0,
    descripcion: "",
    activo: true,
    categoria: {
        id: 1,
      descripcion: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setFormValues(vacio);

    setIsOpen(true);
  }


  const openPUT = async (id) => {
    const PUTvalues = await fetchIdData(id);

    setFormValues(PUTvalues);

    setIsOpen(true);
  };

  const openDELETE = async (id) => {
    const DELETEvalues = await fetchIdData(id);
    await deleteInstrumento(DELETEvalues);
  };

  return (
    <>
      <div className="container text-center"></div>
      <br />
      <div className="flex justify-center">
        <button
          className="bg-green-600 p-2 rounded-lg text-white"
          onClick={openModal}
        >
          Nuevo Instrumento
        </button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="">Instrumento</th>
            <th className="text-center">Marca</th>
            <th className="text-center">Modelo</th>
            <th className="text-center">Categoría</th>
            <th className="text-center">Costo Envío</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Modificar</th>
            <th className="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>  
          {data.map((i: iInstrumento) => (
            i.activo && (
            <tr key={i.id}>
              <td className="">{i.instrumento}</td>
              <td className="text-center">{i.marca}</td>
              <td className="text-center">{i.modelo}</td>
              <td className="text-center">{i.categoria.descripcion}</td>
              <td className="text-center">
                {i.costoEnvio.toUpperCase() === "G" ? "Gratis" : i.costoEnvio}
              </td>
              <td className="text-center">{i.precio}</td>
              <td className="text-center">
                <button
                  className="bg-blue-500 rounded-lg p-2 text-white"
                  onClick={() => openPUT(i.id)}
                >
                  Modificar
                </button>
              </td>
              <td className="text-center">
                <button className="bg-red-500 rounded-lg p-2 text-white" onClick={() => openDELETE(i.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
            )
          ))}
        </tbody>
      </table>
      {isOpen && (
        <FormInstrumento
          open={isOpen}
          setOpen={setIsOpen}
          values={formValues}
        />
      )}
    </>
  );
};

export default Tabla;
