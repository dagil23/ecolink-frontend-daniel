import { Component, Input } from '@angular/core';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent {
  @Input() comment!: Comment;
}
