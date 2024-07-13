import {api, AuthorAPIType, CommentAPIType, PostAPIType} from "../../api/api";
import {AppThunkDispatch} from "../app/store";
import {fetchPostsSuccess, mapToLookupTable} from "./post-reducer";

//type
export type CommentType = Omit<CommentAPIType, "author"> & { authorId: string };
/*const a : CommentType = {
 id ,text, authorId
}*/

const initialState = {
  // allIds:[] as string[],
  byId: {} as { [key: string]: CommentType }
}

type StateType = typeof initialState;

export const commentsReducer = (state = initialState, action:
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>
  | ReturnType<typeof deletePostCommentSuccess>
  | ReturnType<typeof addPostCommentSuccess>
): StateType => {
  switch (action.type) {
    case "posts/FETCH_POSTS_SUCCESS":
      return {
        ...state,
        // allIds: action.payload.posts.map(p=>p.author.id),
        byId: {
          ...state.byId,
          ...mapToLookupTable(action.payload.posts
            .map(p => p.lastComments).flat().map(c => {
              const comment: CommentType = {
                id: c.id,
                text: c.text,
                authorId: c.author.id,
              }
              return comment
            })),
        }
      }
    case "posts/FETCH_POST_COMMENTS_SUCCESS":
      const lookupTable = mapToLookupTable(action.payload.comments
        .map((c: CommentAPIType) => {
          const comment: CommentType = {
            id: c.id,
            text: c.text,
            authorId: c.author.id
          }
          return comment
        }))
      return {
        ...state,
        // allIds: action.payload.posts.map(p=>p.author.id),
        byId: {
          ...state.byId,
          ...lookupTable

        }
      }
    case "posts/DELETE_POST_COMMENT_SUCCESS":
      const byIdCopy = {
        ...state.byId
      }
      delete byIdCopy[action.payload.commentId]
      return {
        ...state,
        byId: byIdCopy
      }
    case "posts/ADD_POST_COMMENT_SUCCESS":
      const newComment: CommentType = {
        id: action.payload.comment.id,
        text: action.payload.comment.text,
        authorId: action.payload.comment.author.id
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [newComment.id]: newComment
        }
      };
    default:
      return state
  }
}

//action

export const fetchPostCommentsSuccess = (postId: string, comments: CommentAPIType[]) => ({
  type: 'posts/FETCH_POST_COMMENTS_SUCCESS',
  payload: {postId, comments}
} as const)
export const deletePostCommentSuccess = (postId: string, commentId: string) => ({
  type: 'posts/DELETE_POST_COMMENT_SUCCESS',
  payload: {postId, commentId}
} as const)
export const addPostCommentSuccess = (postId: string, comment: CommentAPIType) => ({
  type: 'posts/ADD_POST_COMMENT_SUCCESS',
  payload: { postId, comment }
} as const);

//thunk
export const fetchPostComments = (postId: string) => async (dispatch: AppThunkDispatch) => {
  const comments = await api.getComments(postId)
  dispatch(fetchPostCommentsSuccess(postId, comments))
}
export const deletePostComment = (postId: string, commentId: string) => async (dispatch: AppThunkDispatch) => {
  const del = await api.deleteComment(postId, commentId)
  dispatch(deletePostCommentSuccess(postId, commentId))
}
export const addPostComment = (postId: string) => async (dispatch: AppThunkDispatch) => {
  const comment = await api.addComment(postId)
  dispatch(addPostCommentSuccess(postId, comment))
}



