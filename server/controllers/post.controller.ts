import db from "../config/db"
import {Request,Response} from "express"
import {IRequest,IPost,IUser} from "../types/post.type"
interface ISinglePost extends IPost,IUser {}[]
import fs from "fs"
import path from "path"

export const getPosts = (req:Request,res: Response) => {
  const query = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"
  req.query ? (db.query(query,[req.query.cat],(err:any,data:IPost[])=>{
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message})
    res.status(200).json({
      status:true,
      data
    })
  })) : (
  db.query(query,(err:any,data:IPost[])=>{
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
  const query = "SELECT p.id as postId,p.title,p.desc,p.img as postImg,p.date,p.cat,u.id as userId,u.username,u.email,u.img as userImg FROM posts as p LEFT JOIN users as u ON(p.uid = u.id) WHERE p.id = ?"
  db.query(query,[req.params.id],(err:any,data:any)=>{
    if(err)
    return res.status(500).json({
      status:false,
      msg:err.message})
    res.status(200).json({
      status:true,
      data:data[0]
    })
  })
}
export const addPost = (req:IRequest,res: Response) => {
  const {
    title,desc,img,date,cat
  } = req.body
  const query = "INSERT INTO posts(`title`,`desc`,`img`,`date`,`cat`,`uid`) VALUES(?,?,?,?,?,?)"
  const values = [
    title,desc,img,date,cat,req.id
    ]
  
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
  const {
    title,desc,date,cat,img,lastImg
  } = req.body
  if(lastImg !== img){
    const query = "UPDATE posts SET `title` = ?,`desc` = ?, `img` = ? ,`cat` = ?  WHERE id = ?"
    db.query(query,[title,desc,img,cat,req.params.id],(err:any,data:any)=>{
      if(err){
        console.log(err)
        return res.status(500).json({msg:err.message,status:false})
      }
      const filePath = path.join(__dirname,`../../client/public/uploads/${lastImg}`)
      fs.unlinkSync(filePath)
      res.status(200).json({msg:"succes update posr",status:true})
    })
  }else{
    const query = "UPDATE posts SET `title` = ?,`desc` = ?,`cat` = ?  WHERE id = ?"
    db.query(query,[title,desc,cat,req.params.id],(err:any,data:any)=>{
      if(err){
        console.log(err)
        return res.status(500).json({msg:err.message,status:false})
      }
      res.status(200).json({msg:"succes update posr",status:true})
    })
  }
  
}
export const deletePost = (req:Request,res: Response) => {
  const query = "DELETE FROM posts WHERE id = ?"

  db.query(query,[req.query.id],(err:any,data:any)=>{
    if(err){
      console.log(err)
      return res.status(500).json({status:false,msg:err.message})
    }
    const filePath = path.join(__dirname,`../../client/public/uploads/${req.query.img}`)
    fs.unlinkSync(filePath)
    res.status(200).json({msg:"post deleted",status:true})
  })
}