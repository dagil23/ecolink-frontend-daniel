import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/PostService.service';

@Component({
  selector: 'related-posts',
  templateUrl: './related-posts.component.html',
  styleUrl: './related-posts.component.scss'
})
export class RelatedPostsComponent implements OnInit {

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
