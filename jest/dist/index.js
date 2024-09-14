"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumInput = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number(),
});
exports.app.post("/sum", (req, res) => {
    const parsedInput = sumInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            message: "invalid inputs",
        });
    }
    const answer = parsedInput.data.a + parsedInput.data.b;
    res.json({
        answer,
    });
});
exports.app.get("/sum", (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"]),
    });
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json({
        answer,
    });
});
