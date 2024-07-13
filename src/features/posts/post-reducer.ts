import {api, PostAPIType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";
import {updateAuthorSuccess} from "./authors-reducer";
import {addPostCommentSuccess, deletePostCommentSuccess, fetchPostCommentsSuccess} from "./comments-reducer";

//type
export type PostType = Omit<PostAPIType, "author"|'lastComments'> & { authorId: string } & { commentsIds: string[] };
/*const a : PostType = {
 authorId,text,id,likes,commentsIds
}*/

const initialState = {
  // items:[] as PostType[],
  allIds: [] as string[],
  byId: {} as { [key: string]: PostType }
}

/*
export const mapToLookupTable=(items:any[])=>{
  return items.reduce((acc,item)=>{
    acc[item.postId]=item
    return acc
  },{})
}
*/
type LookupTableType<T> = { [key: string]: T }

export const mapToLookupTable = <T extends { id: string }>(items: T[]): LookupTableType<T> => {
  const acc: LookupTableType<T> = {}
  return items.reduce((acc, item) => {
    acc[item.id] = item
    return acc;
  }, acc);
}

export const postsReducer = (state = initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof updatePostSuccess>
  | ReturnType<typeof updateAuthorSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>
  | ReturnType<typeof deletePostCommentSuccess>
  | ReturnType<typeof addPostCommentSuccess>
) => {
  switch (action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        /*
          ...state,
          items: action.payload.posts,
  */
        /*
                ...state,
                allIds: action.payload.posts.map(p => p.id),
                byIds: mapToLookupTable(action.payload.posts)
        */
        ...state,
        allIds: action.payload.posts.map(p => p.id),
        byId: mapToLookupTable(action.payload.posts.map((p) => {
          const copy: PostType = {
            id: p.id,
            likes: p.likes,
            text: p.text,
            authorId: p.author.id,
            commentsIds: p.lastComments.map(c=>c.id)
          }
          return copy
        }))
      }
    case "posts/FETCH_POST_COMMENTS_SUCCESS":
      return {
        ...state,byId: {
          ...state.byId,
          [action.payload.postId]: {...state.byId[action.payload.postId],
            commentsIds:action.payload.comments.map(comment => comment.id)},
        }
      }
    case "posts/UPDATE_POSTS_SUCCESS":
      return {
        ...state,
        // items: state.items.map(i=>i.postId===action.payload.postId? {...i,text: action.payload.text} :i)
        byId: {
          ...state.byId,
          [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
        }
      }
    case "posts/UPDATE_AUTHOR_SUCCESS":
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            name: action.payload.name
          }
        }
      }

    case "posts/DELETE_POST_COMMENT_SUCCESS":
      const post = state.byId[action.payload.postId];
      return {
        ...state,
        byId:
          {...state.byId,[action.payload.postId]:{...post,commentsIds:post.commentsIds.filter(commentId=>commentId!==action.payload.commentId)},}
      }

    case "posts/ADD_POST_COMMENT_SUCCESS":
      return {
        ...state,
        byId: {
          ...state.byId, [action.payload.postId]: {
            ...state.byId[action.payload.postId],
            commentsIds: [...state.byId[action.payload.postId].commentsIds, action.payload.comment.id]
          }
        }
      }
    default:
      // throw new Error(`I don't understand this type`)
      return state
  }
}

//action
export const updatePostSuccess = (postId: string, text: string) => ({
  type: 'posts/UPDATE_POSTS_SUCCESS',
  payload: {postId, text}
} as const)
export const fetchPostsSuccess = (posts: PostAPIType[]) => ({
  type: 'posts/FETCH_POSTS_SUCCESS',
  payload: {posts}
} as const)


//thunk
export const fetchPosts = () => async (dispatch: AppThunkDispatch) => {
  const posts = await api.getPosts()
  dispatch(fetchPostsSuccess(posts))
}
export const updatePostText = (postId: string, text: string) => async (dispatch: AppThunkDispatch) => {
  const updatePost = await api.updatePost(postId, text)
  dispatch(updatePostSuccess(postId, text))
}


