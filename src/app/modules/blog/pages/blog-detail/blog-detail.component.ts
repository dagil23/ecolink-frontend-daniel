import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/Post';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { RelevantPost } from '../../models/relevantPost';
import { PostDetails } from '../../models/postDetails';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  postId!: string;
  post: PostDetails | null = null;
  relatedArticles: RelevantPost[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    this.blogService.getPostById(this.postId).subscribe((post: PostDetails) => {
      this.post = post;
    });

    this.blogService.getRelevantPosts(this.postId).subscribe((posts: RelevantPost[]) => {
      this.relatedArticles = posts;
      console.log(this.relatedArticles)
    });
  }
}
