import { IDetallePedido } from "./IDetallePedido";

export interface IPedido {
    id: number,
    fecha: string,
    titulo: string,
    totalPedido: number,
    pedidoDetalles: IDetallePedido[]
}