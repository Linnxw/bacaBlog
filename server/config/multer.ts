import multer from "multer"
import path from "path"
import {Application} from "express"
const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, '../client/public/uploads')
  },
  filename: function (req:any, file:any, cb:any) {
    const fileName = file.originalname
    const ext = path.extname(fileName)
    const allowExt = [".jpg",".jpeg",".png"]
    if(!allowExt.includes(ext.toLowerCase())){
     cb("file must be an image",null)
     return;
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
    cb(null,uniqueSuffix)
  }
})

const upload = multer({storage})

const uploadFile =(app: Application)=>{
  app.post("/api/upload",(req:any,res:any)=>{
  upload.single("file")(req,res,(err)=>{
    if(err)
    return res.status(400).json({msg:err.message || err})

    const fileName = req.file?.filename
    res.status(200).json({fileName,msg:"succes upload image"})
  })
  
})
}

export default uploadFile
