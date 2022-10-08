import { AuthData } from "./auth-data.model";
import { Habitacion } from "./habitacion.model";
import { Invitado } from "./invitados.model";
import { Picture } from "./picture.model";


export interface Reserva {
    id?: string,
    checkIn:Date,
    checkOut:Date,
    paquete: string,
    invitados: Invitado[],
    petitorio: AuthData
    voucher?:string,
    habitacion:Habitacion,
    servicio:boolean
  }