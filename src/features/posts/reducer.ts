import {api, PostType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";
import {text} from "node:stream/consumers";

export type PostsState ={
  items: PostType[];
}

const initialState:PostsState = {
  items:[]
}

export const postsReducer = (state=initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof updatePostSuccess>
):PostsState => {
  switch(action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        ...state,
        items:action.payload.posts
      }
    case "posts/UPDATE_POSTS_SUCCESS":
        return {
          ...state,
          items: state.items.map(i=>i.postId===action.payload.postId? {...i,text: action.payload.text} :i)
        }
    default:
      // throw new Error(`I don't understand this type`)
      return state
  }
}

//action
export const updatePostSuccess = (postId: string,text:string) => ({
  type: 'posts/UPDATE_POSTS_SUCCESS',
  payload: {postId,text}
}as const)
export const fetchPostsSuccess = (posts: PostType[]) => ({
  type: 'posts/FETCH_POSTS_SUCCESS',
  payload: {posts}
}as const)

//thunk
export const fetchPosts = () => async (dispatch: AppThunkDispatch) => {
  const posts = await api.getPosts()
  dispatch(fetchPostsSuccess(posts))
}
export const updatePostText = (postId:string, text:string) => async (dispatch: AppThunkDispatch) => {
  const updatePost = await api.updatePost(postId,text)
  dispatch(updatePostSuccess(postId,text))
}


