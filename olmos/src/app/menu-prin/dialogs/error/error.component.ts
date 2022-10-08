import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef:MatDialogRef<ErrorComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }


  closeDialog() {
    this.dialogRef.close(false);
  }
}
