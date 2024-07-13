import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../posts/components/Post";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {fetchPosts} from "../posts/post-reducer";

export const PostsPage = () => {
  const ids = useSelector((state:AppRootStateType) =>state.posts.allIds)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchPosts())
  },[])
  return (
    <div>
      {ids.map((id) => <Post key={id} postId={id} />)}
    </div>
  );
};

