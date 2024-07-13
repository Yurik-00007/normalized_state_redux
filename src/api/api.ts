import {v1} from "uuid";

export const api={
  getPosts():Promise<PostAPIType[]>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve([
          {
            id:v1(),
            text:'Hello',
            likes:10,
           author:{id:'1',name:'Dimych'},
            lastComments: [
              {id: v1(), text: 'Cool', author: {id: '3', name: 'Sveta'}},
              {id: v1(), text: 'Very Cool', author: {id: '3', name: 'Sveta'}}
            ]
        },
          {
            id:v1(),
            text:'I like React',
            likes:1002,
            author:{id:'2',name:'Valera'},
            lastComments: [
              {id: v1(), text: 'Lorem Ipsum', author: {id: '1', name: 'Dimych'}},
              {id: v1(), text: 'lorem lorem lorem', author: {id: '1', name: 'Dimych'}}
            ],

          },
          {
            id:v1(),
            text:'I like Angular',
            likes:100,
            author:{id:'1',name:'Dimych'},
            lastComments: [
              {id: v1(), text: 'Yeah', author: {id: '1', name: 'Dimych'}},
              {id: v1(), text: "I don't know Angular", author: {id: '3', name: 'Sveta'}},
              {id: v1(), text: 'Really?', author: {id: '2', name: 'Valera'}},
            ],
          },
        ])
      },2000)
    })
  },
  getComments(postId:string){
   return Promise.resolve([
     {id: v1(), text: 'Yeah?', author: {id: '1', name: 'Dimych'}},
     {id: v1(), text: "Bullshit!", author: {id: '3', name: 'Sveta'}},
     {id: v1(), text: 'Really?', author: {id: '2', name: 'Valera'}},
       {id: v1(), text: 'Hey, where are comments?', author: {id: '1', name: 'Dimych'}},
     ]
   )

  },
  updatePost(postId:string,text:string){
    return Promise.resolve({
      id: postId,
      text,
      likes: 1002,
      author: {id: '2', name: 'Valera'},
      lastComments: [
        {id: v1(), text: 'Lorem Ipsum', author: {id: '2', name: 'Valera'}},
        {id: v1(), text: 'lorem lorem lorem', author: {id: '3', name: 'Sveta'}}],
    })
  },
  updateAuthor(id:string,name:string){
    return Promise.resolve({
      id,
      name
    })
  },
  deleteComment(postId:string,commentId:string){
    return Promise.resolve({})
  },
  addComment(postId:string){
    return Promise.resolve(
      {id: v1(), text: 'Lorem Ipsum', author: {id: '2', name: 'Valera'}},)
  }
}

//type

export type PostAPIType ={
  id: string
  text: string
  likes:number
  author:AuthorAPIType
  lastComments:CommentAPIType[]
}

export type CommentAPIType = {
  id: string,
  text: string,
  author: AuthorAPIType
}
export type AuthorAPIType = {
  id:string
  name:string
}













