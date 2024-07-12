import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../posts/components/Post";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {fetchPosts} from "../posts/reducer";

export const PostsPage = () => {
  const items = useSelector((state:AppRootStateType) =>state.posts.items)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchPosts())
  },[])
  return (
    <div>
      {items.map((i) => <Post key={i.postId} post={i} />)}
    </div>
  );
};

