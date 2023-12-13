export interface ICurrentUser {
  id: string
  email: string 
  username: string
  img: string
}

export interface IUser {
  id?:number
  username:string
  email:string
  password?:string
  img?:string
}

export interface IPost{
  id?:number
  title:string
  desc:string
  cat:string
  date:string
  img:string
  uid:number
}

export interface ISinglePost{
  userId?:number
  username:string
  email:string
  password?:string
  userImg?:string
  postId?:number
  title:string
  desc:string
  cat:string
  date:string
  posrImg:string
  uid:number
}