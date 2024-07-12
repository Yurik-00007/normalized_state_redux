import {v1} from "uuid";

export const api={
  getPosts():Promise<PostType[]>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve([
          {
            postId:v1(),
            text:'Hello',
            likes:10,
           author:{authorId:v1(),name:'Dimych'}
          },
          {
            postId:v1(),
            text:'I like React',
            likes:1002,
            author:{authorId:v1(),name:'Valera'}

          },
        ])
      },2000)
    })
  },
  updatePost(postId:string,text:string){
    return Promise.resolve({
      id: postId,
      text,
      likes: 1002,
      // author: {id: '2', name: 'Valera'},
/*
      lastComments: [
        {id: '1', text: 'Lorem Ipsum', author: {id: '2', name: 'Valera'}},
        {id: '2', text: 'lorem lorem lorem', author: {id: '3', name: 'Sveta'}}],
*/
    })
  }
}

//type

export type PostType={
  postId: string
  text: string
  likes:number
  author:AuthorType
}
export type AuthorType= {
  authorId:string
  name:string
}













