import express,{Router} from "express"
import {tokenVerify} from "../middleware/verify"
import {getPost,getPosts,addPost,updatePost,deletePost} from "../controllers/post.controller"
const router: Router = express.Router()

router.get("/posts",tokenVerify,getPosts)
router.get("/post/:id",getPost)
router.delete("/post",tokenVerify,deletePost)
router.patch("/post/:id",tokenVerify,updatePost)
router.post("/post",tokenVerify,addPost)

export default router