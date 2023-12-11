import express,{Request,Response} from "express"
import passwordHash from "password-hash"
import db from "../config/db"
import jwt from "jsonwebtoken"
interface IAuthUser {
  id?:number
  username: string
  email: string 
  password: string 
}
export const register = (req: Request,res:Response)=>{
  const {username,email,password}: IAuthUser = req.body!
  const query = "SELECT * FROM users WHERE username = ? OR email = ?"
  db.query(query,[username,email],(err: any,result: IAuthUser[])=>{
    if(err)
    return res.status(500).json({msg:err})
    if(result.length)
    return res.status(409).json({
      status:false,
      msg:"Username or Email is registred"
    })
    const hashPassword = passwordHash.generate(password)
    const query = "INSERT INTO users (`username`,`email`,`password`,`img`) VALUES (?,?,?,?)"

    db.query(query,[username,email,hashPassword,""],(err:any,data:any)=>{
     if(err)
      return res.status(500).json({msg:err.message})
      res.status(200).json({
        status:true,
        msg:"succes register"
      })
    })
    
  })
}

export const login = (req:Request,res: Response) => {
  if(req.cookies.token){
    return res.status(403).json({status:false,msg:"Your is logined"})
  }
  const {field,password} = req.body
  const query = "SELECT * FROM users WHERE email = ? OR username = ?"
  db.query(query,[field,field],(err: any,data: IAuthUser[])=>{
    if(err)
    return res.status(500).json({msg:err.message})
    if(!data.length)
    return res.status(400).json({
      status:false,
      msg:"Username or Email not registred"
    })
    const match: boolean = passwordHash.verify(password,data[0].password)
    if(!match)
    return res.status(400).json({
      status:false,
      msg:"wrong password"
    })
    const id = data[0].id
    const token = jwt.sign({id},process.env.ACCES_TOKEN_SECRET!)
    const user: any = data[0]
    delete user.password
    res.cookie("token",token,{maxAge:1000*60*60*24*7,httpOnly:true}).status(200).json({
      status:true,
      msg:"Succes Login",
      data:user
    })
  })
}

export const logout = (req:Request,res:Response) => {
  res.clearCookie("token")
  res.sendStatus(200)
}