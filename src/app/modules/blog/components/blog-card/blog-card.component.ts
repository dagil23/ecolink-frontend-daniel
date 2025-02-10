import { Component, Input } from '@angular/core';
import { Post } from '../../../../core/models/Post';

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() article!: Post;
}
