import {Request} from "express"

export interface IRequest extends Request {
  id?:any
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
  uid:number
}