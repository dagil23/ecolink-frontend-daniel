import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../../services/PostService.service';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'home-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser();
    
    this.postService.getRecentPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
