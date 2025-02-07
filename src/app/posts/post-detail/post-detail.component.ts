import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/PostService.service';
import { Post } from '../../core/models/Post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  postId: string | null = null;
  post!: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(this.postId).subscribe((post: Post) => {
      this.post = post;
    });
  }
}
