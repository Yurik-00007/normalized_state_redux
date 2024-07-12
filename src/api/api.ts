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













