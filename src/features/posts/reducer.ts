import {api, PostType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";



const initialState = {
  // items:[] as PostType[],
  allIds:[] as string[],
  byId:{} as {[key:string]:PostType}
}

const mapToLookupTable=(items:any[])=>{
  return items.reduce((acc,item)=>{
    acc[item.postId]=item
    return acc
  },{})
}

/*
type LookupTableType<T> = { [key: string]: T }

export const mapToLookupTable = <T extends { id: string }>(items: T[]): LookupTableType<T> => {
  const acc: LookupTableType<T> = {}
  return items.reduce((acc, item) => {
    acc[item.id] = item
    return acc;
  }, acc);
}
*/

export const postsReducer = (state=initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof updatePostSuccess>
) => {
  switch(action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        ...state,
        // items:action.payload.posts,
        allIds: action.payload.posts.map(p=>p.postId),
        byId:mapToLookupTable(action.payload.posts)
      }
    case "posts/UPDATE_POSTS_SUCCESS":
        return {
          ...state,
          // items: state.items.map(i=>i.postId===action.payload.postId? {...i,text: action.payload.text} :i)
          byId: {
            ...state.byId,
            [action.payload.postId]:{...state.byId[action.payload.postId],text: action.payload.text}
          }
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


