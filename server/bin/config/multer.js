"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        const ext = path_1.default.extname(fileName);
        const allowExt = [".jpg", ".jpeg", ".png"];
        if (!allowExt.includes(ext.toLowerCase())) {
            cb("file must be an image", null);
            return;
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueSuffix);
    }
});
const upload = (0, multer_1.default)({ storage });
const uploadFile = (app) => {
    app.post("/api/upload", (req, res) => {
        upload.single("file")(req, res, (err) => {
            var _a;
            if (err)
                return res.status(400).json({ msg: err.message || err });
            const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            res.status(200).json({ fileName, msg: "succes upload image" });
        });
    });
};
exports.default = uploadFile;
//# sourceMappingURL=multer.js.map