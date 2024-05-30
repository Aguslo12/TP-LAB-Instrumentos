import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllUsuarios } from "../../APIS/fetch";
import { useEffect, useState } from "react";
import { Usuario } from "../../../types/Usuario";
import { UsuarioShort } from "../../../types/UsuarioShort";
import { MD5 } from "crypto-js";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [data, setData] = useState<Usuario[]>([]);

  const traerDatos = async () => {
    const datos = await fetchAllUsuarios();
    setData(datos);
  };

  useEffect(() => {
    traerDatos();
  }, []);

  const mostrarYEsconderAlerta = () => {
    setMostrarAlerta(true);
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const [jsonUsuario, setJSONUsuario] = useState<any>(
    localStorage.getItem("usuario")
  );
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;


  const schema = Yup.object().shape({
    nombreUsuario: Yup.string().required("El nombre de usuario es obligatorio"),
    clave: Yup.string().required("La contraseña es obligatoria"),
  });

  const verificarUsuario = async (usuario: UsuarioShort) => {
    const inputHash = MD5(usuario.clave).toString();
    const usuarioEncontrado = data.find(
      (actual: Usuario) => actual.nombreUsuario === usuario.nombreUsuario
    );
    if (usuarioEncontrado) {
      const storedHash = usuarioEncontrado.clave;
      if (inputHash === storedHash) {
        localStorage.setItem(
          "usuario",
          JSON.stringify(
            data.find(
              (actual: Usuario) =>
                actual.nombreUsuario === usuario.nombreUsuario
            )
          )
        );
        navigate("/menu", {
          replace: true,
          state: {
            logged: true,
            usuario: usuario,
          },
        });
      } else {
        console.log("Contraseña incorrecta"); // TODO que aparezca en el modal
      }
    } else {
      mostrarYEsconderAlerta();
    }
  };

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
          onSubmit={verificarUsuario}
          validationSchema={schema}
        >
          {(
            { errors, touched } // Obtener los errores y el estado de toque de los campos del formulario
          ) => (
            <Form className="card-body">
              <h1 className="card-title flex justify-center text-3xl font-extralight text-white mb-5">
                Iniciar Sesión
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
                <button
                  type="submit"
                  className="btn btn-outline w-full text-xl font-extralight"
                >
                  Ingresar
                </button>
                {mostrarAlerta && (
                  <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6 fill-white"
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
                    <span className="text-white">Error! Usuario no encontrado.</span>
                  </div>
                )}
              </div>
              <Link to={"/register"} className=" w-20">
                <button className="text-left font-thin ml-1 mt-2 w-auto hover:underline">
                  Registrarse
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
