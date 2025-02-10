import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/Post';
import { BlogService } from '../../services/blog.service';
import { Pagination } from '../../../../core/models/Pagination';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  articles: Post[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getPosts(this.currentPage, 8).subscribe((data: Pagination<Post[]>) => {
      console.log(data);
    });
  }
}
