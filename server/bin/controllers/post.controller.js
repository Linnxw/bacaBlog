"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.addPost = exports.getPost = exports.getPosts = void 0;
const db_1 = __importDefault(require("../config/db"));
[];
const getPosts = (req, res) => {
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";
    req.query ? (db_1.default.query(query, [req.query.cat], (err, data) => {
        if (err)
            return res.status(500).json({
                status: false,
                msg: err.message
            });
        res.status(200).json({
            status: true,
            data
        });
    })) : (db_1.default.query(query, (err, data) => {
        if (err)
            return res.status(500).json({
                status: false,
                msg: err.message
            });
        res.status(200).json({
            status: true,
            data
        });
    }));
};
exports.getPosts = getPosts;
const getPost = (req, res) => {
    const query = "SELECT p.id as postId,p.title,p.desc,p.img as postImg,p.date,p.cat,u.id as userId,u.username,u.email,u.img as userImg FROM posts as p JOIN users as u ON(p.uid = u.id) WHERE p.id = ?";
    db_1.default.query(query, [req.params.id], (err, data) => {
        if (err)
            return res.status(500).json({
                status: false,
                msg: err.message
            });
        res.status(200).json({
            status: true,
            data: data[0]
        });
    });
};
exports.getPost = getPost;
const addPost = (req, res) => {
    const { title, desc, img, date, cat } = req.body;
    const query = "INSERT INTO posts(`title`,`desc`,`img`,`date`,`cat`,`uid`) VALUES(?,?,?,?,?,?)";
    const values = [
        title, desc, img, date, cat, req.id
    ];
    db_1.default.query(query, values, (err, data) => {
        if (err)
            return res.status(500).json({
                status: false,
                msg: err.message
            });
        res.status(200).json({
            status: true,
            msg: "succes add post"
        });
    });
};
exports.addPost = addPost;
const updatePost = (req, res) => {
};
exports.updatePost = updatePost;
const deletePost = (req, res) => {
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.controller.js.map