import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  {path:"",component: LoginComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"articles",component: HomeComponent},
  {path:"profil/:id",component : ProfilComponent},
  {path:"users",component : UsersPageComponent},
  {path:"article/edit/:id",component : EditArticleComponent},
  {path:"comment/edit/:id",component : EditCommentComponent},
  {path:"profil/edit/:id",component : EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
