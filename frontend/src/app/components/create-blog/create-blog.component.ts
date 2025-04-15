import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import emailjs from '@emailjs/browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  title: string = '';
  content: string = '';
  username: string = localStorage.getItem('username') || 'Anonymous';

  emails: string[] = [];

  constructor(private blogService: BlogService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUserEmails().subscribe((data: any) => {
      this.emails = data
    });
  }

  postBlog(): void {
    const Blog = {
      title: this.title,
      content: this.content,
      username: this.username
    };

    // Post the blog via the BlogService
    this.blogService.postBlog(Blog).subscribe((data: any) => {
      alert('Blog posted successfully!');
      this.title = '';
      this.content = '';

      // Loop through the emails and send an email to each user
      this.emails.forEach((email) => {
        const templateParams = {
          username: Blog.username,
          title: Blog.title,
          content: Blog.content,
          email: email // Send the email to each user
        };

        console.log('Sending email to:', email); // Log the email being sent

        // Send email using EmailJS
        emailjs.send(
          'Soluu',         // Replace with your actual EmailJS service ID
          'template_5u6r6lp',  // Replace with your actual EmailJS template ID
          templateParams,
          'jQvjgy5-US_XOvdhT'  // Replace with your actual EmailJS public key
        ).then((response) => {
          console.log('✅ Email sent successfully!', response.status, response.text);
        }).catch((error) => {
          console.error('❌ Failed to send email:', error);
        });
      });
    });
  }
}
