import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url : string = "http://localhost:5000/api/blogs";

  constructor(private http : HttpClient) { }

  // Helper: Get JWT token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwttoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getBlogs() : Observable<any> {
    return this.http.get(this.url);
  }

  postBlog(blog : any) : Observable<any> {
    return this.http.post(this.url, blog, {
      headers: this.getAuthHeaders()
    });
  }

  deleteBlog(id : any) : Observable<any> {
    return this.http.delete(this.url + '/' + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateBlog(id : any, blog : any) : Observable<any> {
    return this.http.put(this.url + '/' + id, blog, {
      headers: this.getAuthHeaders()
    });
  }

  getBlogById(id : any) : Observable<any> {
    return this.http.get(this.url + '/' + id, {
      headers: this.getAuthHeaders()
    });
  }

}

