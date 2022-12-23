import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PostsService } from '../services/posts.service';

import * as PostsActions from './actions';

@Injectable()
export class PostsEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => PostsActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addPost),
      mergeMap((action) => {
        return this.postsService.addPosts(action.posts).pipe(
          map((posts) => {
            console.log({ ...state });
            return PostsActions.addPostsSuccess({ ...state, posts });
          }),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      mergeMap((action) => {
        return this.postsService.updatePosts(action.posts).pipe(
          map((posts) => {
            console.log(posts);
            return PostsActions.updatePostSuccess({ ...state, posts });
          }),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      mergeMap((action) => {
        return this.postsService.deletePosts(action.id).pipe(
          map((posts) => {
            return PostsActions.deletePostSuccess({ ...state, ...posts });
          }),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
