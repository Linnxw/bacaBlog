import db from "../config/db"
import {Request,Response} from "express"
import {IRequest} from "../types/post.type"
export const getPosts = (req:Request,res: Response) => {
  const query = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"
  req.query ? (db.query(query,[req.query.cat],(err:any,data:any)=>{
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message})
    res.status(200).json({
      status:true,
      data
    })
  })) : (
  db.query(query,(err:any,data:any)=>{
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message})
    res.status(200).json({
      status:true,
      data
    })
  })
    )
  
}
export const getPost = (req:Request,res: Response) => {
  const query = "SELECT p.id as postId,p.title,p.desc,p.img,p.date,p.cat,u.id as userId,u.username,u,email,u.img FROM posts as p JOIN users as u ON(p.uid = u.id) WHERE p.id = ?"
  db.query(query,[req.params.id],(err:any,data:any)=>{
    console.log(data)
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message})
    res.status(200).json({
      status:true,
      data
    })
  })
}
export const addPost = (req:IRequest,res: Response) => {
  console.log("masuk add post")
  const {
    title,desc,img,date,cat
  } = req.body
  const query = "INSERT INTO posts(`title`,`desc`,`img`,`date`,`cat`,`uid`) VALUES(?,?,?,?,?,?)"
  const values = [
    title,desc,img,date,cat,req.id
    ]
    console.log(values)
  db.query(query,values,(err:any,data:any)=>{
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message
    })
    res.status(200).json({
      status:true,
      msg:"succes add post"
    })
  })
}
export const updatePost = (req:Request,res: Response) => {
  
}
export const deletePost = (req:Request,res: Response) => {
  
}