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

//Route
app.use("/api/auth",authRouter)
app.use("/api",postRouter)

app.listen(PORT,()=>{
  console.log(`Server runing in PORT: ${PORT}`)
})
