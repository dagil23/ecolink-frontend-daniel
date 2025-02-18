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
      this.articles.forEach(article => {
        this.authService.getImage('user', article?.imageUrl).subscribe((imageUrl: string) => {
          article.imageUrl = imageUrl;
        });
      });
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
