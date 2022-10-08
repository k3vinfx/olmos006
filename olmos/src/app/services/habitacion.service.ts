import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private habitaciones:Habitacion[]=[];
  private fetchhabitaciones=new Subject<Habitacion[]>();
  url="http://localhost:3000/api/habitacion"
  
  constructor(private http:HttpClient) { }

  getHabitaciones(){
    this.http.get<{message:string, habitacion: []}>(this.url+"/")
      .pipe(map(
        responseData=>{
          console.log(responseData)
          return responseData.habitacion.map(
            (habitacionResp:{
              _id:string,
              nombre:string,
              precio:number,
              categoria:string,
              piso:number,
              bloque:string,
              capacidad:number,
              imagenes:string[],
              estado:string
              }) =>{
              return {
                id:habitacionResp._id,
                nombre:habitacionResp.nombre,
                precio:habitacionResp.precio,
                categoria:habitacionResp.categoria,
                piso:habitacionResp.piso,
                bloque:habitacionResp.bloque,
                capacidad:habitacionResp.capacidad,
                imagenes:habitacionResp.imagenes,
                estado:habitacionResp.estado
              };
            }
          )

        })

  )
  .subscribe(transformedData=>{
    console.log(transformedData)
    this.habitaciones=transformedData;
    this.fetchhabitaciones.next([...this.habitaciones])
    console.log(this.habitaciones)
  })
  }

  getHabitacionListener(){
    return this.fetchhabitaciones.asObservable()
  }
}
