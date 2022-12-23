import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PostInterface } from '../types/post.interface';

@Injectable()
export class PostsService {
  posts: PostInterface[] = [
    { id: '1', title: 'First post' },
    { id: '2', title: 'Second post' },
    { id: '3', title: 'Third post' },
  ];
  getPosts(): Observable<PostInterface[]> {
    return of(this.posts).pipe(delay(2000));
  }
  addPosts(post: PostInterface): Observable<PostInterface> {
    this.posts = [...this.posts, post];
    return of(post).pipe(delay(1000));
  }
  updatePosts(post: PostInterface): Observable<PostInterface> {
    const mapData = this.posts.map((d) =>
      d.id == post.id ? { ...d, title: post.title } : d
    );
    this.posts = mapData;
    return of(post).pipe(delay(1000));
  }
  deletePosts(id: string): Observable<{ id: string }> {
    const filterData = this.posts.filter((d) => d.id != id);
    console.log(filterData);
    this.posts = [...filterData];
    return of({ id }).pipe(delay(1000));
  }
}
