import {thunk} from "redux-thunk";
import {useDispatch} from "react-redux";

import {postsReducer} from "../posts/post-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore, ThunkDispatch} from "@reduxjs/toolkit";
import {authorsReducer} from "../posts/authors-reducer";
import {commentsReducer} from "../posts/comments-reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
  comments: commentsReducer,
});
export type AppRootStateType=ReturnType<typeof rootReducer>
// @ts-ignore
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppThunkDispatch= ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch=()=>useDispatch<AppThunkDispatch>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store