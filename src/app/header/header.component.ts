import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/Token/token.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService : TokenService ,private userService : UserService, private router : Router) {
   }
   ngOnInit(): void {
       
   }
  getConnected(){
    return this.tokenService.getToken() != "";
  }
  disconnect(){
    this.userService.disconnectUser();
  }
  goProfil(){
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/profil/${this.tokenService.getMyUser()?.id}`);
    });
  }

}
