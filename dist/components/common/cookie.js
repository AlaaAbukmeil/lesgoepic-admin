"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuth = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
let token = js_cookie_1.default.get("token");
const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: { Authorization: `Bearer ${token}` },
};
const handleAuth = (status) => {
    if (status == 401) {
        window.location.href = '/login';
    }
};
exports.handleAuth = handleAuth;
exports.default = requestOptions;
