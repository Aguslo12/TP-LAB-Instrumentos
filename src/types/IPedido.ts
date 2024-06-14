import { IDetallePedido } from "./IDetallePedido";

export interface IPedido {
    id: number,
    fecha: Date,
    titulo: string,
    totalPedido: number,
    pedidoDetalles: IDetallePedido[]
}