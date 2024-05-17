import { iInstrumento } from "./iInstrumento";

export interface IDetallePedido {
    id: number,
    cantidad: number,
    instrumento: iInstrumento
}