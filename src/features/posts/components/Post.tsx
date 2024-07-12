import React from 'react';
import {PostType} from "../../../api/api";

type Props={
  post: PostType
}

export const Post = ({post}:Props) => {
  return (
    <div>
      <b>{post.author.name}</b>
      <span>{post.text}</span>
      <hr/>
    </div>
  );
};

