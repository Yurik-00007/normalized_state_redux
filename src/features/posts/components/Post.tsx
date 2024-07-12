import React, {useState} from 'react';
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {updatePostText} from "../reducer";
import {useSelector} from "react-redux";

type Props = {
  postId: string
}

// export const Post = React.memo(({postId}: Props) => {
export const Post = ({postId}: Props) => {

  const post=useSelector((state:AppRootStateType) =>state.posts.byId[postId])

  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState(post.text)
  const dispatch = useAppDispatch()
  console.log(post)
  return (
    <div>
      <b>{post.author.name}</b>
      <br/>
      {!editMode && <span onDoubleClick={() => setEditMode(true)}>{post.text}</span>}
      {editMode && <textarea
        onBlur={() => {
          setEditMode(false)
          dispatch(updatePostText(post.postId,text))
        }}
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
      >
        {post.text}
      </textarea>}
      <br/>
      Likes:{post.likes}
      <hr/>
    </div>
  );
}

