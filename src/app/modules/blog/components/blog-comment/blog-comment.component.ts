import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../models/Comment';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent implements OnInit {
  userId: number | null = null;
  isAdmin: boolean = false;
  editingCommentId: number | null = null;
  editedComment: string = '';

  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<number>();
  @Output() editComment = new EventEmitter<{ id: number; text: string }>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userId = user.id;
      this.isAdmin = user.userType === 'ADMIN';
    })
  }

  edit(comment: any) {
    this.editingCommentId = comment.id;
    this.editedComment = comment.comment;
  }

  delete(id: number) {
    this.deleteComment.emit(id);
  }

  saveEditedComment() {
    if (this.editedComment.trim() === '') return;

    this.editComment.emit({ id: this.comment.id, text: this.editedComment });
    this.editingCommentId = null;
  }
}
