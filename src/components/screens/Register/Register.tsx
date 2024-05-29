import { Link } from "react-router-dom";
import { Usuario } from "../../../types/Usuario";
import { fetchAllUsuarios, postUsuario } from "../../APIS/fetch";
import { Field, Form, Formik } from "formik";
import { Roles } from "../../../enums/Roles";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const Register = () => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [data, setData] = useState<Usuario[]>([]);
  const [actualizacion, setActualizacion] = useState(false);
  const [nombreUsado, setNombreUsado] = useState(false);

  const traerDatos = async () => {
    const datos = await fetchAllUsuarios();
    setData(datos);
    console.log(datos);
  };

  useEffect(() => {
    traerDatos();
  }, [actualizacion]);

  const rolesArray = Object.values(Roles);

  const mostrarYEsconderAlerta = () => {
    setMostrarAlerta(true);
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const mostrarUsadoONo = () => {
    setNombreUsado(true);
    setTimeout(() => {
      setNombreUsado(false);
    }, 3000);
  };

  const enviarUsuario = async (usuario: Usuario) => {
    const usuarioEncontrado = data.find(
      (actual: Usuario) => actual.nombreUsuario === usuario.nombreUsuario
    );
    if (usuarioEncontrado) {
      mostrarUsadoONo();
    } else {
      const response = await postUsuario(usuario);
      console.log(response);
      mostrarYEsconderAlerta();
      setActualizacion(!actualizacion);
    }
  };

  const schema = Yup.object().shape({
    nombreUsuario: Yup.string().required("El nombre de usuario es obligatorio"),
    clave: Yup.string().required("La contraseña es obligatoria"),
    rol: Yup.string().required("El rol es obligatorio"),
  });

  return (
    <div className="bg-gradient-to-br from-black to-slate-900 h-screen flex items-center justify-center relative z-50">
      <div className="glass card w-96 bg-base-100 shadow-xl">
        <Formik
          initialValues={{
            id: 0,
            nombreUsuario: "",
            clave: "",
            rol: "",
            activo: true,
          }}
          onSubmit={enviarUsuario}
          validationSchema={schema} // Pasar el esquema de validación
        >
          {(
            { errors, touched } // Obtener los errores y el estado de toque de los campos del formulario
          ) => (
            <Form className="card-body">
              <h1 className="card-title flex justify-center text-3xl font-extralight text-white mb-5">
                Registrarse
              </h1>
              <div className="space-y-5 text-white">
                <label className=" italic input input-bordered flex items-center font-extralight gap-3">
                  Nombre
                  <Field
                    id="nombreUsuario"
                    name="nombreUsuario"
                    type="text"
                    className="grow font-normal"
                    placeholder=""
                  />
                </label>
                {errors.nombreUsuario && touched.nombreUsuario && (
                  <div className="text-red-500 font-normal text-left text-sm">
                    {errors.nombreUsuario}
                  </div>
                )}
                <label className="input italic input-bordered flex text-justify items-center font-extralight gap-3">
                  Contraseña
                  <Field
                    id="clave"
                    name="clave"
                    type="password"
                    className="grow"
                    placeholder=""
                  />
                </label>
                {errors.clave && touched.clave && (
                  <div className="text-red-500 font-normal text-left text-sm">
                    {errors.clave}
                  </div>
                )}
                <div className="flex row">
                  <div className="flex input items-center italic font-extralight">
                    Rol
                  </div>
                  <Field
                    id="rol"
                    name="rol"
                    as="select"
                    className="select select-bordered w-52 ml-2 max-w-xs font-normal"
                  >
                    <option disabled value="">
                      Elige un rol
                    </option>
                    {rolesArray.map((rol, index) => (
                      <option key={index} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </Field>
                </div>
                {errors.rol && touched.rol && (
                  <div className="text-red-500 font-normal text-left text-sm">
                    {errors.rol}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-outline w-full text-xl font-extralight"
                >
                  Registrarse
                </button>
                {mostrarAlerta && (
                  <div
                    role="alert"
                    className="alert alert-success alerta animate__animated animate__fadeInUp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Usuario registrado con éxito!</span>
                  </div>
                )}
                {nombreUsado && (
                  <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Error! Nombre de usuario en uso.</span>
                  </div>
                )}
              </div>
              <Link to={"/"}>
                <button className="text-left font-thin ml-1 mt-2 hover:underline">
                  Iniciar Sesión
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
