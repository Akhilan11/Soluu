import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'blogs', component : AllBlogsComponent},
  {path : 'create', component : CreateBlogComponent},
  {path : 'blog/:id', component : ViewBlogComponent},
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
