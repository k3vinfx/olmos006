import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { EmailValidator } from "@angular/forms";
import { AuthData } from "../models/auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  url="http://localhost:3000/api/usuarios"

  private isAuthenticated = false;
  private token: any;
  private userid:string='';
  private tokenTimer: any;
  private user:AuthData={nombre:"", apellido:"", ci:"", email: "", password: "", edad:0, access:""}
  private authStatusListener = new Subject<boolean>();
  
  constructor(private http: HttpClient, private router: Router) {}

  async register(name: string, apellido:string, ci:string, email: string, password: string,edad:number, access:string) {
    
    const authData: AuthData = { nombre:name, apellido:apellido, ci:ci, email: email, password: password, edad:edad, access:access };
    let respuesta='';
    let message=await this.http
      .post<{message:string,result:AuthData}>(this.url+'/', authData)
      .subscribe(response => {
        console.log(response.message)      
        respuesta=response.message
        if(response.result){ 
          this.router.navigate(['/']);
        } 
        return response.message
      });
    return message
  }

  async login(email: string, password: string) {
    const authData = { email: email, password: password };
    let respuesta='';
    this.http
      .post<{ usuarioSuccess:AuthData, token: string, usuarioId:string; expiresIn: number, message:string }>(
        this.url+'/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        const user = response.usuarioSuccess;
        const usuid=response.usuarioId;
        const message=response.message;
        respuesta=message
        console.log(message)
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.user=user;
          this.user.id=usuid;
          this.saveAuthData(user, token, expirationDate);
          this.router.navigate(['/menu-prin']);
        }
      });
      return respuesta
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthData(user:AuthData, token: string, expirationDate: Date) {
    if (user.id){
      localStorage.setItem("userId", user.id);
    }
    localStorage.setItem("userName", user.nombre);
    localStorage.setItem("userApellido", user.apellido);
    localStorage.setItem("userCi", user.ci);
    localStorage.setItem("userEdad", user.edad.toString());
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userPassword", user.email);
    localStorage.setItem("userAccess", user.access);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userApellido");
    localStorage.removeItem("userAccess");
    localStorage.removeItem("userCi");
    localStorage.removeItem("userEdad");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  getUser(){
    return this.user;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    let nombre="";
    let apellido="";
    let ci="";
    let password="";
    let email="";
    let access="";
    let id="";
    let edad="";

    if (!authInformation) {
      return;

    }
    if(authInformation){
      nombre=authInformation.nombre;
      apellido=authInformation.apellido;
      ci=authInformation.ci;
      password=authInformation.password;
      email=authInformation.email;
      access=authInformation.access;
      id=authInformation.id;
      edad=authInformation.edad;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.user={id:id,nombre:nombre, apellido:apellido, ci:ci,password:password,email:email,edad:parseInt(edad),access:access}
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const nombre = localStorage.getItem("userName");
    const apellido=localStorage.getItem("userApellido");
    const access= localStorage.getItem("userAccess");
    const ci=localStorage.getItem("userCi");
    const email=localStorage.getItem("userEmail");
    const password=localStorage.getItem("userPassword");
    const id=localStorage.getItem("userId");
    const edad=localStorage.getItem("userEdad")

    if (!token || !expirationDate || !nombre || !email || !access || !apellido || !password ||!ci || !id || !edad) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      nombre,
      apellido,
      ci,
      email,
      password,
      access,
      edad,
      id
    }
  }

 async getUserEmail(email:string){
  let isUsersExists=false;
    this.http
      .get<{message:string, users:AuthData[] }>(
        this.url+'/').subscribe(transformedData=>{
          for(let i=0; i<transformedData.users.length;i++){
            console.log(email+" / "+transformedData.users[i].email)
            if(transformedData.users[i].email===email){       
              console.log("SI ES")
              isUsersExists=true;
            }
      }
    })
    return isUsersExists;
  }
}
