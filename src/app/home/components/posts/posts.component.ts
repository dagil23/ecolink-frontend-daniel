import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/AuthService.service';
import { PostService } from '../../../core/services/PostService.service';
import { RecentPost } from '../../../core/models/RecentPost';

@Component({
  selector: 'home-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: RecentPost[] = [];
  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser();

    this.postService.getRecentPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
