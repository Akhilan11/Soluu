import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CreateBlogComponent,
    AllBlogsComponent,
    ViewBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
