export interface iInstrumento {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  activo: boolean;
  categoria: {
    id: number;
    descripcion: string;
  }
}