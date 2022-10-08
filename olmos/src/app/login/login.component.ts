import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let mesaje= await this.authService.login(form.value.email, form.value.password);
    if (mesaje!='Bienvenido'){
      console.log("No")
    }
  }

}
