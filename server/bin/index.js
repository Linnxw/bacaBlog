"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const post_router_1 = __importDefault(require("./routes/post.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("./config/multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, multer_1.default)(app);
//Route
app.use("/api/auth", auth_router_1.default);
app.use("/api", post_router_1.default);
app.listen(PORT, () => {
    console.log(`Server runing in PORT: ${PORT}`);
});
//# sourceMappingURL=index.js.map