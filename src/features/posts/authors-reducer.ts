import {api, AuthorAPIType, PostAPIType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";
import {fetchPostsSuccess, mapToLookupTable} from "./post-reducer";
import {fetchPostCommentsSuccess} from "./comments-reducer";

//type

const initialState = {
  // allIds:[] as string[],
  byId:{} as {[key:string]:AuthorAPIType}
}

type StateType=typeof initialState;

export const authorsReducer = (state=initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
  |ReturnType<typeof updateAuthorSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>
):StateType => {
  switch(action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        ...state,
        // allIds: action.payload.posts.map(p=>p.author.id),
        byId: {
          ...state.byId,
          ...mapToLookupTable(action.payload.posts.map(p=>p.author)),
          ...mapToLookupTable(action.payload.posts.map(p=>p.lastComments).flat().map(c=>c.author)),
        }
      }
    case "posts/UPDATE_AUTHOR_SUCCESS":
      // debugger
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            name: action.payload.name
          }
        }}
    case "posts/FETCH_POST_COMMENTS_SUCCESS":
      return {
        ...state,
        byId: {
          ...state.byId,
          ...mapToLookupTable(action.payload.comments.map(c => c.author))
        }
      }
    default:
      return state
  }
}

//action
export const updateAuthorSuccess = (id:string, name:string) => ({
  type: 'posts/UPDATE_AUTHOR_SUCCESS',
  payload: {id,name}
}as const)


//thunk

export const updateAuthor = (id:string, name:string) => async (dispatch: AppThunkDispatch) => {
  const author = await api.updateAuthor(id,name)
  dispatch(updateAuthorSuccess(id,name))
}


