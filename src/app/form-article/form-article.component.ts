import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../service/Article/article.service';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  
  articleForm : FormGroup;
  showError = {
    titre : false,
    message : false
  }

  constructor(formBuilder : FormBuilder,private articleService : ArticleService,private router : Router) { 
    this.articleForm = formBuilder.group({
      titre: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
      ]),
      message: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
      ]),
    })
  }

  ngOnInit(): void {
  }
  validForm(){
    let that = this;
    this.showError.titre = !this.articleForm.get("titre")?.valid as boolean;
    this.showError.message = !this.articleForm.get("message")?.valid as boolean;
    if (this.articleForm.valid) {
      this.articleService.postArticle({
        titre : this.articleForm.value.titre,
        contenu: this.articleForm.value.message,
        creation: new Date()
      });
      that.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        that.router.navigateByUrl('/articles');
      }); 
    }
  }
}
