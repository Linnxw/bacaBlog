"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.get("/posts", auth_controller_1.getPosts);
router.get("/post/:id", auth_controller_1.getPost);
router.delete("/post/:id", auth_controller_1.deletePost);
router.patch("/post/:id", auth_controller_1.updatePost);
router.post("/post", auth_controller_1.addPost);
exports.default = router;
//# sourceMappingURL=user.router.js.map