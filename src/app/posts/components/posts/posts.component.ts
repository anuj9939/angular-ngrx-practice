import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as PostsActions from '../../store/actions';
import {
  apiStatusSelector,
  errorSelector,
  isLoadingSelector,
  postsSelector,
} from '../../store/selectors';
import { PostInterface } from '../../types/post.interface';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostInterface[]>;
  status$: Observable<string | undefined>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.posts$ = this.store.pipe(select(postsSelector));
    this.status$ = this.store.pipe(select(apiStatusSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
    setTimeout(() => {
      this.addPost();
    }, 2000);
    setTimeout(() => {
      this.updatePost();
    }, 5000);
    setTimeout(() => {
      this.deletePost();
    }, 8000);
  }
  addPost() {
    const payload: PostInterface = {
      id: '4',
      title: 'Abcdef',
    };
    this.store.dispatch(PostsActions.addPost({ posts: payload }));
  }
  updatePost() {
    const payload: PostInterface = { id: '3', title: 'Abef' };
    this.store.dispatch(PostsActions.updatePost({ posts: payload }));
  }
  deletePost() {
    const payload = { id: '3' };
    this.store.dispatch(PostsActions.deletePost(payload));
  }
}
