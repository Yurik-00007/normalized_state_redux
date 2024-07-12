import React, {useState} from 'react';
import {PostType} from "../../../api/api";
import {useAppDispatch} from "../../app/store";
import {updatePostText} from "../reducer";

type Props = {
  post: PostType
}

export const Post = React.memo(({post}: Props) => {
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
});

