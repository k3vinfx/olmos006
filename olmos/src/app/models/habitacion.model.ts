import { Picture } from "./picture.model"

export interface Habitacion{
    id?:string,
    nombre:string,
    precio:number,
    categoria:string,
    piso:number,
    bloque:string,
    capacidad:number,
   imagenes: string[],
   estado:string
}