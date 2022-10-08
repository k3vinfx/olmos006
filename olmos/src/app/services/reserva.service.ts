import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/auth-data.model';
import { Habitacion } from '../models/habitacion.model';
import { Invitado } from '../models/invitados.model';
import { Picture } from '../models/picture.model';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  url=environment.uri

  private reservas:Reserva[]=[];
  private fetchReservas=new Subject<Reserva[]>();
  err1=false;

  async saveReserva(reserva:Reserva){
    let mensage=''
    this.http.post<{mensaje:string,reserva:any}>(this.url+"reserva/", reserva)
   .subscribe(res=>{
    mensage=res.mensaje 
   }) 
   this.fetchReservas.next([...this.reservas])
   return mensage
  }

  getReservas(){
    this.http.get<{message:string, reserva: []}>(this.url+"reserva/")
      .pipe(map(
        responseData=>{
          console.log(responseData)
          return responseData.reserva.map(
            (reservaResp:{
              _id:string;
              checkIn:Date;
              checkOut:Date;
              paquete:string;
              invitados:Invitado[];
              petitorio:AuthData;
              voucher?: string;
              habitacion:Habitacion;
              servicio:boolean
              }) =>{
              return {
                id:reservaResp._id,
                checkIn:new Date(reservaResp.checkIn),
                checkOut:new Date(reservaResp.checkOut),
                paquete:reservaResp.paquete,
                invitados:reservaResp.invitados,
                petitorio: reservaResp.petitorio,
                voucher: reservaResp.voucher,
                habitacion:reservaResp.habitacion,
                servicio:reservaResp.servicio
              };
            }
          )

        })

  )
  .subscribe(transformedData=>{
    
    console.log(transformedData)
    this.reservas=transformedData;
    this.fetchReservas.next([...this.reservas])
    console.log(this.reservas)
  })
  }

  constructor(private http:HttpClient) { }

  getReservaListener(){
    return this.fetchReservas.asObservable()
  }

  async updateReserva(reserva:Reserva, id: string) {
    let mensage=''
    this.http
      .put<{message:string,reserva:any}>(this.url +"reserva/" +id, reserva)
      .subscribe(response => {
        mensage=response.message
        if(response.reserva){
          const updatedReservas = [...this.reservas];
          const oldAnimalIndex = updatedReservas.findIndex(a => a.id === reserva.id);
          updatedReservas[oldAnimalIndex] = reserva;
          this.reservas = updatedReservas;
          this.fetchReservas.next([...this.reservas]);
        }
      });
      return mensage
  }

  deleteReserva(reservaId:string){
    this.http
    .delete(this.url + "reserva/" + reservaId)
    .subscribe(() => {
      const updatedAnimals = this.reservas.filter(reserva => reserva.id !== reservaId);
      this.reservas = updatedAnimals;
      this.fetchReservas.next([...this.reservas]);
    });
  }

  sendPhoto(url:string,reserva:Reserva){
   
    let resSend:Reserva={
      checkIn:reserva.checkIn,
      checkOut:reserva.checkOut,
      habitacion:reserva.habitacion,
      invitados:reserva.invitados,
      paquete:reserva.paquete,
      petitorio:reserva.petitorio,
      servicio:reserva.servicio,
      voucher:url
    };

    this.http
      .put<{message:string,reserva:any}>(this.url +"reserva/" +reserva.id, resSend)
      .subscribe(response => {
        if(response.reserva){
          const updatedReservas = [...this.reservas];
          const oldAnimalIndex = updatedReservas.findIndex(a => a.id === reserva.id);
          updatedReservas[oldAnimalIndex] = resSend;
          this.reservas = updatedReservas;
          this.fetchReservas.next([...this.reservas]);
        }
      });
  }

}
