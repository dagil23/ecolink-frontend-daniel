import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { RelevantPost } from '../../models/relevantPost';
import { PostDetails } from '../../models/postDetails';
import { Comment } from '../../models/Comment';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  messages: { [key: string]: { type: string; text: string } } = {};
  userLike: boolean = false;
  type: 'success' | 'warning' = 'success';
  postId!: string;
  post: PostDetails = {
    comments: [],
    description: '',
    id: 0,
    imageStartup: '',
    imageUrl: '',
    likesCount: 0,
    odsList: [],
    postDate: new Date(),
    shortDescription: '',
    startupName: '',
    title: '',
    likes: []
  };
  comments: Comment[] = [];
  relatedArticles: RelevantPost[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService, private commentService: CommentService, private likeService: LikeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';

    this.blogService.getPostById(this.postId).subscribe((post: PostDetails) => {
      this.post = post;
      this.userLikedPost();
      this.comments = post.comments || [];
      for (let i = 0; i < this.comments.length; i++) {
        this.authService.getImage('user', this.comments[i].imageUrl).subscribe((imageUrl: string) => {
          this.comments[i].imageUrl = imageUrl;
        });
      };
    });

    this.blogService.getRelevantPosts(this.postId).subscribe((posts: RelevantPost[]) => {
      this.relatedArticles = posts;
    });
  }

  userLikedPost(): void {
    this.authService.getCurrentUser().subscribe(user => {
      for(let i = 0; i < this.post.likes.length; i++) {
        if(this.post.likes[i].id_user === user.id) {
          this.userLike = true;
          break;
        }
      }
    })
  }

  addLike(idPost: number) {
    this.likeService.addLike(idPost).subscribe(data => {
      this.userLike = true;
      this.post.likesCount++;
      this.setMessage('like', 'Like created successfully', 'success');
    }, error => {
      this.setMessage('like', error.error.message, 'warning');
    })
  }

  removeLike(idPost: number) {
    this.likeService.removeLike(idPost).subscribe(data => {
      this.userLike = false;
      this.post.likesCount--;
      this.setMessage('like', 'Like deleted successfully', 'success');
    })
  }

  addComment(newComment: string) {
    if (!newComment.trim()) {
      this.setMessage('', 'Please enter a comment', 'warning');
      return;
    }
    this.commentService.addComment(this.postId, newComment).subscribe((data) => {
      // Agregamos el comentario a la lista de comentarios
      this.authService.getImage('user', data.comment.imageUrl).subscribe((imageUrl: string) => {
        data.comment.imageUrl = imageUrl
      });
      this.comments.push(data.comment);
      this.setMessage('comment', data.success.message, 'success');
    }, error => {
      this.setMessage('comment', error.error.message, 'warning')
    })
  }

  editComment(comment: any) {
    this.commentService.editComment(comment.id, comment.text).subscribe(data => {
      const index = this.comments.findIndex(c => c.id === comment.id);
      if(index !== -1) {
        this.comments[index].comment = comment.text;
      }
      this.setMessage('', data.success.message, 'success');
    })
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data) => {
      this.comments = this.comments.filter(comment => comment.id !== id);
      this.setMessage('', data.message, 'success');
    });
  }

  setMessage(key: string, text: string, type: string = 'success') {
    this.messages[key] = { type, text };

    setTimeout(() => {
      delete this.messages[key];
    }, 3000);
  }
}
