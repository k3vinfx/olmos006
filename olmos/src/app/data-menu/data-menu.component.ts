import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-data-menu',
  templateUrl: './data-menu.component.html',
  styleUrls: ['./data-menu.component.css']
})
export class DataMenuComponent implements OnInit {

  @Input()imagesHab:string[]=[
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag1.jpeg?alt=media&token=ae30a279-39e6-4bbf-933b-a85a862096f5",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag11.jpeg?alt=media&token=ddfb83cd-c431-4287-837b-68f2533f2817",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag12.jpeg?alt=media&token=0b7585e4-1d88-4ee6-99e2-cb02426c1a5f",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag10.jpeg?alt=media&token=3153f8b6-1529-4116-b512-7ecd89f31126",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag3.jpeg?alt=media&token=29e015c8-cf84-4c34-8cd5-d2e01715540f",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F1dorm%2Fimag4.jpeg?alt=media&token=05907798-e8ab-4bf9-99a6-92f21eb44d9c",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F1dorm%2Fimag6.jpeg?alt=media&token=5787fe42-e849-4263-a2e7-18f2bc0234c3",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F1dorm%2Fimag8.jpeg?alt=media&token=4f7a9c49-aa52-4e36-b810-857ce14f7f9b",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F1dorm%2Fimag1.jpeg?alt=media&token=4a7bb4b1-507f-41d4-92ea-d2748e26ffe3",
    ];
  @Input()imagesExt:string[]=[
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel1.jpeg?alt=media&token=170e3b00-815b-44b7-a163-3df6359cf0b9",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel3.jpeg?alt=media&token=e4bd81a3-1393-4871-ac36-17f073af17e5",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel2.jpeg?alt=media&token=13f96372-506f-4b40-a100-d3438e87e1e2",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel5.jpeg?alt=media&token=78e37ab6-40ba-42d6-9d4c-803951609daa",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/habitaciones%2F2dorm%2Fimag8.jpeg?alt=media&token=76ad3af9-a479-45f5-a9ef-4035b46da1b2",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel7.jpeg?alt=media&token=5edd0b1b-748a-4082-8b45-e279f24e53f0",
    "https://firebasestorage.googleapis.com/v0/b/deploy-pasantia.appspot.com/o/hotel%2Fhotel9.jpeg?alt=media&token=46ac56cd-e2eb-4b0e-8123-1c755d8d5dd1"
  ];

  @Input()indicators1=true;
  selectedIndex1=0;

  @Input()indicators2=true;
  selectedIndex2=0;


  constructor() { }


  selectedImage1(index:number): void{
    this.selectedIndex1=index; 
   }

   selectedImage2(index:number): void{
    this.selectedIndex2=index; 
   }

  ngOnInit(): void {
  }

}
