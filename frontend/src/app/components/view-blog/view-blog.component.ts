import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  blog: any = null;
  isAuthor: boolean = false;
  blogId: string | null = null;
  isEditing: boolean = false;
  editableTitle: string = '';
  editableContent: string = '';
  similarBlogs: any[] = [];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id');
      if (this.blogId) {
        this.blogService.getBlogById(this.blogId).subscribe((data: any) => {
          this.blog = data;

          // ✅ Compare username instead of email
          const loggedInUsername = localStorage.getItem('username');
          this.isAuthor = loggedInUsername === this.blog.username;
        });

        this.blogService.getSimilarBlogs(this.blogId).subscribe((similarBlogs: any[]) => {
          this.similarBlogs = similarBlogs;
        });
      }
    });
  }

  deleteBlog(): void {
    if (this.blogId) {
      this.blogService.deleteBlog(this.blogId).subscribe(() => {
        alert('Blog deleted successfully!');
        this.router.navigate(['/']);
      });
    } else {
      console.error('Blog ID is not available!');
    }
  }

  updateBlog(): void {
    this.isEditing = true;
    this.editableTitle = this.blog.title;
    this.editableContent = this.blog.content;
  }

  saveChanges(): void {
    if (this.blogId) {
      const updatedData = {
        title: this.editableTitle,
        content: this.editableContent
      };
      this.blogService.updateBlog(this.blogId, updatedData).subscribe((updatedBlog: any) => {
        this.blog = updatedBlog;
        this.isEditing = false;
      });
    } else {
      console.error('Blog ID is not available!');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
