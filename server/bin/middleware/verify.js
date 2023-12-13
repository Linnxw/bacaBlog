"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenVerify = (req, res, next) => {
    const token = req.cookies.token;
    const secret = process.env.ACCES_TOKEN_SECRET;
    console.log({ token });
    if (!token)
        return res.status(401).json({
            status: false,
            msg: "Not autentication"
        });
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({
                status: false,
                msg: "invalid token"
            });
        const id = decoded.id;
        req.id = id;
        next();
    });
};
exports.tokenVerify = tokenVerify;
//# sourceMappingURL=verify.js.map