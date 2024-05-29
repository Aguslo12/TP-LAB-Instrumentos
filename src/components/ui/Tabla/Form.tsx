import React, { FC, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { ICategoria } from '../../../types/ICategoria';
import { iInstrumento } from '../../../types/iInstrumento';
import { getCategorias, postInstrumento } from '../../APIS/fetch';
import { IFormInstrumento } from '../../../types/IFormInstrumento';



const FormInstrumento: FC<IFormInstrumento> = ({ open, setOpen, values }) => {

    const enviar = async (instrumento: iInstrumento) => {
        const response = await postInstrumento(instrumento);
    }

    const [data, setData] = useState<ICategoria[]>([]);

    const traerCategorias = async () => {
        const response  = await getCategorias()
        setData(response)
    }

    useEffect(() => {
        traerCategorias()
    }, [])

    const handleSubmit = async (values: iInstrumento) => {
        if (values.costoEnvio == 0){
            values.costoEnvio = "G"
        }
        await enviar(values);
        setOpen(false);
    };

    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>

            <Form className='inset-0 flex items-center justify-center fixed bg-slate-950 bg-opacity-85 z-50 pb-20'>

                <div className='flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-900 to-slate-700 w-2/5 rounded-md'>


                    <div className=' flex flex-col md:flex-row md:space-x-4  self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="instrumento" className='text-start font-bold text-slate-100 pb-2'>Instrumento:</label>
                            <Field id="instrumento" required type="text" name="instrumento" placeholder={values.instrumento} className="p-2 outline-none border-b bg-white focus:border-black text-black" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="marca" className='text-start font-bold text-slate-100 pb-2'>Marca:</label>
                            <Field id="marca" name="marca" type="text" required placeholder={values.marca} className="p-2 outline-none border-b transition-all bg-white focus:border-black text-black" />
                        </div>
                    </div>

                    <div className=' flex flex-col md:flex-row md:space-x-4  self-center my-4'>

                        <div className='flex flex-col justify-start'>
                            <label htmlFor="modelo" className='text-start font-bold text-slate-100 pb-2'>Modelo:</label>
                            <Field id="modelo" name="modelo" type="text" required placeholder={values.modelo} className="p-2 outline-none border-b bg-white focus:border-black transition-all text-black" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="imagen" className='text-start font-bold text-slate-100 pb-2'>Imagen:</label>
                            <Field id="imagen" name="imagen" type="text" required placeholder="URL DE LA IMAGEN" className="p-2 outline-none bg-white focus:border-black transition-all text-black" />
                        </div>
                    </div>


                    <div className=' flex flex-col md:flex-row md:space-x-4  self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="precio" className='text-start font-bold text-slate-100 pb-2'>Precio:</label>
                            <Field id="precio" name="precio" type="number" required placeholder={values.precio} className="p-2 outline-none border-b bg-white focus:border-black transition-all text-black" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="costoEnvio" className='text-start font-bold text-slate-100 pb-2'>Costo Envío:</label>
                            <Field id="costoEnvio" name="costoEnvio" type="number" required placeholder={values.costoEnvio} className="p-2 outline-none border-b bg-white focus:border-black transition-all text-black" />
                        </div>
                    </div>


                    <div className=' flex flex-col md:flex-row md:space-x-4  self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="cantidadVendida" className='text-start font-bold text-slate-100 pb-2'>Cantidad Vendida:</label>
                            <Field id="cantidadVendida" name="cantidadVendida" required type="number" placeholder={values.cantidadVendida} className="p-2 outline-none border-b bg-white focus:border-black transition-all text-black" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="descripcion" className='text-start font-bold text-slate-100 pb-2'>Descripción:</label>
                            <Field id="descripcion" name="descripcion" type="text" required placeholder={values.descripcion} className="p-2 outline-none border-b bg-white focus:border-black transition-all text-black" />
                        </div>
                    </div>


                    <div className=' flex flex-col md:flex-row md:space-x-4   self-center my-4'>
                        <div className='flex flex-col w-full '>
                            <label htmlFor="categoria" className='text-xl font-bold text-slate-100'>Categoría:</label>
                            <Field as="select" id="categoria" name="categoria.id" className="p-4 m-2 active:scale-90 transition-all bg-white focus:border-black text-black">
                                {data.map((i: ICategoria) =>
                                    <option key={i.id} value={i.id.toString()}>{i.descripcion}</option>
                                )}
                            </Field>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-4'>
                        <button type="submit"
                            className='bg-green-500 p-3 rounded-md text-white font-bold active:scale-95 transition-all mb-5'>
                            Enviar
                        </button>
                        <button className='bg-red-500 p-3 rounded-md text-white font-bold active:scale-95 transition-all mb-5'
                            onClick={() => setOpen(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>

            </Form>
        </Formik>
    );
};

export default FormInstrumento;