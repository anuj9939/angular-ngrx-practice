import { createReducer, on } from '@ngrx/store';
import { PostsStateInterface } from '../types/postsState.interface';
import * as PostsActions from './actions';

export const initialState: PostsStateInterface = {
  isLoading: false,
  posts: [],
  error: null,
  status: 'No API Call',
};

export const reducers = createReducer(
  initialState,
  on(PostsActions.getPosts, (state) => ({
    ...state,
    isLoading: true,
    status: 'Get Post',
  })),
  on(PostsActions.getPostsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    status: 'Get Post Success',
    posts: action.posts,
  })),
  on(PostsActions.addPost, (state) => ({
    ...state,
    isLoading: true,
    status: 'Add Post',
  })),
  on(PostsActions.addPostsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      status: 'Add Post Success',
      posts: [...state.posts, action.posts],
    };
  }),
  on(PostsActions.updatePost, (state) => ({
    ...state,
    isLoading: true,
    status: 'Update Post',
  })),
  on(PostsActions.updatePostSuccess, (state, action) => {
    const mapData = state.posts.map((d) =>
      d.id == action.posts.id ? { ...d, title: action.posts.title } : d
    );
    return {
      ...state,
      isLoading: false,
      status: 'Update Post Success',
      posts: [...mapData],
    };
  }),

  on(PostsActions.deletePost, (state) => ({
    ...state,
    isLoading: true,
    status: 'Delete Post',
  })),
  on(PostsActions.deletePostSuccess, (state, action) => {
    const filterData = state.posts.filter((d) => d.id != action.id);
    return {
      ...state,
      isLoading: false,
      status: 'Delete Post Success',
      posts: [...filterData],
    };
  }),

  on(PostsActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
