import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent {

  blogs: any[] = [];
  title: string = '';
  content: string = '';
  isEditing: boolean = false;
  editingId: string | null = null;

  username : string = localStorage.getItem('email') || 'Anonymous';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data: any) => {
      this.blogs = data;
    });
  }

  postBlog(): void {
    const blog = {
      username: this.username || 'Anonymous',
      title: this.title,
      content: this.content
    };

    this.blogService.postBlog(blog).subscribe((data: any) => {
      alert('Blog posted successfully!');
      this.blogs.unshift(data); // add to top
      this.resetForm();
    });
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      this.blogs = this.blogs.filter(blog => blog._id !== id);
      alert('Blog deleted successfully!');
    });
  }

  editBlog(blog: any): void {
    this.isEditing = true;
    this.editingId = blog._id;
    this.title = blog.title;
    this.content = blog.content;
  }

  updateBlog(): void {
    if (!this.editingId) return;

    const blog = {
      username: 'Anonymous',
      title: this.title,
      content: this.content
    };

    this.blogService.updateBlog(this.editingId, blog).subscribe((data: any) => {
      this.blogs = this.blogs.map(b => (b._id === this.editingId ? data : b));
      alert('Blog updated successfully!');
      this.resetForm();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.title = '';
    this.content = '';
  }
}