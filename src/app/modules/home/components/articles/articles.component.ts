import { Component, OnInit } from '@angular/core';
import { RecentPost } from '../../../../core/models/RecentPost';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'home-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  articles: RecentPost[] = [];
    constructor(private articleService: ArticleService, private authService: AuthService) { }

    ngOnInit(): void {
      this.authService.getCurrentUser();

      this.articleService.getRecentArticles().subscribe(articles => {
        this.articles = articles;
        console.log(articles)
      });
    }
}
