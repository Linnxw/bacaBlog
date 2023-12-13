"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const password_hash_1 = __importDefault(require("password-hash"));
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => {
    const { username, email, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db_1.default.query(query, [username, email], (err, result) => {
        if (err)
            return res.status(500).json({ msg: err });
        if (result.length)
            return res.status(409).json({
                status: false,
                msg: "Username or Email is registred"
            });
        const hashPassword = password_hash_1.default.generate(password);
        const query = "INSERT INTO users (`username`,`email`,`password`,`img`) VALUES (?,?,?,?)";
        db_1.default.query(query, [username, email, hashPassword, ""], (err, data) => {
            if (err)
                return res.status(500).json({ msg: err.message });
            res.status(200).json({
                status: true,
                msg: "succes register"
            });
        });
    });
};
exports.register = register;
const login = (req, res) => {
    if (req.cookies.token) {
        return res.status(403).json({ status: false, msg: "Your is logined" });
    }
    const { field, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    db_1.default.query(query, [field, field], (err, data) => {
        if (err)
            return res.status(500).json({ msg: err.message });
        if (!data.length)
            return res.status(400).json({
                status: false,
                msg: "Username or Email not registred"
            });
        const match = password_hash_1.default.verify(password, data[0].password);
        if (!match)
            return res.status(400).json({
                status: false,
                msg: "wrong password"
            });
        const id = data[0].id;
        const token = jsonwebtoken_1.default.sign({ id }, process.env.ACCES_TOKEN_SECRET);
        const user = data[0];
        delete user.password;
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }).status(200).json({
            status: true,
            msg: "Succes Login",
            data: user
        });
    });
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map