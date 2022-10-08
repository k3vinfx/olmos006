import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data.model';
import { Habitacion } from 'src/app/models/habitacion.model';
import { Invitado } from 'src/app/models/invitados.model';
import { Reserva } from 'src/app/models/reserva.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';

export interface InvitadoList {
  invitado:number;
  nombreapellido: string;
  ci: string;
  edad:number;
}

var inv_data: InvitadoList[]=[]




@Component({
  selector: 'app-reserva-edit',
  templateUrl: './reserva-edit.component.html',
  styleUrls: ['./reserva-edit.component.css']
})


export class ReservaEditComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  petitorio:any;
  invitList:Invitado[]=[];
  date = new FormControl(new Date());
  displayedColumns: string[] = ['nombreapellido', 'edad', 'ci','acciones'];
  dataSource! : MatTableDataSource<any>;

  reserva!:Reserva;
  habitacion!:Habitacion;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private reservaService:ReservaService, private authService:AuthService, private dialogRef:MatDialog) {
    this.habitacion=data.habitacion
   }


  ngOnInit(): void {
    this.petitorio=this.authService.getUser()
    console.log(this.petitorio)
    this.dataSource=new MatTableDataSource(inv_data);
    this.cargarInvitados(); 
    if (this.data.reserva){
      console.log(this.data.reserva)
    }
  }
  

  ngOnDestroy(): void{
    inv_data=[]
    this.dataSource=new MatTableDataSource(inv_data);
  }

  cargarInvitados(){
    if (this.data.reserva){
      const data=this.dataSource.data
      for(let i=0;i<this.data.reserva.invitados.length;i++){
        data.push({invitado:data.length, nombreapellido:this.data.reserva.invitados[i].nombreapellido, ci:this.data.reserva.invitados[i].ci,edad:this.data.reserva.invitados[i].edad})
      }
    } else {
      inv_data.push({invitado:0,nombreapellido:this.petitorio.nombre+" "+this.petitorio.apellido,ci:this.petitorio.ci,edad:this.petitorio.edad})
    }
    
  }

  anadirInvitado(form:NgForm){
    const data = this.dataSource.data;
    const found=data.find(element => element.nombreapellido ==form.value.nombreinv && element.ci ==form.value.ciinv)
    if(data.length<this.habitacion.capacidad && !found && form.value.edadinv && form.value.nombreinv && form.value.ciinv){
      data.push({invitado:data.length,nombreapellido:form.value.nombreinv,ci:form.value.ciinv,edad:form.value.edadinv});
      this.dataSource.data = data;
    }
  }

  borrarInvitado(index: number){
    const data = this.dataSource.data;
    this.dataSource.data=data.filter(row => row.invitado!=index);
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }



  async editReserva(form:NgForm){
    if (form.invalid) {
      return;
    }
    console.log(form.value.servicio)

    const datainv=this.dataSource.data
    this.invitList=datainv

    console.log(this.invitList)
  
    let reserva:Reserva= {
      checkIn:this.date.value,
      checkOut:form.value.checkout,
      paquete:form.value.estadiacat,
      invitados:this.invitList,
      habitacion:this.data.habitacion.id,
      petitorio: this.petitorio.id,
      servicio:form.value.servicio
    }

    if (this.data.reserva==null){
      let response= await this.reservaService.saveReserva(reserva)
      this.openDialog(response)
    } else {
      let response= await this.reservaService.updateReserva(reserva,this.data.reserva.id)
      this.openDialog(response)
    }
  }

  openDialog(mensaje:string){

  }

 
  
}
