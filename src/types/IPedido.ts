import { IDetallePedido } from "./IDetallePedido";

export interface IPedido {
    id: number,
    fecha: string,
    totalPedido: number,
    pedidoDetalles: IDetallePedido[]
}