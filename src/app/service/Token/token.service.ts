import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/User.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private myUser? : User;
  private token : string;

  constructor() {
    this.token = sessionStorage.getItem("token") ?? "";
    this.myUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) :  undefined;
  }
  
  getToken(): string{
    return this.token;
  }
  setToken(token : string) : void{
    this.token = token;
    sessionStorage.setItem("token",this.token)
  }
  getMyUser() : User | undefined{
    return this.myUser
  }
  setMyUser(user : User|undefined){
    this.myUser = user;
    sessionStorage.setItem("user",JSON.stringify(this.myUser))
  }
}
