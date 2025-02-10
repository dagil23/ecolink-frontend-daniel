import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/Post';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  postId: string | null = null;
    post!: Post;

    constructor(private route: ActivatedRoute, private blogService: BlogService) {}

    ngOnInit(): void {
      this.postId = this.route.snapshot.paramMap.get('id');
      this.blogService.getPostById(this.postId).subscribe((post: Post) => {
        this.post = post;
      });
    }
}
