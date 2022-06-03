import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/Article.interface';
import { ArticleService } from '../service/Article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public articles : Article[]

  constructor(articleService : ArticleService) { 
    let that = this;
    this.articles = [];
    articleService.getAllArticles().subscribe({
      next(ret){
        that.articles = (ret as Article[]).slice(0,25);
      },
      error()
      {
        alert('Probleme de chargement');
      }
    })
  }
  ngOnInit(): void {
  }

}
