import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouteService } from 'src/app/services/route.service';
import { HabitComponent } from '../../dialogs/habit/habit.component';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { Habitacion } from 'src/app/models/habitacion.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-habitaciones',
  templateUrl: './list-habitaciones.component.html',
  styleUrls: ['./list-habitaciones.component.css']
})
export class ListHabitacionesComponent implements OnInit {
  private habitacionSub!: Subscription;
  habitaciones:Habitacion[]=[];
  mode:any

  headRoute:string="";
  constructor(private habitacionService:HabitacionService, private r:RouteService, public router:Router,public dialog: MatDialog,private authService:AuthService) { }

  ngOnInit(): void {
    this.mode=this.authService.getUser().access
    this.getHabitacion(this.mode,'Disponible')
  }

  getHabitacion(mode:string,filter:string){
    this.habitacionService.getHabitaciones()
    this.habitacionSub = this.habitacionService.getHabitacionListener()
    .subscribe((habitacion:Habitacion[])=>{
      this.habitaciones=habitacion;
        if (filter!=''){
          this.habitaciones=this.habitaciones.filter(reserva => reserva.estado==filter);
        }
    })
  }

  openDialog(habitacion:Habitacion){
  let dialogRef=this.dialog.open(HabitComponent,{
    height:'max-content',
    panelClass: 'custom-dialog-container',
    data: {
        habitacion:habitacion,
        mode:this.mode
      }
  }) 
  }
}
