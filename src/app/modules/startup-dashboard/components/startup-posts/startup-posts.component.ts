import { Component, OnInit } from '@angular/core';
import { StartupPostsService } from '../../services/startup-posts.service';
import { Post } from '../../models/Post';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-startup-posts',
  templateUrl: './startup-posts.component.html',
  styleUrl: './startup-posts.component.scss'
})
export class StartupPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private startupPosts: StartupPostsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.startupPosts.getStartupPosts().subscribe((data: Post[]) => {
      this.posts = data;

      for(let i = 0; i < this.posts.length; i++) {
        for(let j = 0; j < this.posts[i].odsList.length; j++) {
          this.authService.getImage('ods', this.posts[i].odsList[j].image).subscribe((image: string) => {
            this.posts[i].odsList[j].image = image;
          });
        }
      }
    });
  };

  deletePost(id: number): void {
    this.startupPosts.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      console.log('Post deleted');
    });
  }
}
