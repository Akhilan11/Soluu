import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {

  title: string = '';
  content: string = '';
  username : string = localStorage.getItem('email') || 'Anonymous';

  constructor(private blogService: BlogService) {}

  postBlog(): void {
    const Blog = {
      title: this.title,
      content: this.content,
      username : localStorage.getItem('email') || 'Anonymous'
    }

    this.blogService.postBlog(Blog).subscribe((data: any) => {
      alert('Blog posted successfully!');
      this.title = '';
      this.content = '';
    });

  }

}
