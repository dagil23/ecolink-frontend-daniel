import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { RelevantPost } from '../../models/relevantPost';
import { PostDetails } from '../../models/postDetails';
import { Comment } from '../../models/Comment';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  message: string = '';
  type: 'success' | 'warning' = 'success';
  postId!: string;
  post: PostDetails | null = null;
  comments: Comment[] = [];
  relatedArticles: RelevantPost[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService, private commentService: CommentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';

    this.blogService.getPostById(this.postId).subscribe((post: PostDetails) => {
      this.post = post;
      this.comments = post.comments || [];

      for(let i = 0; i < this.comments.length; i++) {
        this.authService.getImage('user', this.comments[i].imageUrl).subscribe((imageUrl: string) => {
          this.comments[i].imageUrl = imageUrl;
        });
      };
    });

    this.blogService.getRelevantPosts(this.postId).subscribe((posts: RelevantPost[]) => {
      this.relatedArticles = posts;
    });
  }

  addComment(newComment: string) {
    if( !newComment.trim()) {
      this.alert('Please enter a comment', 'warning');
      return ;
    }
    this.commentService.addComment(this.postId, newComment).subscribe((data) => {
      console.log(data)
      this.alert('Comment successfully added', 'success');
    }, error => {
      this.alert(error.error.message, 'warning')
    })
  }

  alert(message: string, type: 'success' | 'warning') {
    this.type = type;
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
