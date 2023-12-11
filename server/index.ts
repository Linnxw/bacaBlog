import express,{Application} from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth.router"
import postRouter from "./routes/post.router"
import cookieParser from "cookie-parser"
import uploadFile from "./config/multer"
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT

const corsOption ={
  origin:"http://localhost:5173",
  credentials:true
}

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
uploadFile(app)
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Credentials","true")
  res.setHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type")
  res.setHeader("Access-Control-Allow-Methods" ,"GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173" )
  next()
})
//Route
app.use("/api/auth",authRouter)
app.use("/api",postRouter)

app.listen(PORT,()=>{
  console.log(`Server runing in PORT: ${PORT}`)
})
