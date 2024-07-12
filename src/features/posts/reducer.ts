import {api, PostType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";

export type PostsState ={
  items: PostType[];
}

const initialState:PostsState = {
  items:[]
}

export const postsReducer = (state=initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
):PostsState => {
  switch(action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        ...state,
        items:action.payload.posts
      }

    default:
      // throw new Error(`I don't understand this type`)
      return state
  }
}

//action
export const fetchPostsSuccess = (posts: PostType[]) => ({
  type: 'posts/FETCH_POSTS_SUCCESS',
  payload: {posts}
})

//thunk
export const fetchPosts = () => async (dispatch: AppThunkDispatch) => {
  const posts = await api.getPosts()
  dispatch(fetchPostsSuccess(posts))
}


