import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User.interfaces';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  users?: User[];

  constructor(userService : UserService,private router:Router) { 
    let that = this;
    userService.getAllUsers().subscribe({
      next(ret){
        that.users = ret as User[]
      }
    })
  }

  ngOnInit(): void {
  }

  goToProfil(id : number|undefined){
    if (typeof(id) == undefined) return;
    this.router.navigateByUrl(`profil/${id}`);
  }

}
