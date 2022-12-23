import { createAction, props } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';

export const getPosts = createAction('[Posts] Get Posts');
export const getPostsSuccess = createAction(
  '[Posts] Get Posts success',
  props<{ posts: PostInterface[] }>()
);
export const addPost = createAction(
  '[Posts] Add Posts',
  props<{ posts: PostInterface }>()
);
export const addPostsSuccess = createAction(
  '[Posts] Add Posts success',
  props<{ posts: PostInterface }>()
);

export const updatePost = createAction(
  '[Posts] Update Posts',
  props<{ posts: PostInterface }>()
);

export const updatePostSuccess = createAction(
  '[Posts] Update Posts success',
  props<{ posts: PostInterface }>()
);

export const deletePost = createAction(
  '[Posts] Delete Posts',
  props<{ id: string }>()
);

export const deletePostSuccess = createAction(
  '[Posts] Delete Posts success',
  props<{ id: string }>()
);

export const getPostsFailure = createAction(
  '[Posts] Get Posts failure',
  props<{ error: string }>()
);
