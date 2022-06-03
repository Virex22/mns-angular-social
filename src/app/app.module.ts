import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ProfilComponent } from './profil/profil.component';
import { FormArticleComponent } from './form-article/form-article.component';
import { FormCommentaireComponent } from './form-commentaire/form-commentaire.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ArticleComponent,
    CommentaireComponent,
    ProfilComponent,
    FormArticleComponent,
    FormCommentaireComponent,
    UsersPageComponent,
    EditArticleComponent,
    EditCommentComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
