"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../middleware/verify");
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.default.Router();
router.get("/posts", post_controller_1.getPosts);
router.get("/post/:id", post_controller_1.getPost);
router.delete("/post", verify_1.tokenVerify, post_controller_1.deletePost);
router.patch("/post/:id", verify_1.tokenVerify, post_controller_1.updatePost);
router.post("/post", verify_1.tokenVerify, post_controller_1.addPost);
exports.default = router;
//# sourceMappingURL=post.router.js.map