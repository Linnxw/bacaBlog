import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import {IRequest} from "../types/post.type"
export const tokenVerify = (req:IRequest,res:Response,next: NextFunction) =>{
  const token = req.cookies.token!
  const secret = process.env.ACCES_TOKEN_SECRET!
  
  if(!token)
  return res.status(401).json({
    status:false,
    msg:"Not autentication"
  })
  jwt.verify(token,secret,(err:any,decoded:any)=>{
    if(err)
    return res.status(403).json({
      status:false,
      msg:"invalid token"
    })
    const id = decoded.id!
    req.id = id
    next()
  })
}