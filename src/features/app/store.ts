import {thunk} from "redux-thunk";
import {useDispatch} from "react-redux";

import {postsReducer} from "../posts/reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore, ThunkDispatch} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  posts: postsReducer,
});
export type AppRootStateType=ReturnType<typeof rootReducer>
// @ts-ignore
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppThunkDispatch= ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch=()=>useDispatch<AppThunkDispatch>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store