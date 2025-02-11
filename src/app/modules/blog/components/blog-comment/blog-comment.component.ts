import { Component, Input, OnInit } from '@angular/core';
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
  @Input() comment!: Comment;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userId = user.id;
      this.isAdmin = user.userType === 'ADMIN';
    })
  }
}
