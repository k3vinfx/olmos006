import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservaService } from 'src/app/services/reserva.service';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-reserv',
  templateUrl: './reserv.component.html',
  styleUrls: ['./reserv.component.css']
})
export class ReservComponent implements OnInit {
  
  photoSelected:string | ArrayBuffer| any;
  path:String='';
  pathname:String='';
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private reservaService:ReservaService, private af:AngularFireStorage) { }

  ngOnInit(): void {
    console.log()
  }

  reservaShortID(id:string){
    return id.substring(0,3)
  }
  

  onFileSelected(event: any) {
    const file= <File>event.target.files[0];
    this.path=event.target.files[0];
    this.pathname=file.name
    if (file) {      
        const reader= new FileReader()
        reader.onload= e => this.photoSelected = reader.result;
        reader.readAsDataURL(file)  
    }
}

sendImage(){

  var pf="voucher/"+this.pathname
  const fileRef=this.af.ref(pf)
  
  this.af.upload(pf,this.path).snapshotChanges().pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe((url)=>{
        this.reservaService.sendPhoto(url,this.data.reserva)
      })
    })
    ).subscribe();

}

  
}
