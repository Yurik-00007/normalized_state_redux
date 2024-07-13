import React, {useEffect, useState} from 'react';
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {updatePostText} from "../post-reducer";
import {useSelector} from "react-redux";
import {updateAuthor} from "../authors-reducer";
import {addPostComment, deletePostComment, deletePostCommentSuccess, fetchPostComments} from "../comments-reducer";

type Props = {
  postId: string
}

// export const Post = React.memo(({postId}: Props) => {
export const Post = ({postId}: Props) => {

  const post = useSelector((state: AppRootStateType) => state.posts.byId[postId])
  const author = useSelector((state: AppRootStateType) => state.authors.byId[post.authorId])

  const [editModeForPost, setEditModeForPost] = useState(false)
  const [editModeForAuthor, setEditModeForAuthor] = useState(false)
  const [text, setText] = useState(post.text)
  const [authorName, setAuthorName] = useState(author.name)
  const dispatch = useAppDispatch()
  console.log(post)
  useEffect(
    ()=>{setAuthorName(author.name)},[author]
  )
  return (
    <div>
      {/*<b>{post.author.name}</b>*/}
      {!editModeForAuthor && <b onDoubleClick={() => setEditModeForAuthor(true)}>{authorName}</b>}
      {editModeForAuthor && <textarea
        autoFocus={true}
        onBlur={() => {
          setEditModeForAuthor(false)
          dispatch(updateAuthor(author.id, authorName))
        }}
        onChange={(e) => setAuthorName(e.currentTarget.value)}
        value={authorName}
      >
        {post.text}
      </textarea>}
      <br/>
      {!editModeForPost && <span onDoubleClick={() => setEditModeForPost(true)}>{post.text}</span>}
      {editModeForPost && <textarea
        autoFocus={true}
        onBlur={() => {
          setEditModeForPost(false)
          dispatch(updatePostText(post.id, text))
        }}
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
      >
        {post.text}
      </textarea>}
      <button onClick={()=>dispatch(addPostComment(post.id))}>add comment</button>
      <br/>
      Likes:{post.likes}
      <hr/>
      Comments:
      <ul>
        {post.commentsIds.map(id=><Comment key={id} commentId={id} postId={post.id}/>)}
      </ul>
      <button onClick={()=>{
        dispatch(fetchPostComments(postId))
      }}>all comments</button>
      <hr/>
    </div>
  );
}


type CommentProps = {
  commentId: string
  postId:string
}

export const Comment=({commentId,postId}:CommentProps)=>{
  const comment =useSelector((state: AppRootStateType) => state.comments.byId[commentId])
  const author =useSelector((state: AppRootStateType) => state.authors.byId[comment.authorId])
  const dispatch = useAppDispatch()
  return (
    <li>
      <b>{author.name}</b>
      {comment.text}
      <button onClick={()=>dispatch(deletePostComment(postId,commentId))}>x</button>
    </li>
  )
}