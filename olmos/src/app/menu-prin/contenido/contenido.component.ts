import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  reservaLab:string='';
  habitacionLab:string='';
  mode:any;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.mode=this.authService.getUser().access

    if(this.mode=='admin'){
      this.reservaLab="Reservas"
      this.habitacionLab="Habitaciones"
    } else if (this.mode=='cliente'){
      this.reservaLab="Mis reservas"
      this.habitacionLab="Habitaciones"
    } else if (this.mode=='empleado'){
      this.reservaLab="Reservas registradas"
      this.habitacionLab="Habitaciones"
    } 
  }

}
