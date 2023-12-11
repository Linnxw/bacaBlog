import express,{Router} from "express"
import {getPost,getPosts,addPost,updatePost,deletePost} from "../controllers/auth.controller"
const router: Router = express.Router()

router.get("/posts",getPosts)
router.get("/post/:id",getPost)
router.delete("/post/:id",deletePost)
router.patch("/post/:id",updatePost)
router.post("/post",addPost)

export default router