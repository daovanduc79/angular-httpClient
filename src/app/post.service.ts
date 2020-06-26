import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.API_URL)
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.httpClient.post<IPost>(this.API_URL, post);
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }

  getPostById(id: number): Observable<IPost>{
    return this.httpClient.get<IPost>(`${this.API_URL}/${id}`);
  }

  updatePost(post: Partial<IPost>): Observable<IPost> {
    return this.httpClient.patch<IPost>(`${this.API_URL}/${post.id}`, post);
  }

}
