import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habitacion } from 'src/app/models/habitacion.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaEditComponent } from '../reserva-edit/reserva-edit.component';
interface carouselImage{
  imageSrc:string;
  imageAlt:string;
}


@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.css']
})
export class HabitComponent implements OnInit {

  @Input()indicators=true;

  selectedIndex=0;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.habitacion.imagenes)
  }

  selectedImage(index:number): void{
   this.selectedIndex=index; 
  }

  openDialogRes(){
    let dialogRef=this.dialog.open(ReservaEditComponent,{
      height:'max-content',
      panelClass: 'custom-dialog-container',
      data: this.data
    }) 
  }
}
