import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'blog-add-comment',
  templateUrl: './blog-add-comment.component.html',
  styleUrl: './blog-add-comment.component.scss'
})
export class BlogAddCommentComponent {
  commment: string = '';
  @Output() commentAdded = new EventEmitter<string>();

  constructor() { }

  onSubmit(event: Event) {
    event.preventDefault();
    this.commentAdded.emit(this.commment);
    this.commment = '';
  }
}
