"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("./variables"));
function Login() {
    return (<div>
      <div className="container mt-5">
        <h1>LesGo Epic Admin Login</h1>
      </div>
      <div className="">
        <form action={variables_1.default + "/auth/google"}>
        <button className="fabIcon" type="submit"><i className="fab fa-google icon"></i></button>
        </form>
        
      </div>
    </div>);
}
exports.default = Login;
