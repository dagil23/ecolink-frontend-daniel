import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/Post';
import { BlogService } from '../../services/blog.service';
import { Pagination } from '../../../../core/models/Pagination';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  articles: Post[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.blogService.getPosts(this.currentPage, 6).subscribe((data: Pagination<Post>) => {
      this.articles = data.content;
      console.log(this.articles)
      for(let i = 0; i < this.articles.length; i++) {
        this.authService.getImage('post', this.articles[i]?.imageUrl).subscribe((imageUrl: string) => {
          this.articles[i].imageUrl = imageUrl;
        });

        for (let j = 0; j < this.articles[i].odsList.length; j++) {
          this.authService.getImage('ods', this.articles[i].odsList[j].image).subscribe((imageUrl: string) => {
            this.articles[i].odsList[j].image = imageUrl;
          });
        }
      };
      this.totalPages = data.totalPages;
    }, () => {
      alert('Error al obtener las startups');
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadArticles();
  }
}
