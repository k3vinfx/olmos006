import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Habitacion } from 'src/app/models/habitacion.model';
import { Reserva } from 'src/app/models/reserva.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { RouteService } from 'src/app/services/route.service';
import { HabitDeleteComponent } from '../../dialogs/habit-delete/habit-delete.component';
import { HabitComponent } from '../../dialogs/habit/habit.component';
import { ReservComponent } from '../../dialogs/reserv/reserv.component';
import { ReservaEditComponent } from '../../dialogs/reserva-edit/reserva-edit.component';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.css']
})
export class ListReservasComponent implements OnInit {
  private reservasSub!: Subscription;
  reservas:Reserva[]=[];
  mode: any;
  userid: any;
  filter: string='';
  resvou:boolean=false;
  constructor(private r:RouteService, public router:Router,public dialog: MatDialog, public reservaService:ReservaService, private authService:AuthService) { }


  ngOnInit(): void {
    this.mode=this.authService.getUser().access
    this.userid=this.authService.getUser().ci
   this.cargarReservas(this.filter,this.resvou) 
  }

  applyFilter(filterValue: string) {
    this.filter=filterValue;
    this.cargarReservas(this.filter,this.resvou)
  }

  getModeRes(mode:string,res:boolean){
    this.resvou=res
    this.cargarReservas(this.filter,this.resvou)
  }

  cargarReservas(filterValue:string,resis:boolean){
    this.reservaService.getReservas()
    this.reservasSub = this.reservaService.getReservaListener()
    .subscribe((reserva:Reserva[])=>{
      this.reservas=reserva;
      if(filterValue!=''){
        this.reservas=this.reservas.filter(reserva => reserva.petitorio.apellido.includes(filterValue))
      }
      if(resis){
        this.reservas=this.reservas.filter(reserva => reserva.voucher!=null)
      } else {
        this.reservas=this.reservas.filter(reserva => reserva.voucher==null)
      }
      console.log(this.userid, this.mode)
      if(this.mode=='cliente'){
        this.reservas=this.reservas.filter(reserva=> reserva.petitorio.ci==this.userid)
      }
    })
  }

  openDialogHab(habitacion:Habitacion){
    let dialogRef=this.dialog.open(HabitComponent,{
      height:'max-content',
      panelClass: 'custom-dialog-container',
      data: {
        habitacion:habitacion,
        mode:this.mode
      }
    }) 
   }

   openDialogRes(reserva:Reserva){
    let dialogRef=this.dialog.open(ReservComponent,{
      height:'max-content',
      panelClass: 'custom-dialog-container',
      data:{
        reserva:reserva,
        mode:this.mode
      }
    }) 
   }

   openDialogEdit(reserva:Reserva){
    let dialogRef=this.dialog.open(ReservaEditComponent,{
      height:'max-content',
      panelClass: 'custom-dialog-container',
      data:{
        habitacion:reserva.habitacion,
        reserva:reserva
      }
    }) 
 }

  openDialogDelete(reserva:Reserva){
    let dialogRef=this.dialog.open(HabitDeleteComponent,{
      height:'max-content',
      panelClass: 'confirm-dialog-container',
      data:{
        message:"pi"
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==true){
        if(typeof reserva.id=='string'){
          this.reservaService.deleteReserva(reserva.id)
          this.cargarReservas('',this.resvou)
        }    
      }
    })
  }

}
